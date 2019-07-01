$("#cssfun1 .slider").html(function() {
    var str = "";
    for(var speed = 0; speed <= 200; speed += 5) {
        str += speed + "<br>";
    }
    return str;
});

var $inputs = $("input[type=range], span.slider"),
    change = function (event, value, isFirstHandle) {
        $(event.currentTarget).parent("div").next("label").text(value);
    };
$inputs.eq(0).change(function () {
    $(this).next("label").text(this.value);
}).change();

$inputs.eq(1).rsSliderLens({ onChange: change });
$inputs.eq(2).rsSliderLens({ step: 25, onChange: change });
$inputs.eq(3).rsSliderLens({ step: 25, paddingStart: 0.1, paddingEnd: 0.1, onChange: change });
$inputs.eq(4).rsSliderLens({ step: 25, paddingStart: 0.1, paddingEnd: 0.1, min: -50, max: 150, onChange: change });
$inputs.eq(5).rsSliderLens({ step: 25, paddingStart: 0.1, paddingEnd: 0.1, min: -50, max: 150, onChange: change });
$inputs.eq(6).rsSliderLens({ width: 400, step: 25, paddingStart: 0.1, paddingEnd: 0.1, min: -50, max: 150, onChange: change });
$inputs.eq(7).rsSliderLens({ step: 25, paddingStart: 0.1, paddingEnd: 0.1, min: -50, max: 150, onChange: change });
$inputs.eq(8).rsSliderLens({ step: 25, min: -50, max: 150, ruler: { labels: { visible: false }}, onChange: change });
$inputs.eq(9).rsSliderLens({ step: 25, paddingStart: 0.1, paddingEnd: 0.1, min: -50, max: 150, fixedHandle: true,
    ruler: { size: 4 }, onChange: change
});
$inputs.eq(10).rsSliderLens({ width: 300, height: 45, step: 10, paddingStart: 0.1, paddingEnd: 0.1, range: { type: [20, 60], draggable: true }, onChange: change });
$inputs.eq(11).rsSliderLens({ step: 1, paddingStart: 0.1, paddingEnd: 0.1, ruler: { labels: { values: [0, 20, 40, 60, 80, 100] }}, onChange: change });

var labels = [];
for (var i = 0; i <= 500; i+= 20) {
    labels.push(i);
}
$inputs.eq(12).rsSliderLens({ step: 1, paddingStart: 0.1, paddingEnd: 0.1, width: 300, max: 500, fixedHandle: true, ruler: { labels: { values: labels }, size: 4 }, onChange: change });
$inputs.eq(13).rsSliderLens({ step: 1, paddingStart: 0.1, paddingEnd: 0.1, min: -20, max: 20,
    ruler: {
        labels: {
            values: [-20, -10, 0, 10, 20],
            onCustomLabel: function(event, value) {
                return value > 0 ? '+' + value : value;
            },
            onCustomAttrs: function(event, value) {
                if (value < 0) return { style: 'fill:red' };
                if (value > 0) return { style: 'fill:green' };
                // no style defined for zero, so returns nothing (or undefined)
            }
          }
        },
        onCreate: function (event) {
            // append a new child <label> element to the .handle
            $(event.currentTarget).nextAll(".handle").append("<label>");
        },
        onChange: function (event, value) {
            // use the <label> element created at run-time, to display the current value 
            var $labelElement = $(event.currentTarget).nextAll(".handle").children("label");
            $labelElement.text(value < 0 ? value : ((value > 0 ? '+' : '') + value));
        }
    });
$inputs.eq(14).rsSliderLens({
    onChange: function (event, value) {
        $("#changeLabels label").first().text(value);
    },
    onFinalChange: function (event, value) {
        $("#changeLabels label").last().text(value);
    }
});
$inputs.eq(15).rsSliderLens({
    step: 5,
    width: 300,
    paddingStart: .1,
    paddingEnd: .1,
    value: [10, 25],
    onChange: function (event, value, isFirstHandle) {
        $("#doubleHandleLabels label").eq(isFirstHandle ? 0 : 1).text(value);
    }
});
$inputs.slice(16, 18).rsSliderLens({ ruler: { visible: false }, onChange: change });
$inputs.eq(18).rsSliderLens({ max: 2, step: 1, paddingStart: .15, paddingEnd: .15, ruler: { visible: false }, onChange: change });

$inputs.eq(19).rsSliderLens({ paddingStart: .1, paddingEnd: .1, ruler: { labels: { values: [0, 20, 40, 60, 80, 100] }} });
$inputs.eq(20).rsSliderLens({ paddingStart: .1, paddingEnd: .1, fixedHandle: true, ruler: { labels: { values: [0, 20, 40, 60, 80, 100] }} });
$inputs.eq(21).rsSliderLens({ width: 50, paddingStart: .1, paddingEnd: .1, orientation: 'vert', ruler: { labels: { values: [0, 20, 40, 60, 80, 100] }} });
$inputs.eq(22).rsSliderLens({ width: 50, paddingStart: .1, paddingEnd: .1, orientation: 'vert', fixedHandle: true, ruler: { labels: { values: [0, 20, 40, 60, 80, 100] }} });

