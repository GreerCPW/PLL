import { CardAlert } from "@jasonbenfield/sharedwebapp/Components/CardAlert";
import { Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { EventSource } from "@jasonbenfield/sharedwebapp/Events";
import { CaseFeeFooterListItem, CaseFeeHeaderListItem, CaseFeeListItem } from "./CaseFeeListItem";
import { CaseFeeListItemView } from "./CaseFeeListItemView";
import { CaseFees } from "./CaseFees";
import { FeeCardView } from "./FeeCardView";

type Events = { payFeesRequested: IStartCasePaymentRequest };

export class FeeCard {
    private readonly feeAlert: MessageAlert;
    private readonly feeListGroup: ListGroup<CaseFeeListItem, CaseFeeListItemView>;
    private readonly payFeesCommand: Command;
    private caseFees: CaseFees;
    private readonly eventSource = new EventSource<Events>(this, { payFeesRequested: null as IStartCasePaymentRequest });
    readonly when = this.eventSource.when;

    constructor(private readonly view: FeeCardView) {
        this.feeAlert = new CardAlert(view.feeAlertView).alert;
        this.feeListGroup = new ListGroup(view.feeListGroupView);
        this.payFeesCommand = new Command(this.payFees.bind(this));
        this.payFeesCommand.add(view.payFeesButton);
        this.caseFees = new CaseFees(0, []);
        view.hideFeeButtons();
    }

    private payFees() {
        this.eventSource.events.payFeesRequested.invoke({
            CityworksCaseID: this.caseFees.caseID,
            Fees: this.caseFees.fees.map(f => <IStartCasePaymentFeeRequest>{ FeeID: f.ID, Amount: f.Amount })
        });
    }

    clear() {
        this.feeAlert.clear();
        this.feeListGroup.clearItems();
        this.view.hideFeeButtons();
        this.caseFees = new CaseFees(0, []);
    }

    setCaseDetail(caseDetail: ICaseDetailModel) {
        this.caseFees = new CaseFees(caseDetail.Case.ID, caseDetail.Fees);
        const fees = this.caseFees.feesWithAmount;
        if (fees.length > 0) {
            this.feeListGroup.addItem({}, (_, itemView) => new CaseFeeHeaderListItem(itemView));
            for (const fee of fees) {
                this.feeListGroup.addItem(fee, (f, itemView) => new CaseFeeListItem(f, itemView));
            }
            const totalAmount = fees.map(f => f.Amount).reduce((prev, curr) => prev + curr);
            const totalAmountPaid = fees.map(f => f.PaymentAmount).reduce((prev, curr) => prev + curr);
            const totalAmountDue = totalAmount - totalAmountPaid;
            if (fees.length > 1) {
                this.feeListGroup.addItem(
                    {},
                    (_, itemView) => new CaseFeeFooterListItem(
                        this.caseFees.amount,
                        this.caseFees.amountPaid,
                        this.caseFees.amountDue,
                        itemView
                    )
                );
            }
            if (totalAmountDue > 0) {
                this.view.showFeeButtons();
            }
        }
        else {
            this.feeAlert.danger('No Fees have been added.');
        }
    }
}