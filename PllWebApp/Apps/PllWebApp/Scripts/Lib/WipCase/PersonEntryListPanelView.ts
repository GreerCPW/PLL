import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { PanelView } from "../PanelView";
import { TextHeading1View } from "@jasonbenfield/sharedwebapp/Views/TextHeadings";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { PllTheme } from "../PllTheme";
import { GridListGroupView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { PersonEntryListItemView } from "./PersonEntryListItemView";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";

export class PersonEntryListPanelView extends PanelView {
    readonly personEntryListView: GridListGroupView<PersonEntryListItemView>;
    readonly backButton: ButtonCommandView;
    readonly cancelCaseButton: ButtonCommandView;
    readonly nextButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        const headingView = this.body.addView(TextHeading1View);
        headingView.setText('People Involved');
        headingView.setMargin(MarginCss.bottom(3));
        this.personEntryListView = this.body.addGridListGroup(PersonEntryListItemView);
        this.personEntryListView.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1),
            CssLengthUnit.auto()
        );
        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
        this.cancelCaseButton = PllTheme.instance.commandToolbar.cancelCaseButton(
            this.toolbar.addButtonCommandToMiddle()
        );
        this.nextButton = PllTheme.instance.commandToolbar.nextButton(
            this.toolbar.addButtonCommandToEnd()
        );
    }

    handlePersonEntryEditClicked(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.personEntryListView.on('click')
            .select('.editButton')
            .preventDefault()
            .execute(action)
            .subscribe();
    }
}