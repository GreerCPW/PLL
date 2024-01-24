// Generated code

import { AppApiGroup } from "@jasonbenfield/sharedwebapp/Api/AppApiGroup";
import { AppApiAction } from "@jasonbenfield/sharedwebapp/Api/AppApiAction";
import { AppApiView } from "@jasonbenfield/sharedwebapp/Api/AppApiView";
import { AppApiEvents } from "@jasonbenfield/sharedwebapp/Api/AppApiEvents";
import { AppResourceUrl } from "@jasonbenfield/sharedwebapp/Api/AppResourceUrl";

export class PaymentsGroup extends AppApiGroup {
	constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'Payments');
		this.ApplyPaymentAction = this.createAction<IApplyPaymentRequest,IEmptyActionResult>('ApplyPayment', 'Apply Payment');
		this.PaymentReceivedAction = this.createAction<IPaymentReceivedRequest,IPaymentTransactionDetailModel>('PaymentReceived', 'Payment Received');
	}
	
	readonly ApplyPaymentAction: AppApiAction<IApplyPaymentRequest,IEmptyActionResult>;
	readonly PaymentReceivedAction: AppApiAction<IPaymentReceivedRequest,IPaymentTransactionDetailModel>;
	
	ApplyPayment(model: IApplyPaymentRequest, errorOptions?: IActionErrorOptions) {
		return this.ApplyPaymentAction.execute(model, errorOptions || {});
	}
	PaymentReceived(model: IPaymentReceivedRequest, errorOptions?: IActionErrorOptions) {
		return this.PaymentReceivedAction.execute(model, errorOptions || {});
	}
}