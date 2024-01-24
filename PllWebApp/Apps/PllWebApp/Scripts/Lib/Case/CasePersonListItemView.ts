import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { GridCellView } from "@jasonbenfield/sharedwebapp/Views/Grid";
import { GridListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { TextBlockView } from "@jasonbenfield/sharedwebapp/Views/TextBlockView";

export class CasePersonListItemView extends GridListGroupItemView {
    private readonly roleContainerView: GridCellView;
    readonly nameView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.roleContainerView = this.addCell();
        this.nameView = this.addCell().addView(TextBlockView);
    }

    addRoleView() {
        return this.roleContainerView.addView(TextBlockView);
    }
}