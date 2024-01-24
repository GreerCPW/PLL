import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { AsyncCommand, Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { InputControl } from "@jasonbenfield/sharedwebapp/Components/InputControl";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { DelayedAction } from "@jasonbenfield/sharedwebapp/DelayedAction";
import { TextToTextViewValue } from "@jasonbenfield/sharedwebapp/Forms/TextToTextViewValue";
import { CasePersonEntry } from "../CasePersonEntry";
import { EnterCasePersonPanelView } from "./EnterCasePersonPanelView";

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

export class EnterCasePersonPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly roleDescriptionText: TextComponent;
    private readonly nameInputControl: InputControl<string>;
    private readonly cellPhoneInputControl: InputControl<string>;
    private readonly emailInputControl: InputControl<string>;
    private readonly alert: MessageAlert;
    private isAddMode = false;
    private personEntry: CasePersonEntry;
    private person: ICustomerPersonModel;

    constructor(private readonly view: EnterCasePersonPanelView) {
        this.roleDescriptionText = new TextComponent(view.roleDescriptionView);
        this.nameInputControl = new InputControl(view.nameInputView, new TextToTextViewValue());
        this.cellPhoneInputControl = new InputControl(view.cellPhoneInputView, new TextToTextViewValue());
        this.emailInputControl = new InputControl(view.emailInputView, new TextToTextViewValue());
        this.alert = new MessageAlert(view.alert);
        view.handleFormSubmit(this.onFormSubmit.bind(this));
        new AsyncCommand(this.next.bind(this)).add(view.nextButton);
        new Command(this.back.bind(this)).add(view.backButton);
    }

    private onFormSubmit() {
        this.next();
    }

    private back() {
        this.awaitable.resolve(Result.back());
    }

    private async next() {
        await this.alert.infoAction(
            'Saving...',
            () => this.save()
        );
        this.awaitable.resolve(Result.next());
    }

    private async save() {
        const name = this.nameInputControl.getValue();
        const cellPhone = this.cellPhoneInputControl.getValue();
        const email = this.emailInputControl.getValue();
        if (this.isAddMode) {
            await this.personEntry.saveNew(name, cellPhone, email);
        }
        else {
            await this.alert.infoAction(
                'Saving...',
                () => this.personEntry.saveExisting(this.person.ID, name, cellPhone, email)
            );
        }
    }

    setPersonEntry(personEntry: CasePersonEntry) {
        this.personEntry = personEntry;
        this.roleDescriptionText.setText(personEntry.roleDescription);
        this.setPerson(personEntry.person);
    }

    addPersonMode() {
        this.isAddMode = true;
        this.setPerson({
            ID: 0,
            PersonKey: 'NOBODY',
            PersonName: '',
            CellPhone: '',
            Email: ''
        });
    }

    editPersonMode(person: ICustomerPersonModel) {
        this.isAddMode = false;
        this.setPerson(person);
    }

    private setPerson(person: ICustomerPersonModel) {
        this.person = person;
        this.nameInputControl.setValue(person.PersonName);
        this.cellPhoneInputControl.setValue(person.CellPhone);
        this.emailInputControl.setValue(person.Email);
    }

    start() {
        new DelayedAction(
            () => this.nameInputControl.setFocus(),
            10
        ).execute();
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}