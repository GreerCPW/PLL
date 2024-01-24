import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { CancelCasePanelView } from "./CancelCasePanelView";
import { AsyncCommand, Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { CaseEntry } from "./CaseEntry";

interface IResult {
    back?: boolean;
    caseCancelled?: boolean;
}

class Result {
    static back() { return new Result({ back: true }); }

    static cancelled() {
        return new Result({ caseCancelled: true });
    }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get caseCancelled() { return this.results.caseCancelled; }
}

export class CancelCasePanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly alert: MessageAlert;
    private caseEntry: CaseEntry;

    constructor(private readonly view: CancelCasePanelView) {
        this.alert = new MessageAlert(view.alertView);
        new Command(this.no.bind(this)).add(view.noButton);
        new AsyncCommand(this.yes.bind(this)).add(view.yesButton);
    }

    setCaseEntry(caseEntry: CaseEntry) {
        this.caseEntry = caseEntry;
    }

    private no() { this.awaitable.resolve(Result.back()); }

    private async yes() {
        await this.alert.infoAction(
            'Cancelling...',
            () => this.caseEntry.cancel()
        );
        this.awaitable.resolve(Result.cancelled());
    }

    start() {
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}