import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { FormGroupGridView, FormGroupInputView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { FormView } from "@jasonbenfield/sharedwebapp/Views/FormView";
import { InputView } from "@jasonbenfield/sharedwebapp/Views/InputView";
import { PllTheme } from "../../PllTheme";
import { PanelView } from "../../PanelView";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";

export class EditPersonPanelView extends PanelView {
    private readonly form: FormView;
    readonly nameInputView: InputView;
    readonly cellPhoneInputView: InputView;
    readonly emailInputView: InputView;
    readonly alert: MessageAlertView;
    readonly backButton: ButtonCommandView;
    readonly nextButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.form = this.body.addView(FormView);
        this.form.addOffscreenSubmit();
        const formGroupContainer = this.form.addView(FormGroupGridView);
        const nameFormGroup = formGroupContainer.addFormGroup(FormGroupInputView);
        nameFormGroup.caption.setText('Name');
        this.nameInputView = nameFormGroup.input;
        const cellPhoneInputFormGroup = formGroupContainer.addFormGroup(FormGroupInputView);
        cellPhoneInputFormGroup.caption.setText('Cell Phone');
        this.cellPhoneInputView = cellPhoneInputFormGroup.input;
        const emailFormGroup = formGroupContainer.addFormGroup(FormGroupInputView);
        emailFormGroup.caption.setText('Email');
        this.emailInputView = emailFormGroup.input;
        this.alert = this.body.addView(MessageAlertView);
        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
        this.nextButton = PllTheme.instance.commandToolbar.nextButton(
            this.toolbar.addButtonCommandToEnd()
        );
    }

    handleFormSubmit(action: () => void) {
        this.form.onSubmit()
            .preventDefault()
            .execute(action)
            .subscribe();
    }
}