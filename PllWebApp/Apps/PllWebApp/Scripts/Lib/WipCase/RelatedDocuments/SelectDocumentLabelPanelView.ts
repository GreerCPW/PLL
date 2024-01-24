import { ButtonListGroupView, TextButtonListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { PanelView } from "../../PanelView";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { TextHeading1View } from "@jasonbenfield/sharedwebapp/Views/TextHeadings";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { PllTheme } from "../../PllTheme";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";

export class SelectDocumentLabelPanelView extends PanelView {
    readonly labelListGroupView: ButtonListGroupView<TextButtonListGroupItemView>;
    readonly alertView: MessageAlertView;
    readonly backButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        const titleView = this.body.addView(TextHeading1View);
        titleView.setText('Document Label');
        titleView.setMargin(MarginCss.bottom(3));
        this.labelListGroupView = this.body.addButtonListGroup(TextButtonListGroupItemView);
        this.alertView = this.body.addView(MessageAlertView);
        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
    }
}