import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { CaseFeeListItemView } from "./CaseFeeListItemView";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { FormattedNumber } from "@jasonbenfield/sharedwebapp/FormattedNumber";

export class CaseFeeListItem extends BasicComponent {
    constructor(caseFee: ICaseFeeModel, view: CaseFeeListItemView) {
        super(view);
        const descriptionTextComponent = new TextComponent(view.descriptionTextView);
        descriptionTextComponent.setText(caseFee.Description);
        const amountTextComponent = new TextComponent(view.amountTextView);
        amountTextComponent.setText(new FormattedNumber(caseFee.Amount, 'C').toString());
        const amountPaidTextComponent = new TextComponent(view.amountPaidTextView);
        amountPaidTextComponent.setText(new FormattedNumber(caseFee.PaymentAmount, 'C').toString());
        const amountDueTextComponent = new TextComponent(view.amountDueTextView);
        amountDueTextComponent.setText(new FormattedNumber(caseFee.Amount - caseFee.PaymentAmount, 'C').toString());
    }
}

export class CaseFeeHeaderListItem extends BasicComponent {
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

export class CaseFeeFooterListItem extends BasicComponent {
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