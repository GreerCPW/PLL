import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { AddRelatedDocumentPanelView } from "./AddRelatedDocumentPanelView";
import { AsyncCommand, Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { CaseEntry } from "../CaseEntry";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { FileInputControl } from "@jasonbenfield/sharedwebapp/Components/FileInputControl";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";

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

export class AddRelatedDocumentPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly labelTextComponent: TextComponent;
    private readonly fileInputControl: FileInputControl;
    private readonly alert: MessageAlert;
    private caseEntry: CaseEntry;
    private label: ICwDocumentLabelModel;

    constructor(private readonly view: AddRelatedDocumentPanelView) {
        this.labelTextComponent = new TextComponent(view.labelTextView);
        this.fileInputControl = new FileInputControl(view.fileInputView);
        this.alert = new MessageAlert(view.alertView);
        new Command(this.back.bind(this)).add(view.backButton);
        new AsyncCommand(this.next.bind(this)).add(view.nextButton);
    }

    private back() {
        this.awaitable.resolve(Result.back());
    }

    private async next() {
        const file = this.fileInputControl.getFiles()[0];
        if (file) {
            await this.alert.infoAction(
                'Saving...',
                () => this.caseEntry.addRelatedDocument(this.label, file)
            );
            this.awaitable.resolve(Result.next());
        }
    }

    setCaseEntry(caseEntry: CaseEntry) {
        this.caseEntry = caseEntry;
    }

    setLabel(label: ICwDocumentLabelModel) {
        this.label = label;
        this.labelTextComponent.setText(label.LabelText);
    }

    start() {
        this.view.fileInputView.setValue(null);
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}