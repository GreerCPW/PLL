import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { TextButtonListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { LabelListItem } from "./LabelListItem";
import { SelectDocumentLabelPanelView } from "./SelectDocumentLabelPanelView";
import { Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { RelatedDocumentEntry } from "./RelatedDocumentEntry";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";

interface IResult {
    back?: boolean;
    documentUpdated?: boolean;
    labelSelected?: { label: ICwDocumentLabelModel; };
}

class Result {
    static back() { return new Result({ back: true }); }

    static documentUpdated() { return new Result({ documentUpdated: true }); }

    static labelSelected(label: ICwDocumentLabelModel) {
        return new Result({ labelSelected: { label: label } });
    }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get documentUpdated() { return this.results.documentUpdated; }

    get labelSelected() { return this.results.labelSelected; }
}

export class SelectDocumentLabelPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly labelListGroup: ListGroup<LabelListItem, TextButtonListGroupItemView>;
    private readonly alert: MessageAlert;
    private documentEntry: RelatedDocumentEntry;

    constructor(private readonly view: SelectDocumentLabelPanelView) {
        this.alert = new MessageAlert(view.alertView);
        this.labelListGroup = new ListGroup(view.labelListGroupView);
        this.labelListGroup.registerItemClicked(this.onLabelClicked.bind(this));
        new Command(this.back.bind(this)).add(view.backButton);
    }

    private back() { this.awaitable.resolve(Result.back()); }

    private async onLabelClicked(labelListItem: LabelListItem) {
        if (this.documentEntry) {
            await this.alert.infoAction(
                'Saving...',
                () => this.documentEntry.updateLabel(labelListItem.label)
            );
            this.awaitable.resolve(Result.documentUpdated());
        }
        else {
            this.awaitable.resolve(Result.labelSelected(labelListItem.label));
        }
    }

    setLabels(labels: ICwDocumentLabelModel[]) {
        this.labelListGroup.setItems(
            labels,
            (l, itemView) => new LabelListItem(l, itemView)
        );
    }

    addMode() {
        this.documentEntry = null;
        for (const labelListItem of this.labelListGroup.getItems()) {
            labelListItem.styleAsNotActive();
        }
    }

    editMode(documentEntry: RelatedDocumentEntry) {
        this.documentEntry = documentEntry;
        for (const labelListItem of this.labelListGroup.getItems()) {
            if (labelListItem.label.ID === documentEntry.labelID) {
                labelListItem.styleAsActive();
            }
            else {
                labelListItem.styleAsNotActive();
            }
        }
    }

    start() {
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}