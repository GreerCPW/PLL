import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { PanelView } from "../PanelView";
import { ButtonListGroupView, TextButtonListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { TextHeading1View } from "@jasonbenfield/sharedwebapp/Views/TextHeadings";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { PllTheme } from "../PllTheme";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";

export class SelectBusinessCasePanelView extends PanelView {
    readonly alertView: MessageAlertView;
    readonly businessCaseListGroupView: ButtonListGroupView<TextButtonListGroupItemView>;
    readonly backButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        const heading = this.body.addView(TextHeading1View);
        heading.setText('Select Application');
        heading.setMargin(MarginCss.bottom(3));
        this.alertView = this.body.addView(MessageAlertView);
        this.businessCaseListGroupView = this.body.addButtonListGroup(TextButtonListGroupItemView);
        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
    }
}