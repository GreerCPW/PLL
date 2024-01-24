import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { RelatedDocumentPanelView } from "./RelatedDocumentPanelView";
import { RelatedDocumentEntry } from "./RelatedDocumentEntry";
import { AsyncCommand, Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { ModalConfirm } from "@jasonbenfield/sharedwebapp/Components/ModalConfirm";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";

interface IResult {
    back?: boolean;
    editRequested?: { documentEntry: RelatedDocumentEntry };
}

class Result {
    static back() { return new Result({ back: true }); }

    static editRequested(documentEntry: RelatedDocumentEntry) {
        return new Result({ editRequested: { documentEntry: documentEntry } });
    }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get editRequested() { return this.results.editRequested; }
}

export class RelatedDocumentPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly labelTextComponent: TextComponent;
    private readonly fileNameTextComponent: TextComponent;
    private readonly alert: MessageAlert;
    private readonly modalConfirm: ModalConfirm;
    private relatedDocumentEntry: RelatedDocumentEntry;

    constructor(private readonly view: RelatedDocumentPanelView) {
        this.alert = new MessageAlert(view.alertView);
        this.labelTextComponent = new TextComponent(view.labelTextView);
        this.fileNameTextComponent = new TextComponent(view.fileNameTextView);
        this.modalConfirm = new ModalConfirm(view.modalConfirmView);
        new Command(this.back.bind(this)).add(view.backButton);
        new Command(this.edit.bind(this)).add(view.editButton);
        new Command(this.download.bind(this)).add(view.downloadButton);
        new AsyncCommand(this.deleteRelatedDocument.bind(this)).add(view.deleteButton);
    }

    setRelatedDocumentEntry(relatedDocumentEntry: RelatedDocumentEntry) {
        this.relatedDocumentEntry = relatedDocumentEntry;
    }

    private back() {
        this.awaitable.resolve(Result.back());
    }

    private download() {
        this.relatedDocumentEntry.downloadDocument();
    }

    private edit() {
        this.awaitable.resolve(Result.editRequested(this.relatedDocumentEntry));
    }

    private async deleteRelatedDocument() {
        const isConfirmed = await this.modalConfirm.confirm('Delete this document?', 'Confirm Delete');
        if (isConfirmed) {
            await this.alert.infoAction(
                'Deleting...',
                () => this.relatedDocumentEntry.deleteDocument()
            ); this.awaitable.resolve(Result.back());
        }
    }

    start() {
        this.labelTextComponent.setText(this.relatedDocumentEntry.labelText);
        this.fileNameTextComponent.setText(this.relatedDocumentEntry.fileName);
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}