import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { PanelView } from "../../PanelView";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { PllTheme } from "../../PllTheme";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { TextHeading1View } from "@jasonbenfield/sharedwebapp/Views/TextHeadings";
import { FormView } from "@jasonbenfield/sharedwebapp/Views/FormView";
import { FormGroupGridView, FormGroupInputView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { InputView } from "@jasonbenfield/sharedwebapp/Views/InputView";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";

export class EnterCasePersonPanelView extends PanelView {
    readonly roleDescriptionView: BasicTextComponentView;
    private readonly form: FormView;
    readonly nameInputView: InputView;
    readonly cellPhoneInputView: InputView;
    readonly emailInputView: InputView;
    readonly alert: MessageAlertView;
    readonly backButton: ButtonCommandView;
    readonly nextButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.roleDescriptionView = this.body.addView(TextHeading1View);
        this.roleDescriptionView.setMargin(MarginCss.bottom(3));
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