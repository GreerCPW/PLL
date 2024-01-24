import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { SingleActivePanel } from "@jasonbenfield/sharedwebapp/Panel/SingleActivePanel";
import { PllAppApi } from "../../../Lib/Api/PllAppApi";
import { CasePersonEntry } from "../CasePersonEntry";
import { ConfirmPersonPanel } from "./ConfirmPersonPanel";
import { EnterCasePersonPanel } from "./EnterCasePersonPanel";
import { SelectPersonPanel } from "./SelectPersonPanel";
import { SelectPersonWorkflowView } from "./SelectPersonWorkflowView";

interface IResult {
    back?: boolean;
    next?: boolean;
}

class Result {
    static back() {
        return new Result({ back: true });
    }

    static next() {
        return new Result({ next: true });
    }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get next() { return this.results.next; }
}

export class SelectPersonWorkflow implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly panels: SingleActivePanel;
    private readonly selectPersonPanel: SelectPersonPanel;
    private readonly enterCasePersonPanel: EnterCasePersonPanel;
    private readonly confirmPersonPanel: ConfirmPersonPanel;
    private personEntry: CasePersonEntry;

    constructor(private readonly customerClient: PllAppApi, private readonly view: SelectPersonWorkflowView) {
        this.panels = new SingleActivePanel();
        this.selectPersonPanel = this.panels.add(
            new SelectPersonPanel(this.customerClient, view.selectPersonPanelView)
        );
        this.confirmPersonPanel = this.panels.add(
            new ConfirmPersonPanel(view.confirmPersonPanelView)
        );
        this.enterCasePersonPanel = this.panels.add(
            new EnterCasePersonPanel(view.enterPersonPanelView)
        );
    }

    setPersonEntry(personEntry: CasePersonEntry) {
        this.personEntry = personEntry;
        this.selectPersonPanel.setPersonEntry(personEntry);
        this.confirmPersonPanel.setPersonEntry(personEntry);
        this.enterCasePersonPanel.setPersonEntry(personEntry);
    }

    start() {
        if (this.personEntry.isNobody) {
            this.activateSelectPersonPanel();
        }
        else {
            this.activateConfirmPersonPanel();
        }
        return this.awaitable.start();
    }

    private async activateSelectPersonPanel() {
        this.panels.activate(this.selectPersonPanel);
        const result = await this.selectPersonPanel.start();
        if (result.back) {
            this.awaitable.resolve(Result.back());
        }
        else if (result.addNewPersonRequested) {
            this.enterCasePersonPanel.addPersonMode();
            this.activateEnterPersonPanel(result.addNewPersonRequested.auto ? null : this.selectPersonPanel);
        }
        else if (result.personSelected) {
            this.confirmPersonPanel.setPerson(result.personSelected.person);
            this.activateConfirmPersonPanel();
        }
    }

    private async activateConfirmPersonPanel() {
        this.panels.activate(this.confirmPersonPanel);
        const result = await this.confirmPersonPanel.start();
        if (result.selectPersonRequested) {
            this.activateSelectPersonPanel();
        }
        else if (result.editPersonRequested) {
            this.enterCasePersonPanel.editPersonMode(result.editPersonRequested.person);
            this.activateEnterPersonPanel();
        }
        else if (result.next) {
            this.awaitable.resolve(Result.next());
        }
    }

    private async activateEnterPersonPanel(backPanel?: SelectPersonPanel) {
        this.panels.activate(this.enterCasePersonPanel);
        const result = await this.enterCasePersonPanel.start();
        if (result.back) {
            if (backPanel) {
                this.activateSelectPersonPanel();
            }
            else {
                this.awaitable.resolve(Result.back());
            }
        }
        else if (result.next) {
            this.selectPersonPanel.requireRefresh();
            this.awaitable.resolve(Result.next());
        }
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}