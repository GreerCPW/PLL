// Generated code

import { AppApiGroup } from "@jasonbenfield/sharedwebapp/Api/AppApiGroup";
import { AppApiAction } from "@jasonbenfield/sharedwebapp/Api/AppApiAction";
import { AppApiView } from "@jasonbenfield/sharedwebapp/Api/AppApiView";
import { AppApiEvents } from "@jasonbenfield/sharedwebapp/Api/AppApiEvents";
import { AppResourceUrl } from "@jasonbenfield/sharedwebapp/Api/AppResourceUrl";

export class CustomerCaseGroup extends AppApiGroup {
	constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'CustomerCase');
		this.GetCaseDetailAction = this.createAction<IGetCaseRequest,ICaseDetailModel>('GetCaseDetail', 'Get Case Detail');
		this.StartCasePaymentAction = this.createAction<IStartCasePaymentRequest,IPaymentTransactionModel>('StartCasePayment', 'Start Case Payment');
		this.UploadMapImageAction = this.createAction<IUploadMapImageRequest,IEmptyActionResult>('UploadMapImage', 'Upload Map Image');
	}
	
	readonly GetCaseDetailAction: AppApiAction<IGetCaseRequest,ICaseDetailModel>;
	readonly StartCasePaymentAction: AppApiAction<IStartCasePaymentRequest,IPaymentTransactionModel>;
	readonly UploadMapImageAction: AppApiAction<IUploadMapImageRequest,IEmptyActionResult>;
	
	GetCaseDetail(model: IGetCaseRequest, errorOptions?: IActionErrorOptions) {
		return this.GetCaseDetailAction.execute(model, errorOptions || {});
	}
	StartCasePayment(model: IStartCasePaymentRequest, errorOptions?: IActionErrorOptions) {
		return this.StartCasePaymentAction.execute(model, errorOptions || {});
	}
	UploadMapImage(model: IUploadMapImageRequest, errorOptions?: IActionErrorOptions) {
		return this.UploadMapImageAction.execute(model, errorOptions || {});
	}
}