import BaseCommands = require("./BaseCommands");
import BaseExpandPanel = require("./BaseExpandPanel");

class RightPanel extends BaseExpandPanel {

    constructor($element: JQuery) {
        super($element);
    }

    create(): void {
        super.create();
        this.$element.width(this.options.panelCollapsedWidth);
    }

    init(): void{
        super.init();

        var shouldOpenPanel = Utils.Bools.getBool(this.extension.getSettings().rightPanelOpen, this.options.panelOpen);
        if (shouldOpenPanel) {
            this.toggle(true);
        }

        $.subscribe(BaseCommands.TOGGLE_EXPAND_RIGHT_PANEL, () => {
            if (this.isFullyExpanded){
                this.collapseFull();
            } else {
                this.expandFull();
            }
        });
    }

    getTargetWidth(): number {
        return this.isExpanded ? this.options.panelCollapsedWidth : this.options.panelExpandedWidth;
    }

    getTargetLeft(): number {
        return this.isExpanded ? this.$element.parent().width() - this.options.panelCollapsedWidth : this.$element.parent().width() - this.options.panelExpandedWidth;
    }

    toggleFinish(): void {
        super.toggleFinish();

        if (this.isExpanded) {
            $.publish(BaseCommands.OPEN_RIGHT_PANEL);
        } else {            
            $.publish(BaseCommands.CLOSE_RIGHT_PANEL);
        }
        this.extension.updateSettings({rightPanelOpen: this.isExpanded});
    }

    resize(): void {
        super.resize();

        this.$element.css({
            'left': Math.floor(this.$element.parent().width() - this.$element.outerWidth())
        });
    }
}

export = RightPanel;