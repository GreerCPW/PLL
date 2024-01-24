import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { RelatedDocumentListPanelView } from "./RelatedDocumentListPanelView";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { SelectDocumentLabelPanelView } from "./SelectDocumentLabelPanelView";
import { AddRelatedDocumentPanelView } from "./AddRelatedDocumentPanelView";
import { RelatedDocumentPanelView } from "./RelatedDocumentPanelView";

export class RelatedDocumentWorkflowView extends BlockView {
    readonly relatedDocumentListPanelView: RelatedDocumentListPanelView;
    readonly selectDocumentLabelPanelView: SelectDocumentLabelPanelView;
    readonly addRelatedDocumentPanelView: AddRelatedDocumentPanelView;
    readonly relatedDocumentPanelView: RelatedDocumentPanelView;

    constructor(container: BasicComponentView) {
        super(container);
        this.height100();
        this.relatedDocumentListPanelView = this.addView(RelatedDocumentListPanelView);
        this.selectDocumentLabelPanelView = this.addView(SelectDocumentLabelPanelView);
        this.addRelatedDocumentPanelView = this.addView(AddRelatedDocumentPanelView);
        this.relatedDocumentPanelView = this.addView(RelatedDocumentPanelView);
    }
}