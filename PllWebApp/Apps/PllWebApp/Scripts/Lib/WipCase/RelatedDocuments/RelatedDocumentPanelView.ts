import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { PanelView } from "../../PanelView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { FormGroupGridView, FormGroupTextView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { PllTheme } from "../../PllTheme";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { ModalConfirmView } from "@jasonbenfield/sharedwebapp/Views/Modal";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";

export class RelatedDocumentPanelView extends PanelView {
    readonly labelTextView: BasicTextComponentView;
    readonly fileNameTextView: BasicTextComponentView;
    readonly alertView: MessageAlertView;
    readonly downloadButton: ButtonCommandView;
    readonly editButton: ButtonCommandView;
    readonly deleteButton: ButtonCommandView;
    readonly modalConfirmView: ModalConfirmView;
    readonly backButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        const formGroupContainer = this.body.addView(FormGroupGridView);
        const labelFormGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        labelFormGroup.caption.setText('Label');
        this.labelTextView = labelFormGroup.textValue;
        const fileFormGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        fileFormGroup.caption.setText('Document');
        this.fileNameTextView = fileFormGroup.textValue;
        const buttonContainer = PllTheme.instance.buttonContainer(this.body.addView(BlockView));
        buttonContainer.setMargin(MarginCss.bottom(3));
        this.downloadButton = buttonContainer.addView(ButtonCommandView);
        this.downloadButton.icon.solidStyle('file-arrow-down');
        this.downloadButton.setText('Download Document');
        this.downloadButton.useOutlineStyle(ContextualClass.primary);
        this.downloadButton.setTextCss(new TextCss().start());
        this.editButton = buttonContainer.addView(ButtonCommandView);
        this.editButton.icon.solidStyle('pen-to-square');
        this.editButton.setText('Change Label');
        this.editButton.useOutlineStyle(ContextualClass.primary);
        this.editButton.setTextCss(new TextCss().start());
        this.deleteButton = buttonContainer.addView(ButtonCommandView);
        this.deleteButton.icon.solidStyle('times');
        this.deleteButton.setText('Delete Document');
        this.deleteButton.useOutlineStyle(ContextualClass.danger);
        this.deleteButton.setTextCss(new TextCss().start());
        this.modalConfirmView = this.body.addView(ModalConfirmView);
        this.alertView = this.body.addView(MessageAlertView);
        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
    }
}