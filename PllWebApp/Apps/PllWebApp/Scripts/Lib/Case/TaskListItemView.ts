import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { GridListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { TextBlockView } from "@jasonbenfield/sharedwebapp/Views/TextBlockView";

export class TaskListItemView extends GridListGroupItemView {
    readonly descriptionTextView: BasicTextComponentView;
    readonly resultTextView: BasicTextComponentView;
    readonly targetEndDateTextView: BasicTextComponentView;
    readonly completedDateTextView: BasicTextComponentView;
    readonly milestoneTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.descriptionTextView = this.addCell().addView(TextBlockView);
        this.resultTextView = this.addCell().addView(TextBlockView);
        this.targetEndDateTextView = this.addCell().addView(TextBlockView);
        this.completedDateTextView = this.addCell().addView(TextBlockView);
        this.milestoneTextView = this.addCell().addView(TextBlockView);
    }

    styleAsHeader() {
        this.setContext(ContextualClass.primary);
    }
}