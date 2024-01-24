import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { PanelView } from "../PanelView";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { PllTheme } from "../PllTheme";
import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { AlertView } from "@jasonbenfield/sharedwebapp/Views/AlertView";
import { TextBlockView } from "@jasonbenfield/sharedwebapp/Views/TextBlockView";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";

export class CancelCasePanelView extends PanelView {
    readonly alertView: MessageAlertView;
    readonly noButton: ButtonCommandView;
    readonly yesButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        const confirmationAlert = this.body.addView(AlertView);
        confirmationAlert.setContext(ContextualClass.danger);
        const confirmationTextView = confirmationAlert.addView(TextBlockView);
        confirmationTextView.setText('Cancel this application?');
        this.alertView = this.body.addView(MessageAlertView);
        this.noButton = PllTheme.instance.commandToolbar.cancelButton(
            this.toolbar.addButtonCommandToEnd()
        );
        this.noButton.setText('No');
        this.noButton.setContext(ContextualClass.secondary);
        this.noButton.setMargin(MarginCss.end(1));
        this.yesButton = PllTheme.instance.commandToolbar.saveButton(
            this.toolbar.addButtonCommandToEnd()
        );
        this.yesButton.setText('Yes');
        this.yesButton.setContext(ContextualClass.danger);
    }
}