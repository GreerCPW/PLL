import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { FormGroupGridView, FormGroupTextView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { TextHeading1View } from "@jasonbenfield/sharedwebapp/Views/TextHeadings";
import { PllTheme } from "../../PllTheme";
import { PanelView } from "../../PanelView";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";

export class ConfirmPersonPanelView extends PanelView {
    readonly roleDescriptionView: BasicTextComponentView;
    readonly nameTextView: BasicTextComponentView;
    readonly cellPhoneTextView: BasicTextComponentView;
    readonly emailTextView: BasicTextComponentView;
    readonly alert: MessageAlertView;
    readonly editPersonButton: ButtonCommandView;
    readonly selectPersonButton: ButtonCommandView;
    readonly removePersonButton: ButtonCommandView;
    readonly nextButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.roleDescriptionView = this.body.addView(TextHeading1View);
        this.roleDescriptionView.setMargin(MarginCss.bottom(3));
        const formGroupContainer = this.body.addView(FormGroupGridView);
        const nameFormGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        nameFormGroup.caption.setText('Name');
        this.nameTextView = nameFormGroup.textValue;
        const cellPhoneFormGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        cellPhoneFormGroup.caption.setText('Cell Phone');
        this.cellPhoneTextView = cellPhoneFormGroup.textValue;
        const emailFormGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        emailFormGroup.caption.setText('Email');
        this.emailTextView = emailFormGroup.textValue;
        this.alert = this.body.addView(MessageAlertView);
        const buttonContainer = PllTheme.instance.buttonContainer( this.body.addView(BlockView));
        buttonContainer.setMargin(MarginCss.bottom(3));
        this.selectPersonButton = buttonContainer.addView(ButtonCommandView);
        this.selectPersonButton.useOutlineStyle(ContextualClass.primary);
        this.selectPersonButton.icon.solidStyle('arrow-pointer');
        this.selectPersonButton.setText('Select Different Person');
        this.selectPersonButton.setTextCss(new TextCss().start());

        this.editPersonButton = buttonContainer.addView(ButtonCommandView);
        this.editPersonButton.useOutlineStyle(ContextualClass.primary);
        this.editPersonButton.icon.solidStyle('pen-to-square');
        this.editPersonButton.setText('Edit This Person');
        this.editPersonButton.setTextCss(new TextCss().start());

        this.removePersonButton = buttonContainer.addView(ButtonCommandView);
        this.removePersonButton.useOutlineStyle(ContextualClass.danger);
        this.removePersonButton.icon.solidStyle('xmark');
        this.removePersonButton.setText('Remove From Role');
        this.removePersonButton.setTextCss(new TextCss().start());

        this.nextButton = PllTheme.instance.commandToolbar.nextButton(
            this.toolbar.addButtonCommandToEnd()
        );
    }
}