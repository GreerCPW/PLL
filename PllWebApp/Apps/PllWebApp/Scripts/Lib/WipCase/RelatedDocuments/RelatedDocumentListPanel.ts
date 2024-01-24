import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { RelatedDocumentListPanelView } from "./RelatedDocumentListPanelView";
import { CaseEntry } from "../CaseEntry";
import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { RelatedDocumentListItem } from "./RelatedDocumentListItem";
import { RelatedDocumentListItemView } from "./RelatedDocumentListItemView";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { CardAlert } from "@jasonbenfield/sharedwebapp/Components/CardAlert";
import { Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { RelatedDocumentEntry } from "./RelatedDocumentEntry";

interface IResult {
    back?: boolean;
    next?: boolean;
    documentSelected?: { documentEntry: RelatedDocumentEntry };
    addRequested?: boolean;
}

class Result {
    static back() { return new Result({ back: true }); }

    static next() { return new Result({ next: true }); }

    static documentSelected(documentEntry: RelatedDocumentEntry) {
        return new Result({ documentSelected: { documentEntry: documentEntry } });
    }

    static addRequested() { return new Result({ addRequested: true }); }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get next() { return this.results.next; }

    get documentSelected() { return this.results.documentSelected; }

    get addRequested() { return this.results.addRequested; }
}

export class RelatedDocumentListPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly alert: MessageAlert;
    private readonly documentListGroup: ListGroup<RelatedDocumentListItem, RelatedDocumentListItemView>;
    private caseEntry: CaseEntry;

    constructor(private readonly view: RelatedDocumentListPanelView) {
        this.alert = new CardAlert(view.alertView).alert;
        this.documentListGroup = new ListGroup(view.documentListGroupView);
        this.documentListGroup.registerItemClicked(this.onDocumentClicked.bind(this));
        new Command(this.back.bind(this)).add(view.backButton);
        new Command(this.next.bind(this)).add(view.nextButton);
        new Command(this.add.bind(this)).add(view.addDocumentButton);
    }

    private back() { this.awaitable.resolve(Result.back()); }

    private next() { this.awaitable.resolve(Result.next()); }

    private onDocumentClicked(documentListItem: RelatedDocumentListItem) {
        this.awaitable.resolve(Result.documentSelected(documentListItem.relatedDocumentEntry));
    }

    private add() {
        this.awaitable.resolve(Result.addRequested());
    }

    setCaseEntry(caseEntry: CaseEntry) {
        this.caseEntry = caseEntry;
    }

    start() {
        this.alert.clear();
        this.documentListGroup.setItems(
            this.caseEntry.relatedDocumentEntries,
            (d, itemView) => new RelatedDocumentListItem(d, itemView, true)
        );
        if (this.caseEntry.relatedDocumentEntries.length === 0) {
            this.alert.danger('No documents have been added.');
        }
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}