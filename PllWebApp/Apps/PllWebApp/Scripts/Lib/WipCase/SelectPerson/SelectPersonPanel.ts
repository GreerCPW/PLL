import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { DelayedAction } from "@jasonbenfield/sharedwebapp/DelayedAction";
import { PllAppApi } from "../../Api/PllAppApi";
import { CasePersonEntry } from "../CasePersonEntry";
import { PersonListItem } from "./PersonListItem";
import { PersonListItemView } from "./PersonListItemView";
import { SelectPersonPanelView } from "./SelectPersonPanelView";

interface IResult {
    back?: boolean;
    addNewPersonRequested?: { auto: boolean; }
    personSelected?: { person: ICustomerPersonModel; }
}

class Result {
    static back() { return new Result({ back: true }); }

    static personSelected(person: ICustomerPersonModel) {
        return new Result({ personSelected: { person: person } });
    }

    static addNewPersonRequested(auto: boolean) {
        return new Result({ addNewPersonRequested: { auto: auto } });
    }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get addNewPersonRequested() { return this.results.addNewPersonRequested; }

    get personSelected() { return this.results.personSelected; }
}

export class SelectPersonPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly alert: MessageAlert;
    private readonly roleDescriptionText: TextComponent;
    private readonly personListGroup: ListGroup<PersonListItem, PersonListItemView>;
    private isRefreshRequired = true;

    constructor(private readonly pllClient: PllAppApi, private readonly view: SelectPersonPanelView) {
        this.alert = new MessageAlert(view.alert);
        this.roleDescriptionText = new TextComponent(view.roleDescriptionView);
        this.personListGroup = new ListGroup(view.personListView);
        this.personListGroup.registerItemClicked(this.onPersonSelected.bind(this));
        new Command(this.back.bind(this)).add(view.backButton);
        new Command(this.add.bind(this)).add(view.addNewPersonButton);
    }

    private onPersonSelected(personListItem: PersonListItem) {
        this.awaitable.resolve(Result.personSelected(personListItem.person));
    }

    private back() {
        this.awaitable.resolve(Result.back());
    }

    private add() {
        this.awaitable.resolve(Result.addNewPersonRequested(false));
    }

    setPersonEntry(personEntry: CasePersonEntry) {
        this.roleDescriptionText.setText(personEntry.roleDescription);
    }

    start() {
        this.refresh();
        return this.awaitable.start();
    }

    requireRefresh() {
        this.isRefreshRequired = true;
    }

    private async refresh() {
        if (this.isRefreshRequired) {
            const people = await this.alert.infoAction(
                'Loading...',
                () => this.pllClient.WipCase.GetPeople()
            );
            this.isRefreshRequired = false;
            this.personListGroup.setItems(
                people,
                (p, itemView) => new PersonListItem(p, itemView)
            );
            if (people.length === 0) {
                new DelayedAction(
                    () => this.awaitable.resolve(Result.addNewPersonRequested(true)),
                    500
                ).execute();
            }
        }
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}