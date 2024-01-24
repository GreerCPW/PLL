import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { InputControl } from "@jasonbenfield/sharedwebapp/Components/InputControl";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { DelayedAction } from "@jasonbenfield/sharedwebapp/DelayedAction";
import { TextToTextViewValue } from "@jasonbenfield/sharedwebapp/Forms/TextToTextViewValue";
import { PllAppApi } from "../../Api/PllAppApi";
import { EditPersonPanelView } from "./EditPersonPanelView";

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

export class EditPersonPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly nameInputControl: InputControl<string>;
    private readonly cellPhoneInputControl: InputControl<string>;
    private readonly emailInputControl: InputControl<string>;
    private readonly alert: MessageAlert;
    private person: ICustomerPersonModel;

    constructor(private readonly pllClient: PllAppApi, private readonly view: EditPersonPanelView) {
        this.nameInputControl = new InputControl(view.nameInputView, new TextToTextViewValue());
        this.cellPhoneInputControl = new InputControl(view.cellPhoneInputView, new TextToTextViewValue());
        this.emailInputControl = new InputControl(view.emailInputView, new TextToTextViewValue());
        view.handleFormSubmit(this.onFormSubmit.bind(this));
        this.alert = new MessageAlert(view.alert);
        new Command(this.next.bind(this)).add(view.nextButton);
        new Command(this.back.bind(this)).add(view.backButton);
    }

    private onFormSubmit() {
        this.next();
    }

    private back() {
        this.awaitable.resolve(Result.back());
    }

    private async next() {
        const name = this.nameInputControl.getValue();
        const cellPhone = this.cellPhoneInputControl.getValue();
        const email = this.emailInputControl.getValue();
        await this.alert.infoAction(
            'Saving...',
            () => this.pllClient.WipCase.EditPerson({
                PersonID: this.person.ID,
                PersonName: name,
                CellPhone: cellPhone,
                Email: email
            })
        );
        this.awaitable.resolve(Result.next());
    }

    setPerson(person: ICustomerPersonModel) {
        this.person = person;
        this.nameInputControl.setValue(person.PersonName);
        this.cellPhoneInputControl.setValue(person.CellPhone);
        this.emailInputControl.setValue(person.Email);
    }

    start() {
        new DelayedAction(
            () => this.nameInputControl.setFocus(),
            700
        ).execute();
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}