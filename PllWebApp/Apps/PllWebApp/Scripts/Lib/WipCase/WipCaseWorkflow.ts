import { SingleActivePanel } from '@jasonbenfield/sharedwebapp/Panel/SingleActivePanel';
import { WipCaseWorkflowView } from './WipCaseWorkflowView';
import { Awaitable } from '@jasonbenfield/sharedwebapp/Awaitable';
import { StartCasePanel } from './StartCasePanel';
import { CancelCasePanel } from './CancelCasePanel';
import { SelectLocationWorkflow } from './SelectLocation/SelectLocationWorkflow';
import { SelectPersonWorkflow } from './SelectPerson/SelectPersonWorkflow';
import { PersonEntryListPanel } from './PersonEntryListPanel';
import { EnterDataGroupPanel } from './EnterDataGroupPanel';
import { RelatedDocumentWorkflow } from './RelatedDocuments/RelatedDocumentWorkflow';
import { CaseEntryPanel } from './CaseEntryPanel';
import { CaseEntry } from './CaseEntry';
import { PllAppApi } from '../Api/PllAppApi';

interface IResult {
    cancelled?: boolean;
    completed?: { cityworksID: number };
}

class Result {
    static cancelled() { return new Result({ cancelled: true }); }

    static completed(cityworksID: number) {
        return new Result({ completed: { cityworksID: cityworksID } });
    }

    private constructor(private readonly results: IResult) { }

    get cancelled() { return this.results.cancelled; }

    get completed() { return this.results.completed; }
}