$("aside input[type=radio]").change(function() { 
    $("aside").removeClass("opt1 opt2 opt3 opt4 opt5").addClass("opt" + this.value);
});
$("#o1, #o2, #o3, #o4, #o5").hide();

$inputs.eq(23).rsSliderLens({
    min: 0,
    max: 200,
    height: 200,
    fixedHandle: true,
    step: 1,
    paddingStart: .012,
    paddingEnd: .012,
    handle: {
        zoom: 2
    },
    ruler: {
        visible: false
    },
    onChange: function (event, value, isFirstHandle) {
        $("#cssfun1 > label").text(value + " km/h");
    }
});

$inputs.eq(24).rsSliderLens({
    paddingStart: .075,
    paddingEnd: .075,
    value: [20, 40],
    width: 300,
    step: 1,
    min: -20,
    max: 70,
    handle: {
        size: .15
    },
    range: {
        type: 'between'
    },
    ruler: {
        labels: {
            values: [-20, -10, 0, 10, 20, 30, 40, 50, 60, 70]
        }
    },
    onChange: function (event, value, isFirstHandle) {
        $("#cssfun2 > label").eq(isFirstHandle ? 0 : 1).text(value + "°C");
    }
});

var animObj = {
    $figure: $("#cssfun3 > figure")
};
$inputs.eq(25).rsSliderLens({
    min: 0,
    max: 6,
    step: 1,
    paddingStart: .07,
    paddingEnd: .07,
    ruler: {
        visible: false
    },
    handle: {
        zoom: 1.8,
        animation: 300
    },
    onChange: function (event, value, isFirstHandle) {
        if (animObj.timeoutIdHide) {
            clearTimeout(animObj.timeoutIdHide);
        }
        animObj.timeoutIdHide = setTimeout(function () {
            animObj.$figure.removeClass('phone0 phone1 phone2 phone3 phone4 phone5 phone6');
            if (animObj.timeoutIdShow) {
                clearTimeout(animObj.timeoutIdShow);
            }
            animObj.timeoutIdShow = setTimeout(function() {
                animObj.$figure.addClass('phone' + value);
                delete animObj.timeoutIdShow;
            }, 100);
            delete animObj.timeoutIdHide;
        }, 200);
    }
});

$inputs.eq(26).rsSliderLens({
    height: 211,
    min: 0,
    max: 4,
    step: 1,
    flipped: true,
    paddingStart: .2,
    paddingEnd: .2,
    handle: {
        pos: .2,
        zoom: 1
    },
    ruler: {
        labels: {
            pos: .4,
            onCustomLabel: function (event, value) {
                switch (value) {
                    case 0: return 'very unhappy';
                    case 1: return 'unhappy';
                    case 2: return 'normal';
                    case 3: return 'happy';
                    case 4: return 'very happy';
                }
            },
            onCustomAttrs: function (event, value, x, y) {
                return {
                    transform: 'rotate(-25 ' + x + ',' + y + ')',
                    'text-anchor': 'start'
                };
            }
        },
        tickMarks: {
            short: { visible: false },
            long: { visible: false }
        },
        onCustom: function(event, $svg, width, height, zoom, magnifiedRuler, createSvgDomFunc) {
            if (magnifiedRuler) {
                $svg.append(createSvgDomFunc('image', { width: 30, height: 155, x: 38, y: 27, 'href': '//raw.githubusercontent.com/ruisoftware/jquery-rsSliderLens/master/src/demo/emotions.png' }));
            }
        }
    }
});

$inputs.eq(27).rsSliderLens({
    min: 1,
    max: 12,
    height: 200,
    fixedHandle: true,
    step: 1,
    paddingStart: .04,
    paddingEnd: .04,
    handle: {
        size: .12
    },
    ruler: {
        visible: false
    }
});

var resizeObj = {
    timeoutId: null,
    doResize: function () {
        $inputs.eq(19).add($inputs.eq(21)).rsSliderLens('resizeUpdate');
        resizeObj.timeoutId = null;
    },
    resize: function () {
        if (!resizeObj.timeoutId) {
            resizeObj.timeoutId = setTimeout(resizeObj.doResize, 100);
        }
    }
};
resizeObj.doResize();
$(window).bind('resize', resizeObj.resize);

// to avoid image delays in the phone slider, load all of them at startup to the browser cache
$([
  '//raw.githubusercontent.com/ruisoftware/jquery-rsSliderLens/master/src/demo/phone1.png',
  '//raw.githubusercontent.com/ruisoftware/jquery-rsSliderLens/master/src/demo/phone2.png',
  '//raw.githubusercontent.com/ruisoftware/jquery-rsSliderLens/master/src/demo/phone3.png',
  '//raw.githubusercontent.com/ruisoftware/jquery-rsSliderLens/master/src/demo/phone4.png',
  '//raw.githubusercontent.com/ruisoftware/jquery-rsSliderLens/master/src/demo/phone5.png',
  '//raw.githubusercontent.com/ruisoftware/jquery-rsSliderLens/master/src/demo/phone6.png'
]).each(function() {
  $('<img>').attr('src', this);
});