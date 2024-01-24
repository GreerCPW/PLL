import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { FormGroupGridView, FormGroupTextView, FormGroupView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { InputView } from "@jasonbenfield/sharedwebapp/Views/InputView";
import { PllTheme } from "../../PllTheme";
import { PanelView } from "../../PanelView";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";

export class AddRelatedDocumentPanelView extends PanelView {
    readonly labelTextView: BasicTextComponentView;
    readonly fileInputView: InputView;
    readonly alertView: MessageAlertView;
    readonly backButton: ButtonCommandView;
    readonly nextButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        const formGroupContainer = this.body.addView(FormGroupGridView);
        const labelFormGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        labelFormGroup.caption.setText('Label');
        this.labelTextView = labelFormGroup.textValue;
        const fileFormGroup = formGroupContainer.addFormGroup(FormGroupView);
        fileFormGroup.caption.setText('Document');
        this.fileInputView = fileFormGroup.valueCell.addView(InputView);
        this.fileInputView.styleAsFormControl();
        this.alertView = this.body.addView(MessageAlertView);
        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
        this.nextButton = PllTheme.instance.commandToolbar.nextButton(
            this.toolbar.addButtonCommandToEnd()
        );
    }
}