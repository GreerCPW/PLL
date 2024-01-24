import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { StartCasePanelView } from "./StartCasePanelView";
import { CancelCasePanelView } from "./CancelCasePanelView";
import { SelectLocationWorkflowView } from "./SelectLocation/SelectLocationWorkflowView";
import { SelectPersonWorkflowView } from "./SelectPerson/SelectPersonWorkflowView";
import { PersonEntryListPanelView } from "./PersonEntryListPanelView";
import { EnterDataGroupPanelView } from "./EnterDataGroupPanelView";
import { RelatedDocumentWorkflowView } from "./RelatedDocuments/RelatedDocumentWorkflowView";
import { CaseEntryPanelView } from "./CaseEntryPanelView";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";

export class WipCaseWorkflowView extends BlockView {
    readonly startCasePanelView: StartCasePanelView;
    readonly cancelCasePanelView: CancelCasePanelView;
    readonly selectLocationWorkflowView: SelectLocationWorkflowView;
    readonly selectPersonWorkflowView: SelectPersonWorkflowView;
    readonly personEntryListPanelView: PersonEntryListPanelView;
    readonly enterDataGroupPanelView: EnterDataGroupPanelView;
    readonly relatedDocumentWorkflowView: RelatedDocumentWorkflowView;
    readonly caseEntryPanelView: CaseEntryPanelView;

    constructor(container: BasicComponentView) {
        super(container);
        this.height100();
        this.startCasePanelView = this.addView(StartCasePanelView);
        this.cancelCasePanelView = this.addView(CancelCasePanelView);
        this.selectLocationWorkflowView = this.addView(SelectLocationWorkflowView);
        this.selectPersonWorkflowView = this.addView(SelectPersonWorkflowView);
        this.personEntryListPanelView = this.addView(PersonEntryListPanelView);
        this.enterDataGroupPanelView = this.addView(EnterDataGroupPanelView);
        this.relatedDocumentWorkflowView = this.addView(RelatedDocumentWorkflowView);
        this.caseEntryPanelView = this.addView(CaseEntryPanelView);
    }
}