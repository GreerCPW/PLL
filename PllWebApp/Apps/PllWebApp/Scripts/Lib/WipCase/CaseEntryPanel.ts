import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { AsyncCommand, Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { CaseEntry } from "./CaseEntry";
import { CaseEntryPanelView } from "./CaseEntryPanelView";
import { PersonEntryListItem } from "./PersonEntryListItem";
import { PersonEntryListItemView } from "./PersonEntryListItemView";
import { DataGroupContainerComponent } from "./DataGroupContainerComponent";
import { CasePersonEntry } from "./CasePersonEntry";
import { ModalConfirm } from "@jasonbenfield/sharedwebapp/Components/ModalConfirm";
import { DataGroupEntry } from "./DataGroupEntry";
import { RelatedDocumentListItem } from "./RelatedDocuments/RelatedDocumentListItem";
import { RelatedDocumentListItemView } from "./RelatedDocuments/RelatedDocumentListItemView";
import { CardAlert } from "@jasonbenfield/sharedwebapp/Components/CardAlert";

interface IResult {
    readonly completed?: { CityworksID: number };
    readonly cancelCaseRequested?: boolean;
    readonly editLocationRequested?: boolean;
    readonly editPeopleRequested?: boolean;
    readonly editPersonRequested?: { personEntry: CasePersonEntry; }
    readonly editDataGroupRequested?: { dataGroupEntry: DataGroupEntry; }
    readonly editRelatedDocumentsRequested?: boolean;
}

class Result {
    static completed(cityworksID: number) {
        return new Result({ completed: { CityworksID: cityworksID } });
    }

    static cancelCaseRequested() {
        return new Result({ cancelCaseRequested: true });
    }

    static editLocationRequested() {
        return new Result({ editLocationRequested: true });
    }

    static editPersonRequested(personEntry: CasePersonEntry) {
        return new Result({ editPersonRequested: { personEntry: personEntry } });
    }

    static editPeopleRequested() {
        return new Result({ editPeopleRequested: true });
    }

    static editDataGroupRequested(dataGroupEntry: DataGroupEntry) {
        return new Result({ editDataGroupRequested: { dataGroupEntry: dataGroupEntry } });
    }

    static editRelatedDocumentsRequested() {
        return new Result({ editRelatedDocumentsRequested: true });
    }

    private constructor(private readonly results: IResult) { }

    get completed() { return this.results.completed; }

    get cancelCaseRequested() { return this.results.cancelCaseRequested; }

    get editLocationRequested() { return this.results.editLocationRequested; }

    get editPersonRequested() { return this.results.editPersonRequested; }

    get editPeopleRequested() { return this.results.editPeopleRequested; }

    get editDataGroupRequested() { return this.results.editDataGroupRequested; }

    get editRelatedDocumentsRequested() { return this.results.editRelatedDocumentsRequested; }
}

export class CaseEntryPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly alert: MessageAlert;
    private readonly businessCaseTextComponent: TextComponent;
    private readonly locationTextComponent: TextComponent;
    private readonly personListGroup: ListGroup<PersonEntryListItem, PersonEntryListItemView>;
    private readonly dataGroupContainerComponent: DataGroupContainerComponent;
    private readonly documentListGroup: ListGroup<RelatedDocumentListItem, RelatedDocumentListItemView>;
    private readonly documentAlert: MessageAlert;
    private caseEntry: CaseEntry;

    constructor(private readonly view: CaseEntryPanelView) {
        this.alert = new MessageAlert(view.alertView);
        this.businessCaseTextComponent = new TextComponent(view.businessCaseTextView);
        this.locationTextComponent = new TextComponent(view.locationTextView);
        this.personListGroup = new ListGroup(view.personEntryListView);
        view.handlePersonEntryEditClicked(this.onPersonEditButtonClicked.bind(this));
        this.dataGroupContainerComponent = new DataGroupContainerComponent(view.dataGroupContainerView);
        this.dataGroupContainerComponent.when.editRequested.then(this.onDataGroupEditRequested.bind(this));
        this.documentListGroup = new ListGroup(view.documentListGroupView);
        this.documentAlert = new CardAlert(view.documentAlertView).alert;
        new Command(this.onLocationEditClicked.bind(this)).add(view.editLocationButton);
        new Command(this.onEditPeopleButtonClicked.bind(this)).add(view.editPeopleButton);
        new Command(this.onEditDocumentButtonClicked.bind(this)).add(view.editDocumentButton);
        new AsyncCommand(this.complete.bind(this)).add(view.completeButton);
        new AsyncCommand(this.cancel.bind(this)).add(view.cancelCaseButton);
    }

    private onPersonEditButtonClicked(el: HTMLElement) {
        const personEntryListItem = this.personListGroup.getItemByElement(el);
        this.awaitable.resolve(Result.editPersonRequested(personEntryListItem.personEntry));
    }

    private onEditPeopleButtonClicked(el: HTMLElement) {
        this.awaitable.resolve(Result.editPeopleRequested());
    }

    private onDataGroupEditRequested(dataGroupEntry: DataGroupEntry) {
        this.awaitable.resolve(Result.editDataGroupRequested(dataGroupEntry));
    }

    private onLocationEditClicked() {
        this.awaitable.resolve(Result.editLocationRequested());
    }

    private onEditDocumentButtonClicked() {
        this.awaitable.resolve(Result.editRelatedDocumentsRequested());
    }

    setCaseEntry(caseEntry: CaseEntry) {
        this.caseEntry = caseEntry;
    }

    private async complete() {
        const cityworksID = await this.alert.infoAction(
            'Submitting...',
            () => this.caseEntry.complete()
        );
        this.awaitable.resolve(Result.completed(cityworksID));
    }

    private async cancel() {
        this.awaitable.resolve(Result.cancelCaseRequested());
    }

    start() {
        this.documentAlert.clear();
        this.businessCaseTextComponent.setText(this.caseEntry.businessCaseDescription);
        this.locationTextComponent.setText(this.caseEntry.location);
        this.personListGroup.setItems(
            this.caseEntry.personEntries,
            (p, itemView) => new PersonEntryListItem(p, itemView, false)
        );
        this.dataGroupContainerComponent.setDataGroupEntries(this.caseEntry.dataGroupEntries);
        this.documentListGroup.setItems(
            this.caseEntry.relatedDocumentEntries,
            (d, itemView) => new RelatedDocumentListItem(d, itemView, false)
        );
        if (this.caseEntry.relatedDocumentEntries.length === 0) {
            this.documentAlert.danger('No Documents have been added.');
        }
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}