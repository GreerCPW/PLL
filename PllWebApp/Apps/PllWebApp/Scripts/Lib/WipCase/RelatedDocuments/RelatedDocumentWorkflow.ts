import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { RelatedDocumentWorkflowView } from "./RelatedDocumentWorkflowView";
import { RelatedDocumentListPanel } from "./RelatedDocumentListPanel";
import { SingleActivePanel } from "@jasonbenfield/sharedwebapp/Panel/SingleActivePanel";
import { CaseEntry } from "../CaseEntry";
import { SelectDocumentLabelPanel } from "./SelectDocumentLabelPanel";
import { AddRelatedDocumentPanel } from "./AddRelatedDocumentPanel";
import { RelatedDocumentPanel } from "./RelatedDocumentPanel";

interface IResult {
    back?: boolean;
    next?: boolean;
}

class Result {
    static back() { return new Result({ back: true }); }

    static next() { return new Result({ next: true }); }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get next() { return this.results.next; }
}

export class RelatedDocumentWorkflow implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly panels: SingleActivePanel;
    private readonly relatedDocumentListPanel: RelatedDocumentListPanel;
    private readonly selectDocumentLabelPanel: SelectDocumentLabelPanel;
    private readonly addRelatedDocumentPanel: AddRelatedDocumentPanel;
    private readonly relatedDocumentPanel: RelatedDocumentPanel;

    constructor(private readonly view: RelatedDocumentWorkflowView) {
        this.panels = new SingleActivePanel();
        this.relatedDocumentListPanel = this.panels.add(
            new RelatedDocumentListPanel(view.relatedDocumentListPanelView)
        );
        this.selectDocumentLabelPanel = this.panels.add(
            new SelectDocumentLabelPanel(view.selectDocumentLabelPanelView)
        );
        this.addRelatedDocumentPanel = this.panels.add(
            new AddRelatedDocumentPanel(view.addRelatedDocumentPanelView)
        );
        this.relatedDocumentPanel = this.panels.add(
            new RelatedDocumentPanel(view.relatedDocumentPanelView)
        );
    }

    setCaseEntry(caseEntry: CaseEntry) {
        this.relatedDocumentListPanel.setCaseEntry(caseEntry);
        this.selectDocumentLabelPanel.setLabels(caseEntry.documentLabels);
        this.addRelatedDocumentPanel.setCaseEntry(caseEntry);
    }

    private async activateRelatedDocumentListPanel() {
        this.panels.activate(this.relatedDocumentListPanel);
        const result = await this.relatedDocumentListPanel.start();
        if (result.back) {
            this.awaitable.resolve(Result.back());
        }
        else if (result.next) {
            this.awaitable.resolve(Result.next());
        }
        else if (result.addRequested) {
            this.selectDocumentLabelPanel.addMode();
            this.activateSelectDocumentLabelPanel();
        }
        else if (result.documentSelected) {
            this.relatedDocumentPanel.setRelatedDocumentEntry(result.documentSelected.documentEntry);
            this.activateRelatedDocumentPanel();
        }
    }

    private async activateSelectDocumentLabelPanel() {
        this.panels.activate(this.selectDocumentLabelPanel);
        const result = await this.selectDocumentLabelPanel.start();
        if (result.back) {
            this.activateRelatedDocumentListPanel();
        }
        else if (result.labelSelected) {
            this.addRelatedDocumentPanel.setLabel(result.labelSelected.label);
            this.activateAddRelatedDocumentPanel();
        }
        else if (result.documentUpdated) {
            this.activateRelatedDocumentListPanel();
        }
    }

    private async activateAddRelatedDocumentPanel() {
        this.panels.activate(this.addRelatedDocumentPanel);
        const result = await this.addRelatedDocumentPanel.start();
        if (result.back) {
            this.activateRelatedDocumentListPanel();
        }
        else if (result.next) {
            this.activateRelatedDocumentListPanel();
        }
    }

    private async activateRelatedDocumentPanel() {
        this.panels.activate(this.relatedDocumentPanel);
        const result = await this.relatedDocumentPanel.start();
        if (result.back) {
            this.activateRelatedDocumentListPanel();
        }
        else if (result.editRequested) {
            this.selectDocumentLabelPanel.editMode(result.editRequested.documentEntry);
            this.activateSelectDocumentLabelPanel();
        }
    }

    start() {
        this.activateRelatedDocumentListPanel();
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}