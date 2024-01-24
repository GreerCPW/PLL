import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { PllAppApi } from "../../Lib/Api/PllAppApi";
import { StartCasePanelView } from "./StartCasePanelView";
import { CaseEntry } from "./CaseEntry";

interface IResult {
    started?: { caseEntry: CaseEntry };
}

class Result {
    static started(caseEntry: CaseEntry) {
        return new Result({ started: { caseEntry: caseEntry } });
    }

    private constructor(private readonly results: IResult) { }

    get started() { return this.results.started; }

}

export class StartCasePanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly alert: MessageAlert;
    private caseID: number;

    constructor(private readonly customerClient: PllAppApi, private readonly view: StartCasePanelView) {
        this.alert = new MessageAlert(view.alertView);
    }

    setCaseID(caseID: number) {
        this.caseID = caseID;
    }

    start() {
        this.refresh();
        return this.awaitable.start();
    }

    activate() {
        this.view.show();
    }

    private async refresh() {
        const customerCase = await this.alert.infoAction(
            'Loading...',
            () => this.customerClient.WipCase.GetCaseDetail(this.caseID)
        );
        const caseEntry = new CaseEntry(this.customerClient, customerCase);
        this.awaitable.resolve(Result.started(caseEntry));
    }

    deactivate() { this.view.hide(); }

}