import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { FormView } from "@jasonbenfield/sharedwebapp/Views/FormView";
import { PllTheme } from "../PllTheme";
import { PanelView } from "../PanelView";
import { DataGroupEntryView } from "./DataGroupEntryView";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";

export class EnterDataGroupPanelView extends PanelView {
    private readonly form: FormView;
    readonly dataGroupEntryView: DataGroupEntryView;
    readonly alertView: MessageAlertView;
    readonly backButton: ButtonCommandView;
    readonly cancelButton: ButtonCommandView;
    readonly nextButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.form = this.body.addView(FormView);
        this.form.addOffscreenSubmit();
        this.dataGroupEntryView = this.form.addView(DataGroupEntryView);
        this.alertView = this.body.addView(MessageAlertView);
        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
        this.cancelButton = PllTheme.instance.commandToolbar.cancelCaseButton(
            this.toolbar.addButtonCommandToMiddle()
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