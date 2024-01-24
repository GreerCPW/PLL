import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { SingleActivePanel } from "@jasonbenfield/sharedwebapp/Panel/SingleActivePanel";
import { PllAppApi } from "../../../Lib/Api/PllAppApi";
import { CaseEntry } from "../CaseEntry";
import { EnterLocationPanel } from "./EnterLocationPanel";
import { LocationPanel } from "./LocationPanel";
import { SelectLocationWorkflowView } from "./SelectLocationWorkflowView";
import { SelectLocationPanel } from "./SelectLocationPanel";

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

export class SelectLocationWorkflow implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly panels: SingleActivePanel;
    private readonly enterLocationPanel: EnterLocationPanel;
    private readonly locationPanel: LocationPanel;
    private readonly selectLocationPanel: SelectLocationPanel;
    private caseEntry: CaseEntry;

    constructor(pllClient: PllAppApi, private readonly view: SelectLocationWorkflowView) {
        this.panels = new SingleActivePanel();
        this.enterLocationPanel = this.panels.add(
            new EnterLocationPanel(pllClient, view.enterLocationPanelView)
        );
        this.locationPanel = this.panels.add(
            new LocationPanel(pllClient, view.locationPanelView)
        );
        this.selectLocationPanel = this.panels.add(
            new SelectLocationPanel(pllClient, view.selectLocationPanelView)
        );
    }

    setCaseEntry(caseEntry: CaseEntry) {
        this.caseEntry = caseEntry;
        this.enterLocationPanel.setCaseEntry(caseEntry);
        this.locationPanel.setCaseEntry(caseEntry);
        this.selectLocationPanel.setCaseEntry(caseEntry);
    }

    start() {
        if (this.caseEntry.location) {
            this.activateLocationPanel();
        }
        else {
            this.activateEnterLocationPanel();
        }
        return this.awaitable.start();
    }

    private async activateEnterLocationPanel() {
        this.panels.activate(this.enterLocationPanel);
        const result = await this.enterLocationPanel.start();
        if (result.back) {
            this.awaitable.resolve(Result.back());
        }
        else if (result.selectOnMap) {
            this.activateSelectLocationPanel();
        }
        else if (result.next) {
            this.awaitable.resolve(Result.next());
        }
    }

    private async activateLocationPanel() {
        this.panels.activate(this.locationPanel);
        const result = await this.locationPanel.start();
        if (result.enterLocationRequested) {
            this.activateEnterLocationPanel();
        }
        else if (result.back) {
            this.awaitable.resolve(Result.back());
        }
        else if (result.next) {
            this.awaitable.resolve(Result.next());
        }
    }

    private async activateSelectLocationPanel() {
        this.panels.activate(this.selectLocationPanel);
        const result = await this.selectLocationPanel.start();
        if (result.enterAddress) {
            this.activateEnterLocationPanel();
        }
        else if (result.back) {
            this.awaitable.resolve(Result.back());
        }
        else if (result.next) {
            this.awaitable.resolve(Result.next());
        }
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}