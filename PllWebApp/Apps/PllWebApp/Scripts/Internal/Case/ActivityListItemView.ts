import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { GridListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { TextBlockView } from "@jasonbenfield/sharedwebapp/Views/TextBlockView";
import { TextLinkView } from "@jasonbenfield/sharedwebapp/Views/TextLinkView";

export class ActivityListItemView extends GridListGroupItemView {
    readonly activityLinkView: TextLinkView;
    readonly descriptionTextView: BasicTextComponentView;
    readonly statusTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.activityLinkView = this.addCell().addView(ActivityTextLinkView);
        this.descriptionTextView = this.addCell().addView(TextBlockView);
        this.statusTextView = this.addCell().addView(TextBlockView);
    }
}

class ActivityTextLinkView extends TextLinkView {
    constructor(container: BasicComponentView) {
        super(container);
        this.setAttr(attr => attr["target"] = "_blank");
    }
}