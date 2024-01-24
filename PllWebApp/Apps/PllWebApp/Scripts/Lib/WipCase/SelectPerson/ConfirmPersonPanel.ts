
import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { AsyncCommand, Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { CasePersonEntry } from "../CasePersonEntry";
import { ConfirmPersonPanelView } from "./ConfirmPersonPanelView";

interface IResult {
    selectPersonRequested?: boolean;
    next?: boolean;
    editPersonRequested?: { person: ICustomerPersonModel }
}

class Result {
    static selectPersonRequested() { return new Result({ selectPersonRequested: true }); }

    static next() { return new Result({ next: true }); }

    static editPersonRequested(person: ICustomerPersonModel) {
        return new Result({ editPersonRequested: { person: person } });
    }

    private constructor(private readonly results: IResult) { }

    get selectPersonRequested() { return this.results.selectPersonRequested; }

    get next() { return this.results.next; }

    get editPersonRequested() { return this.results.editPersonRequested; }
}

export class ConfirmPersonPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly alert: MessageAlert;
    private readonly roleDescriptionText: TextComponent;
    private readonly nameTextComponent: TextComponent;
    private readonly cellPhoneTextComponent: TextComponent;
    private readonly emailTextComponent: TextComponent;
    private readonly resetCasePersonCommand: AsyncCommand;
    private personEntry: CasePersonEntry;
    private person: ICustomerPersonModel;

    constructor(private readonly view: ConfirmPersonPanelView) {
        this.roleDescriptionText = new TextComponent(view.roleDescriptionView);
        this.nameTextComponent = new TextComponent(view.nameTextView);
        this.cellPhoneTextComponent = new TextComponent(view.cellPhoneTextView);
        this.emailTextComponent = new TextComponent(view.emailTextView);
        this.alert = new MessageAlert(view.alert);
        new Command(this.back.bind(this)).add(view.selectPersonButton);
        new Command(this.edit.bind(this)).add(view.editPersonButton);
        new AsyncCommand(this.next.bind(this)).add(view.nextButton);
        this.resetCasePersonCommand = new AsyncCommand(this.resetCasePerson.bind(this));
        this.resetCasePersonCommand.add(view.removePersonButton);
    }

    private async resetCasePerson() {
        await this.alert.infoAction(
            'Saving...',
            () => this.personEntry.reset()
        )
        this.awaitable.resolve(Result.next());
    }

    private back() {
        this.awaitable.resolve(Result.selectPersonRequested());
    }

    private edit() {
        this.awaitable.resolve(Result.editPersonRequested(this.person));
    }

    private async next() {
        await this.alert.infoAction(
            'Saving...',
            () => this.personEntry.save(this.person.ID)
        )
        this.awaitable.resolve(Result.next());
    }

    setPersonEntry(personEntry: CasePersonEntry) {
        this.personEntry = personEntry;
        this.roleDescriptionText.setText(personEntry.roleDescription);
        this.setPerson(personEntry.person);
    }

    setPerson(person: ICustomerPersonModel) {
        this.person = person;
        this.nameTextComponent.setText(person.PersonName);
        this.cellPhoneTextComponent.setText(person.CellPhone);
        this.emailTextComponent.setText(person.Email);
    }

    start() {
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}