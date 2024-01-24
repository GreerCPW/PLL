import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { PllAppApi } from "../../Api/PllAppApi";
import { AsyncCommand, Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { EnterLocationPanelView } from "./EnterLocationPanelView";
import { CaseEntry } from "../CaseEntry";
import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { AddressCandidateListItem } from "./AddressCandidateListItem";
import { TextButtonListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { InputControl } from "@jasonbenfield/sharedwebapp/Components/InputControl";
import { TextToTextViewValue } from "@jasonbenfield/sharedwebapp/Forms/TextToTextViewValue";
import { DelayedAction } from "@jasonbenfield/sharedwebapp/DelayedAction";

interface IResult {
    back?: boolean;
    selectOnMap?: boolean;
    next?: boolean;
}

class Result {
    static back() {
        return new Result({ back: true });
    }

    static selectOnMap() {
        return new Result({ selectOnMap: true });
    }

    static next() {
        return new Result({ next: true });
    }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get selectOnMap() { return this.results.selectOnMap; }

    get next() { return this.results.next; }
}

export class EnterLocationPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly locationInputControl: InputControl<string>;
    private readonly alert: MessageAlert;
    private readonly addressCandidateListGroup: ListGroup<AddressCandidateListItem, TextButtonListGroupItemView>;
    private caseEntry: CaseEntry;
    private readonly searchCommand: AsyncCommand;

    constructor(private readonly pllClient: PllAppApi, private readonly view: EnterLocationPanelView) {
        this.locationInputControl = new InputControl(view.locationInputView, new TextToTextViewValue());
        this.alert = new MessageAlert(view.alertView);
        this.addressCandidateListGroup = new ListGroup(view.addressCandidateListView);
        this.addressCandidateListGroup.registerItemClicked(this.onAddressCandidateSelected.bind(this));
        this.searchCommand = new AsyncCommand(this.search.bind(this));
        this.searchCommand.add(view.searchButton);
        view.handleFormSubmit(this.onFormSubmit.bind(this));
        new Command(this.selectOnMap.bind(this)).add(view.selectOnMapButton);
        new Command(this.back.bind(this)).add(view.backButton);
    }

    private selectOnMap() {
        this.awaitable.resolve(Result.selectOnMap());
    }

    private onFormSubmit() {
        return this.searchCommand.execute();
    }

    private async search() {
        const location = this.locationInputControl.getValue();
        if (location) {
            const addressCandidates = await this.alert.infoAction(
                'Searching...',
                () => this.pllClient.WipCase.GeocodeAddress(location)
            );
            this.addressCandidateListGroup.setItems(
                addressCandidates,
                (ac, itemView) => new AddressCandidateListItem(ac, itemView)
            );
            if (addressCandidates.length === 0) {
                this.alert.danger('No locations were found with this address.');
            }
            else if (addressCandidates.length === 1) {
                await this.next(addressCandidates[0]);
            }
        }
        else {
            this.addressCandidateListGroup.clearItems();
        }
    }

    private onAddressCandidateSelected(addressCandidateListItem: AddressCandidateListItem) {
        return this.next(addressCandidateListItem.addressCandidate);
    }

    private async next(addressCandidate: IAddressCandidateModel) {
        await this.alert.infoAction(
            'Saving...',
            () => this.caseEntry.saveAddressCandidate(addressCandidate)
        );
        this.awaitable.resolve(Result.next());
    }

    setCaseEntry(caseEntry: CaseEntry) {
        this.caseEntry = caseEntry;
    }

    private back() { this.awaitable.resolve(Result.back()); }

    start() {
        this.locationInputControl.setValue('');
        this.addressCandidateListGroup.clearItems();
        new DelayedAction(
            () => this.locationInputControl.setFocus(),
            100
        ).execute();
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}