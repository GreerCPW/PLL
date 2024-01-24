import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { ConfirmPersonPanelView } from "./ConfirmPersonPanelView";
import { EnterCasePersonPanelView } from "./EnterCasePersonPanelView";
import { SelectPersonPanelView } from "./SelectPersonPanelView";

export class SelectPersonWorkflowView extends BlockView {
    readonly selectPersonPanelView: SelectPersonPanelView;
    readonly confirmPersonPanelView: ConfirmPersonPanelView;
    readonly enterPersonPanelView: EnterCasePersonPanelView;

    constructor(container: BasicComponentView) {
        super(container);
        this.height100();
        this.selectPersonPanelView = this.addView(SelectPersonPanelView);
        this.confirmPersonPanelView = this.addView(ConfirmPersonPanelView);
        this.enterPersonPanelView = this.addView(EnterCasePersonPanelView);
    }

}