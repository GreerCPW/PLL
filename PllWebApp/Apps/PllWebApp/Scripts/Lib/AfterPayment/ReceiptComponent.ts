import { ListGroup } from '@jasonbenfield/sharedwebapp/Components/ListGroup';
import { MessageAlert } from '@jasonbenfield/sharedwebapp/Components/MessageAlert';
import { TextComponent } from '@jasonbenfield/sharedwebapp/Components/TextComponent';
import { TextLinkComponent } from '@jasonbenfield/sharedwebapp/Components/TextLinkComponent';
import { PllAppApi } from '../Api/PllAppApi';
import { CaseFeeListItemView } from '../Case/CaseFeeListItemView';
import { ReceiptFeeFooterListItem, ReceiptFeeHeaderListItem, ReceiptFeeListItem } from '../Case/ReceiptFeeListItem';
import { ReceiptComponentView } from './ReceiptComponentView';
import { AppApiView } from '@jasonbenfield/sharedwebapp/Api/AppApiView';

export class ReceiptComponent {
    private readonly alert: MessageAlert;
    private readonly caseNumberTextComponent: TextComponent;
    private readonly feeListGroup: ListGroup<ReceiptFeeListItem, CaseFeeListItemView>;
    private readonly caseLinkComponent: TextLinkComponent;

    constructor(
        private readonly pllClient: PllAppApi,
        private readonly view: ReceiptComponentView,
        private readonly caseViewAction: AppApiView<IGetCaseRequest>
    ) {
        this.alert = new MessageAlert(view.alertView);
        this.caseNumberTextComponent = new TextComponent(view.caseNumberTextView);
        this.feeListGroup = new ListGroup(view.feeListGroupView);
        this.caseLinkComponent = new TextLinkComponent(view.caseLinkView);
    }

    async getReceipt(transactionKey: string) {
        let receipt = await this.alert.infoAction(
            'Loading...',
            () => this.pllClient.AfterPayment.GetReceipt({ TransactionKey: transactionKey })
        );
        this.caseNumberTextComponent.setText(receipt.CaseNumber);
        this.caseLinkComponent.setHref(this.caseViewAction.getUrl({ CaseID: receipt.CityworksCaseID }));
        if (!receipt.Succeeded) {
            receipt = await this.alert.infoAction(
                'Checking Payment Status...',
                () => this.pllClient.AfterPayment.WaitForReceipt({ TransactionKey: transactionKey })
            );
        }
        if (receipt.Succeeded) {
            this.alert.success('Your payment has been received.');
            this.view.showFees();
            this.feeListGroup.addItem({}, (f, itemView) => new ReceiptFeeHeaderListItem(itemView));
            for (const fee of receipt.Fees) {
                this.feeListGroup.addItem(fee, (f, itemView) => new ReceiptFeeListItem(f, itemView));
            }
            const totalAmount = receipt.Fees.map(f => f.FeeAmount).reduce((prev, curr) => prev + curr);
            const totalAmountPaid = receipt.Fees.map(f => f.AmountPaid).reduce((prev, curr) => prev + curr);
            const totalAmountDue = totalAmount - totalAmountPaid;
            this.feeListGroup.addItem({}, (f, itemView) => new ReceiptFeeFooterListItem(totalAmount, totalAmountPaid, totalAmountDue, itemView));
        }
        else {
            this.alert.danger('Unable to get payment status.');
        }
    }
}