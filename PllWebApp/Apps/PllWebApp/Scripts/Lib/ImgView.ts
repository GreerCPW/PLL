import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { IHtmlAttributes } from "@jasonbenfield/sharedwebapp/Views/Types";

interface IImgAttributes extends IHtmlAttributes {
    src?: string;
    alt?: string;
}

export class ImgView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'img');
    }

    protected setAttr: (config: (attr: IImgAttributes) => void) => void;

    setSrc(src: string) {
        this.setAttr(attr => attr.src = src);
    }

    setAlt(alt: string) {
        this.setAttr(attr => attr.alt = alt);
    }
}