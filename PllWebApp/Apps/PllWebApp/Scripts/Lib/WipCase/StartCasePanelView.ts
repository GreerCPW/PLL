import { BasicContainerView } from "@jasonbenfield/sharedwebapp/Views/BasicContainerView";
import { PanelView } from "../PanelView";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";

export class StartCasePanelView extends PanelView {
    readonly alertView: MessageAlertView;

    constructor(container: BasicContainerView) {
        super(container);
        this.toolbar.hide();
        this.alertView = this.body.addView(MessageAlertView);
    }
}