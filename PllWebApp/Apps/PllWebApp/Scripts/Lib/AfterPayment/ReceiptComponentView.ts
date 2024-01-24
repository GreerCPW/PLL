import { CssLengthUnit } from '@jasonbenfield/sharedwebapp/CssLengthUnit';
import { MarginCss } from '@jasonbenfield/sharedwebapp/MarginCss';
import { BasicComponentView } from '@jasonbenfield/sharedwebapp/Views/BasicComponentView';
import { BasicTextComponentView } from '@jasonbenfield/sharedwebapp/Views/BasicTextComponentView';
import { BlockView } from '@jasonbenfield/sharedwebapp/Views/BlockView';
import { CardView } from '@jasonbenfield/sharedwebapp/Views/Card';
import { GridListGroupView } from '@jasonbenfield/sharedwebapp/Views/ListGroup';
import { MessageAlertView } from '@jasonbenfield/sharedwebapp/Views/MessageAlertView';
import { TextHeading1View } from '@jasonbenfield/sharedwebapp/Views/TextHeadings';
import { TextLinkView } from '@jasonbenfield/sharedwebapp/Views/TextLinkView';
import { CaseFeeListItemView } from '../Case/CaseFeeListItemView';

export class ReceiptComponentView extends BlockView {
    readonly alertView: MessageAlertView;
    readonly caseNumberTextView: BasicTextComponentView;
    private readonly feeCardView: CardView;
    readonly feeListGroupView: GridListGroupView<CaseFeeListItemView>;
    readonly caseLinkView: TextLinkView;

    constructor(container: BasicComponentView) {
        super(container);
        this.caseNumberTextView = this.addView(TextHeading1View);
        this.caseNumberTextView.setMargin(MarginCss.bottom(3));
        this.alertView = this.addView(MessageAlertView);
        this.feeCardView = this.addView(CardView);
        this.feeCardView.setMargin(MarginCss.bottom(3));
        const feeTitleView = this.feeCardView.addCardTitleHeader();
        feeTitleView.setText('Fees');
        this.feeListGroupView = this.feeCardView.addGridListGroup(CaseFeeListItemView);
        this.feeListGroupView.setTemplateColumns(CssLengthUnit.flex(1), CssLengthUnit.auto(), CssLengthUnit.auto(), CssLengthUnit.auto());
        this.feeCardView.hide();
    }

    showFees() {
        this.feeCardView.show();
    }
}