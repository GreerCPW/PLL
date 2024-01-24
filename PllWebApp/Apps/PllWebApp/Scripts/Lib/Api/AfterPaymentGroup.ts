// Generated code

import { AppApiGroup } from "@jasonbenfield/sharedwebapp/Api/AppApiGroup";
import { AppApiAction } from "@jasonbenfield/sharedwebapp/Api/AppApiAction";
import { AppApiView } from "@jasonbenfield/sharedwebapp/Api/AppApiView";
import { AppApiEvents } from "@jasonbenfield/sharedwebapp/Api/AppApiEvents";
import { AppResourceUrl } from "@jasonbenfield/sharedwebapp/Api/AppResourceUrl";

export class AfterPaymentGroup extends AppApiGroup {
	constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'AfterPayment');
		this.GetReceiptAction = this.createAction<IGetReceiptRequest,IReceiptModel>('GetReceipt', 'Get Receipt');
		this.WaitForReceiptAction = this.createAction<IGetReceiptRequest,IReceiptModel>('WaitForReceipt', 'Wait For Receipt');
	}
	
	readonly GetReceiptAction: AppApiAction<IGetReceiptRequest,IReceiptModel>;
	readonly WaitForReceiptAction: AppApiAction<IGetReceiptRequest,IReceiptModel>;
	
	GetReceipt(model: IGetReceiptRequest, errorOptions?: IActionErrorOptions) {
		return this.GetReceiptAction.execute(model, errorOptions || {});
	}
	WaitForReceipt(model: IGetReceiptRequest, errorOptions?: IActionErrorOptions) {
		return this.WaitForReceiptAction.execute(model, errorOptions || {});
	}
}