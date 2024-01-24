import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { GridListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { TextBlockView } from "@jasonbenfield/sharedwebapp/Views/TextBlockView";

export class CaseFeeListItemView extends GridListGroupItemView {
    readonly descriptionTextView: BasicTextComponentView;
    readonly amountTextView: BasicTextComponentView;
    readonly amountPaidTextView: BasicTextComponentView;
    readonly amountDueTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.descriptionTextView = this.addCell().addView(TextBlockView);
        this.descriptionTextView.setTextCss(new TextCss().end());
        this.amountTextView = this.addCell().addView(TextBlockView);
        this.amountTextView.setTextCss(new TextCss().end());
        this.amountPaidTextView = this.addCell().addView(TextBlockView);
        this.amountPaidTextView.setTextCss(new TextCss().end());
        this.amountDueTextView = this.addCell().addView(TextBlockView);
        this.amountDueTextView.setTextCss(new TextCss().end());
    }

    styleAsHeader() {
        this.setContext(ContextualClass.primary);
    }

    styleAsFooter() {
        this.setContext(ContextualClass.secondary);
    }
}