import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { CardAlertView, CardView } from "@jasonbenfield/sharedwebapp/Views/Card";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { GridListGroupView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { PllTheme } from "../../PllTheme";
import { PanelView } from "../../PanelView";
import { RelatedDocumentListItemView } from "./RelatedDocumentListItemView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";

export class RelatedDocumentListPanelView extends PanelView {
    readonly alertView: CardAlertView;
    readonly documentListGroupView: GridListGroupView<RelatedDocumentListItemView>;
    readonly addDocumentButton: ButtonCommandView;
    readonly backButton: ButtonCommandView;
    readonly nextButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        const cardView = this.body.addView(CardView);
        const titleView = cardView.addCardTitleHeader();
        titleView.setText('Related Documents');
        this.alertView = cardView.addCardAlert();
        this.documentListGroupView = cardView.addGridListGroup(RelatedDocumentListItemView);
        this.documentListGroupView.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.auto(), CssLengthUnit.flex(1));
        cardView.setMargin(MarginCss.bottom(3));
        const buttonContainer = PllTheme.instance.buttonContainer(this.body.addView(BlockView));
        buttonContainer.setMargin(MarginCss.bottom(3));
        this.addDocumentButton = buttonContainer.addView(ButtonCommandView);
        this.addDocumentButton.useOutlineStyle(ContextualClass.primary);
        this.addDocumentButton.icon.solidStyle('plus');
        this.addDocumentButton.setText('Add Related Document');
        this.addDocumentButton.setTextCss(new TextCss().start());

        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
        this.nextButton = PllTheme.instance.commandToolbar.nextButton(
            this.toolbar.addButtonCommandToEnd()
        );
    }
}