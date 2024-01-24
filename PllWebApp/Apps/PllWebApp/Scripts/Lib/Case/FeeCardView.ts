import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { CardAlertView, CardView } from "@jasonbenfield/sharedwebapp/Views/Card";
import { GridListGroupView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { CaseFeeListItemView } from "./CaseFeeListItemView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { PllTheme } from "../PllTheme";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";
import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { ModalMessageAlertView } from "@jasonbenfield/sharedwebapp/Views/Modal";

export class FeeCardView extends CardView {
    readonly feeAlertView: CardAlertView;
    readonly feeListGroupView: GridListGroupView<CaseFeeListItemView>;
    private feeButtonContainerView: BlockView;
    readonly payFeesButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        const feeTitleView = this.addCardTitleHeader();
        feeTitleView.setText('Fees');
        this.feeAlertView = this.addCardAlert();
        this.feeListGroupView = this.addGridListGroup(CaseFeeListItemView);
        this.feeListGroupView.setTemplateColumns(CssLengthUnit.flex(1), CssLengthUnit.auto(), CssLengthUnit.auto(), CssLengthUnit.auto());
        this.feeButtonContainerView = this.addCardBody();
        const buttonContainer = PllTheme.instance.buttonContainer(this.feeButtonContainerView.addView(BlockView));
        this.payFeesButton = buttonContainer.addView(ButtonCommandView);
        this.payFeesButton.setText('Pay Fees');
        this.payFeesButton.setTextCss(new TextCss().start());
        this.payFeesButton.icon.solidStyle('credit-card');
        this.payFeesButton.useOutlineStyle(ContextualClass.primary);
    }

    showFeeButtons() {
        this.feeButtonContainerView.show();
    }

    hideFeeButtons() {
        this.feeButtonContainerView.hide();
    }
}