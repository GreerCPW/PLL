import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { EnterDataGroupPanelView } from "./EnterDataGroupPanelView";
import { DataGroupEntryComponent } from "./DataGroupEntryComponent";
import { DataGroupEntry } from "./DataGroupEntry";
import { AsyncCommand, Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";

interface IResult {
    back?: boolean;
    cancelCase?: boolean;
    next?: boolean;
}

class Result {
    static back() { return new Result({ back: true }); }

    static cancelCase() { return new Result({ cancelCase: true }); }

    static next() { return new Result({ next: true }); }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get cancelCase() { return this.results.cancelCase; }

    get next() { return this.results.next; }
}

export class EnterDataGroupPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly dataGroupEntryComponent: DataGroupEntryComponent;
    private readonly alert: MessageAlert;
    private dataGroupEntry: DataGroupEntry;

    constructor(private readonly view: EnterDataGroupPanelView) {
        this.dataGroupEntryComponent = new DataGroupEntryComponent(view.dataGroupEntryView);
        this.alert = new MessageAlert(view.alertView);
        new Command(this.back.bind(this)).add(view.backButton);
        new Command(this.cancelCase.bind(this)).add(view.cancelButton);
        new AsyncCommand(this.next.bind(this)).add(view.nextButton);
        view.handleFormSubmit(this.onFormSubmit.bind(this));
    }

    private cancelCase() {
        this.awaitable.resolve(Result.cancelCase());
    }

    private onFormSubmit() {
        return this.next();
    }

    private back() {
        this.dataGroupEntryComponent.save();
        this.awaitable.resolve(Result.back());
    }

    private async next() {
        this.dataGroupEntryComponent.save();
        await this.alert.infoAction(
            'Saving...',
            () => this.dataGroupEntry.save()
        );
        this.awaitable.resolve(Result.next());
    }

    setDataGroupEntry(dataGroupEntry: DataGroupEntry) {
        this.dataGroupEntry = dataGroupEntry;
        this.dataGroupEntryComponent.setDataGroupEntry(dataGroupEntry);
    }

    start() {
        return this.awaitable.start();
    }

    activate() {
        this.view.show();
        this.dataGroupEntryComponent.setFocus();
    }

    deactivate() { this.view.hide(); }
}