import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { GridListGroupView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";
import { TextHeading1View } from "@jasonbenfield/sharedwebapp/Views/TextHeadings";
import { PllTheme } from "../../PllTheme";
import { PanelView } from "../../PanelView";
import { PersonListItemView } from "./PersonListItemView";
import { GridCellView } from "@jasonbenfield/sharedwebapp/Views/Grid";
import { CardView } from "@jasonbenfield/sharedwebapp/Views/Card";

export class SelectPersonPanelView extends PanelView {
    readonly roleDescriptionView: BasicTextComponentView;
    readonly addNewPersonButton: ButtonCommandView;
    readonly alert: MessageAlertView;
    readonly personListView: GridListGroupView<PersonListItemView>;
    readonly backButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto(), CssLengthUnit.auto());
        const topSection = this.insertView(0, GridCellView);
        topSection.addCssName('container');
        this.roleDescriptionView = topSection.addView(TextHeading1View);
        this.roleDescriptionView.setMargin(MarginCss.bottom(3));
        this.alert = this.body.addView(MessageAlertView);
        const cardView = this.body.addView(CardView);
        const header = cardView.addCardTitleHeader();
        header.setText('Select Person');
        this.personListView = cardView.addGridListGroup(PersonListItemView);
        this.personListView.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1)
        );
        const bottomSection = this.insertView(2, GridCellView);
        bottomSection.addCssName('container');
        const buttonContainer = bottomSection.addView(BlockView);
        buttonContainer.addCssName('d-grid');
        buttonContainer.addCssName('gap-3');
        buttonContainer.addCssName('col-6');
        buttonContainer.setMargin(MarginCss.bottom(3));
        this.addNewPersonButton = buttonContainer.addView(ButtonCommandView);
        this.addNewPersonButton.setTextCss(new TextCss().start());
        this.addNewPersonButton.useOutlineStyle(ContextualClass.primary);
        this.addNewPersonButton.icon.solidStyle('plus');
        this.addNewPersonButton.setText('Add New Person');
        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
    }
}