import BaseCommands = require("./BaseCommands");
import BaseView = require("./BaseView");
import IThumb = Manifold.IThumb;
import Shell = require("./Shell");

class ThumbsView extends BaseView {

    private _thumbsCache: JQuery;
    $selectedThumb: JQuery;
    $thumbs: JQuery;
    isCreated: boolean = false;
    isOpen: boolean = false;
    lastThumbClickedIndex: number;

    public thumbs: IThumb[];

    constructor($element: JQuery) {
        super($element, true, true);
    }

    create(): void {

        super.create();

        $.subscribe(BaseCommands.CANVAS_INDEX_CHANGED, (e, index) => {
            this.selectIndex(parseInt(index));
        });

        $.subscribe(BaseCommands.LOGIN, () => {
            this.loadThumbs();
        });

        $.subscribe(BaseCommands.CLICKTHROUGH, () => {
            this.loadThumbs();
        });

        this.$thumbs = $('<div class="thumbs"></div>');
        this.$element.append(this.$thumbs);

        this.$thumbs.addClass(this.extension.helper.getViewingDirection().toString()); // defaults to "left-to-right"

        var that = this;

        $.templates({
            thumbsTemplate: '<div id="thumb{{>index}}" class="{{:~className()}}" data-src="{{>uri}}" data-visible="{{>visible}}" data-index="{{>index}}">\
                                <div class="wrap" style="height:{{>height + ~extraHeight()}}px"></div>\
                                <div class="info">\
                                    <span class="index">{{:#index + 1}}</span>\
                                    <span class="label" title="{{>label}}">{{>label}}&nbsp;</span>\
                                    <span class="searchResults" title="{{:~searchResultsTitle()}}">{{>data.searchResults}}</span>\
                                </div>\
                             </div>\
                             {{if ~separator()}} \
                                 <div class="separator"></div> \
                             {{/if}}'
        });

        var extraHeight = this.options.thumbsExtraHeight;

        $.views.helpers({
            separator: function() {
                return false;
            },
            extraHeight: function() {
                return extraHeight;
            },
            className: function() {
                var className = "thumb";

                if (this.data.index === 0){
                    className += " first";
                }

                if (!this.data.uri){
                    className += " placeholder";
                }

                var viewingDirection = that.extension.helper.getViewingDirection().toString();

                if (viewingDirection === manifesto.ViewingDirection.topToBottom().toString() || viewingDirection === manifesto.ViewingDirection.bottomToTop().toString()){
                    className += " oneCol";
                } else {
                    className += " twoCol";
                }

                return className;
            },
            searchResultsTitle: function() {
                const searchResults = Number(this.data.data.searchResults);

                if (searchResults) {

                    if (searchResults > 1) {
                        return String.format(that.content.searchResults, searchResults);
                    }

                    return String.format(that.content.searchResult, searchResults);
                }
            }
        });

        // use unevent to detect scroll stop.
        this.$element.on('scroll', () => {
            this.scrollStop();
        }, 100);

        this.resize();
    }

    public databind(): void{
        if (!this.thumbs) return;
        this._thumbsCache = null; // delete cache
        this.createThumbs();
        // do initial load to show padlocks
        this.loadThumbs(0);
        this.selectIndex(this.extension.helper.canvasIndex);
    }

    createThumbs(): void{
        const that = this;

        if (!this.thumbs) return;

        // get median height
        let heights = [];

        for (let i = 0; i < this.thumbs.length; i++) {
            const thumb: IThumb = this.thumbs[i];
            heights.push(thumb.height);
        }

        const medianHeight: number = Math.median(heights);

        for (let i = 0; i < this.thumbs.length; i++) {
            const thumb: IThumb = this.thumbs[i];
            thumb.height = medianHeight;
        }

        this.$thumbs.link($.templates.thumbsTemplate, this.thumbs);

        this.$thumbs.undelegate('.thumb', 'click');

        this.$thumbs.delegate(".thumb", "click", function (e) {
            e.preventDefault();

            const data = $.view(this).data;

            that.lastThumbClickedIndex = data.index;

            $.publish(BaseCommands.THUMB_SELECTED, [data]);
        });

        this.setLabel();

        this.isCreated = true;
    }

