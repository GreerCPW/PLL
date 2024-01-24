import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { CaseFeeListItemView } from "./CaseFeeListItemView";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { FormattedNumber } from "@jasonbenfield/sharedwebapp/FormattedNumber";

export class ReceiptFeeListItem extends BasicComponent {
    constructor(caseFee: IReceiptFeeModel, view: CaseFeeListItemView) {
        super(view);
        const descriptionTextComponent = new TextComponent(view.descriptionTextView);
        descriptionTextComponent.setText(caseFee.FeeDescription);
        const amountTextComponent = new TextComponent(view.amountTextView);
        amountTextComponent.setText(new FormattedNumber(caseFee.FeeAmount, 'C').toString());
        const amountPaidTextComponent = new TextComponent(view.amountPaidTextView);
        amountPaidTextComponent.setText(new FormattedNumber(caseFee.AmountPaid, 'C').toString());
        const amountDueTextComponent = new TextComponent(view.amountDueTextView);
        amountDueTextComponent.setText(new FormattedNumber(caseFee.FeeAmount - caseFee.AmountPaid, 'C').toString());
    }
}

export class ReceiptFeeHeaderListItem extends BasicComponent {
    constructor(view: CaseFeeListItemView) {
        super(view);
        const descriptionTextComponent = new TextComponent(view.descriptionTextView);
        descriptionTextComponent.setText('Fee');
        const amountTextComponent = new TextComponent(view.amountTextView);
        amountTextComponent.setText('Amount');
        const amountPaidTextComponent = new TextComponent(view.amountPaidTextView);
        amountPaidTextComponent.setText('Amount Paid');
        const amountDueTextComponent = new TextComponent(view.amountDueTextView);
        amountDueTextComponent.setText('Amount Due');
        view.styleAsHeader();
    }
}

export class ReceiptFeeFooterListItem extends BasicComponent {
    constructor(totalAmount: number, totalAmountPaid: number, totalAmountDue, view: CaseFeeListItemView) {
        super(view);
        const descriptionTextComponent = new TextComponent(view.descriptionTextView);
        descriptionTextComponent.setText('');
        const amountTextComponent = new TextComponent(view.amountTextView);
        amountTextComponent.setText(new FormattedNumber(totalAmount, 'C').toString());
        const amountPaidTextComponent = new TextComponent(view.amountPaidTextView);
        amountPaidTextComponent.setText(new FormattedNumber(totalAmountPaid, 'C').toString());
        const amountDueTextComponent = new TextComponent(view.amountDueTextView);
        amountDueTextComponent.setText(new FormattedNumber(totalAmountDue, 'C').toString());
        view.styleAsFooter();
    }
}