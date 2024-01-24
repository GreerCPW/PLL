import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { FaIconView } from "@jasonbenfield/sharedwebapp/Views/FaIconView";
import { GridListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { TextBlockView } from "@jasonbenfield/sharedwebapp/Views/TextBlockView";
import { ImgView } from "../ImgView";

export class RelatedDocumentListItemView extends GridListGroupItemView {
    readonly labelTextView: BasicTextComponentView;
    readonly fileNameTextView: BasicTextComponentView;
    readonly iconView: FaIconView;
    readonly thumbnailView: ImgView;

    constructor(container: BasicComponentView) {
        super(container);
        const cell1 = this.addCell();
        this.iconView = cell1.addView(FaIconView);
        this.thumbnailView = cell1.addView(ImgView);
        this.labelTextView = this.addCell().addView(TextBlockView);
        this.fileNameTextView = this.addCell().addView(TextBlockView);
    }
}