export class WipCaseWorkflow implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly panels: SingleActivePanel;
    private readonly startCasePanel: StartCasePanel;
    private readonly cancelCasePanel: CancelCasePanel;
    private readonly selectLocationWorkflow: SelectLocationWorkflow;
    private readonly selectPersonWorkflow: SelectPersonWorkflow;
    private readonly personEntryListPanel: PersonEntryListPanel;
    private readonly enterDataGroupPanel: EnterDataGroupPanel;
    private readonly relatedDocumentWorkflow: RelatedDocumentWorkflow;
    private readonly caseEntryPanel: CaseEntryPanel;
    private caseEntry: CaseEntry;

    constructor(pllClient: PllAppApi, private readonly view: WipCaseWorkflowView) {
        this.panels = new SingleActivePanel();
        this.startCasePanel = this.panels.add(
            new StartCasePanel(pllClient, view.startCasePanelView)
        );
        this.cancelCasePanel = this.panels.add(
            new CancelCasePanel(view.cancelCasePanelView)
        );
        this.selectLocationWorkflow = this.panels.add(
            new SelectLocationWorkflow(pllClient, view.selectLocationWorkflowView)
        );
        this.selectPersonWorkflow = this.panels.add(
            new SelectPersonWorkflow(pllClient, view.selectPersonWorkflowView)
        );
        this.personEntryListPanel = this.panels.add(
            new PersonEntryListPanel(view.personEntryListPanelView)
        );
        this.enterDataGroupPanel = this.panels.add(
            new EnterDataGroupPanel(view.enterDataGroupPanelView)
        );
        this.relatedDocumentWorkflow = this.panels.add(
            new RelatedDocumentWorkflow(view.relatedDocumentWorkflowView)
        );
        this.caseEntryPanel = this.panels.add(
            new CaseEntryPanel(view.caseEntryPanelView)
        );
    }

    setCaseID(caseID: number) {
        this.startCasePanel.setCaseID(caseID);
    }

    start() {
        this.activateStartCasePanel();
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

    private async activateStartCasePanel() {
        this.panels.activate(this.startCasePanel);
        const result = await this.startCasePanel.start();
        if (result.started) {
            this.caseEntry = result.started.caseEntry;
            this.cancelCasePanel.setCaseEntry(this.caseEntry);
            this.selectLocationWorkflow.setCaseEntry(this.caseEntry);
            this.personEntryListPanel.setCaseEntry(this.caseEntry);
            this.relatedDocumentWorkflow.setCaseEntry(this.caseEntry);
            this.caseEntryPanel.setCaseEntry(this.caseEntry);
            if (this.caseEntry.location) {
                this.activateCaseEntryPanel();
            }
            else {
                this.activateSelectLocationWorkflow();
            }
        }
    }

    private async activateCancelCasePanel(callingPanel?: SelectLocationWorkflow | PersonEntryListPanel | EnterDataGroupPanel | CaseEntryPanel) {
        this.panels.activate(this.cancelCasePanel);
        const result = await this.cancelCasePanel.start();
        if (result.caseCancelled) {
            this.awaitable.resolve(Result.cancelled());
        }
        else if (result.back) {
            if (callingPanel === this.personEntryListPanel) {
                this.activatePersonListPanel();
            }
            else if (callingPanel === this.enterDataGroupPanel) {
                this.activateEnterDataGroupPanel();
            }
            else if (callingPanel === this.caseEntryPanel) {
                this.activateCaseEntryPanel();
            }
            else {
                this.activateSelectLocationWorkflow();
            }
        }
    }

    private async activateSelectLocationWorkflow(callingPanel?: CaseEntryPanel) {
        this.panels.activate(this.selectLocationWorkflow);
        const result = await this.selectLocationWorkflow.start();
        if (callingPanel === this.caseEntryPanel) {
            this.activateCaseEntryPanel();
        }
        else if (result.back) {
            this.activateCancelCasePanel();
        }
        else if (result.next) {
            const primaryPerson = this.caseEntry.getPrimaryPerson();
            if (!primaryPerson.isNobody && primaryPerson.person.PersonName) {
                this.activatePersonListPanel();
            }
            else {
                this.selectPersonWorkflow.setPersonEntry(primaryPerson);
                this.activateSelectPersonWorkflow();
            }
        }
    }

    private async activateSelectPersonWorkflow(callingPanel?: PersonEntryListPanel | CaseEntryPanel) {
        this.panels.activate(this.selectPersonWorkflow);
        const result = await this.selectPersonWorkflow.start();
        if (callingPanel === this.personEntryListPanel) {
            this.activatePersonListPanel();
        }
        else if (callingPanel === this.caseEntryPanel) {
            this.activateCaseEntryPanel();
        }
        else if (result.back) {
            this.activateSelectLocationWorkflow();
        }
        else if (result.next) {
            this.activatePersonListPanel();
        }
    }

    private async activatePersonListPanel(callingPanel?: CaseEntryPanel) {
        this.panels.activate(this.personEntryListPanel);
        const result = await this.personEntryListPanel.start();
        if (result.cancelCaseRequested) {
            this.activateCancelCasePanel(this.personEntryListPanel);
        }
        else if (callingPanel && (result.back || result.next)) {
            this.activateCaseEntryPanel();
        }
        else if (result.back) {
            this.activateSelectLocationWorkflow();
        }
        else if (result.next) {
            if (this.caseEntry.hasNextDataGroup()) {
                const dataGroupEntry = this.caseEntry.nextDataGroup();
                this.enterDataGroupPanel.setDataGroupEntry(dataGroupEntry);
                this.activateEnterDataGroupPanel();
            }
            else {
                this.activateRelatedDocumentWorkflow();
            }
        }
        else if (result.editPersonRequested) {
            this.selectPersonWorkflow.setPersonEntry(result.editPersonRequested.personEntry);
            this.activateSelectPersonWorkflow(callingPanel || this.personEntryListPanel);
        }
    }

    private async activateEnterDataGroupPanel(callingPanel?: CaseEntryPanel) {
        this.panels.activate(this.enterDataGroupPanel);
        const result = await this.enterDataGroupPanel.start();
        if (result.cancelCase) {
            this.activateCancelCasePanel(this.enterDataGroupPanel);
        }
        else if (callingPanel === this.caseEntryPanel) {
            this.activateCaseEntryPanel();
        }
        else if (result.back) {
            if (this.caseEntry.hasPreviousDataGroup()) {
                const dataGroupEntry = this.caseEntry.nextDataGroup();
                this.enterDataGroupPanel.setDataGroupEntry(dataGroupEntry);
                this.activateEnterDataGroupPanel();
            }
            else {
                this.activatePersonListPanel();
            }
        }
        else if (result.next) {
            if (this.caseEntry.hasNextDataGroup()) {
                const dataGroupEntry = this.caseEntry.nextDataGroup();
                this.enterDataGroupPanel.setDataGroupEntry(dataGroupEntry);
                this.activateEnterDataGroupPanel();
            }
            else {
                this.activateRelatedDocumentWorkflow();
            }
        }
    }

    private async activateRelatedDocumentWorkflow(callingPanel?: CaseEntryPanel) {
        this.panels.activate(this.relatedDocumentWorkflow);
        const result = await this.relatedDocumentWorkflow.start();
        if (callingPanel === this.caseEntryPanel) {
            this.activateCaseEntryPanel();
        }
        else if (result.back) {
            const dataGroupEntry = this.caseEntry.lastDataGroup();
            this.enterDataGroupPanel.setDataGroupEntry(dataGroupEntry);
            this.activateEnterDataGroupPanel();
        }
        else if (result.next) {
            this.activateCaseEntryPanel();
        }
    }

    private async activateCaseEntryPanel() {
        this.panels.activate(this.caseEntryPanel);
        const result = await this.caseEntryPanel.start();
        if (result.completed) {
            this.awaitable.resolve(Result.completed(result.completed.CityworksID));
        }
        else if (result.cancelCaseRequested) {
            this.activateCancelCasePanel(this.caseEntryPanel);
        }
        else if (result.editLocationRequested) {
            this.activateSelectLocationWorkflow(this.caseEntryPanel);
        }
        else if (result.editPersonRequested) {
            this.selectPersonWorkflow.setPersonEntry(result.editPersonRequested.personEntry);
            this.activateSelectPersonWorkflow(this.caseEntryPanel);
        }
        else if (result.editPeopleRequested) {
            this.activatePersonListPanel(this.caseEntryPanel);
        }
        else if (result.editDataGroupRequested) {
            this.enterDataGroupPanel.setDataGroupEntry(result.editDataGroupRequested.dataGroupEntry);
            this.activateEnterDataGroupPanel(this.caseEntryPanel);
        }
        else if (result.editRelatedDocumentsRequested) {
            this.activateRelatedDocumentWorkflow(this.caseEntryPanel);
        }
    }
}