    public selectAll(selected): void {

    }

    scrollStop(): void {

        var scrollPos = 1 / ((this.$thumbs.height() - this.$element.height()) / this.$element.scrollTop());

        if (scrollPos > 1) scrollPos = 1;

        var thumbRangeMid = Math.floor((this.thumbs.length - 1) * scrollPos);

        this.loadThumbs(thumbRangeMid);
    }

    loadThumbs(index?: number): void {

        if (!this.thumbs || !this.thumbs.length) return;

        if (_.isUndefined(index)){
            index = this.extension.helper.canvasIndex;
        }

        var thumbRangeMid = index;
        var thumbLoadRange = this.options.thumbsLoadRange;

        var thumbRange = {
            start: (thumbRangeMid > thumbLoadRange) ? thumbRangeMid - thumbLoadRange : 0,
            end: (thumbRangeMid < (this.thumbs.length - 1) - thumbLoadRange) ? thumbRangeMid + thumbLoadRange : this.thumbs.length - 1
        };

        //console.log('start: ' + thumbRange.start + ' end: ' + thumbRange.end);

        var fadeDuration = this.options.thumbsImageFadeInDuration;

        for (var i = thumbRange.start; i <= thumbRange.end; i++) {

            var $thumb = this.getThumbByIndex(i);
            var $wrap = $thumb.find('.wrap');

            // if no img has been added yet
            if (!$wrap.hasClass('loading') && !$wrap.hasClass('loaded')) {
                var visible = $thumb.attr('data-visible');

                if (visible !== "false") {
                    $wrap.removeClass('loadingFailed');
                    $wrap.addClass('loading');
                    var src = $thumb.attr('data-src');
                    src += '?t=' + Utils.Dates.getTimeStamp();
                    //console.log(i, src);
                    var img = $('<img src="' + src + '" />');
                    // fade in on load.
                    $(img).hide().load(function () {
                        $(this).fadeIn(fadeDuration, function () {
                            $(this).parent().swapClass('loading', 'loaded');
                        });
                    }).error(function() {
                        $(this).parent().swapClass('loading', 'loadingFailed');
                    });
                    $wrap.append(img);
                } else {
                    $wrap.addClass('hidden');
                }
            }
        }
    }

    show(): void {
        this.isOpen = true;
        this.$element.show();

        setTimeout(() => {
            this.selectIndex(this.extension.helper.canvasIndex);
        }, 1);
    }

    hide(): void {
        this.isOpen = false;
        this.$element.hide();
    }

    isPDF(): boolean {
        // todo: use constants
        return (this.extension.helper.getElementType().toString().contains("pdf"));
    }

    setLabel(): void {
        $(this.$thumbs).find('span.index').hide();
        $(this.$thumbs).find('span.label').show();
    }

    addSelectedClassToThumbs(index: number): void {
        this.getThumbByIndex(index).addClass('selected');
    }

    selectIndex(index: number): void {

        // may be authenticating
        if (index === -1) return;

        if (!this.thumbs || !this.thumbs.length) return;

        this.getAllThumbs().removeClass('selected');

        this.$selectedThumb = this.getThumbByIndex(index);

        this.addSelectedClassToThumbs(index);

        const indices: number[] = this.extension.getPagedIndices(index);

        // scroll to thumb if the index change didn't originate
        // within the thumbs view.
        if (!~indices.indexOf(this.lastThumbClickedIndex)) {
            this.$element.scrollTop(this.$selectedThumb.position().top);
        }

        // make sure visible images are loaded.
        this.loadThumbs(index);
    }

    getAllThumbs(): JQuery {
        if (!this._thumbsCache){
            this._thumbsCache = this.$thumbs.find('.thumb');
        }
        return this._thumbsCache;
    }

    getThumbByIndex(canvasIndex: number): JQuery {
        return this.$thumbs.find('[data-index="' + canvasIndex + '"]');
    }

    scrollToThumb(canvasIndex: number): void {
        var $thumb = this.getThumbByIndex(canvasIndex);
        this.$element.scrollTop($thumb.position().top);
    }

    resize(): void {
        super.resize();
    }
}

export = ThumbsView;