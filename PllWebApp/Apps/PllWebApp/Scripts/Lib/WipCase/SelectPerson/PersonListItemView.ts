import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { GridListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { TextBlockView } from "@jasonbenfield/sharedwebapp/Views/TextBlockView";

export class PersonListItemView extends GridListGroupItemView {
    readonly nameTextView: BasicTextComponentView;
    readonly emailTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('clickable');
        const cell1 = this.addCell();
        this.nameTextView = cell1.addView(TextBlockView);
        const cell2 = this.addCell();
        this.emailTextView = cell2.addView(TextBlockView);
    }
}