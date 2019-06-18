import BaseShareDialogue = require("../../modules/uv-dialogues-module/ShareDialogue");
import IPDFExtension = require("./IPDFExtension");

class ShareDialogue extends BaseShareDialogue {

    constructor($element: JQuery) {
        super($element);
    }

    create(): void {

        this.setConfig('shareDialogue');

        super.create();
    }

    update(): void {

        super.update();

        this.code = (<IPDFExtension>this.extension).getEmbedScript(
            this.options.embedTemplate,
            this.currentWidth,
            this.currentHeight);

        this.$code.val(this.code);
    }

    resize(): void {
        super.resize();
    }
}

export = ShareDialogue;