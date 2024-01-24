// Generated code

import { AppApiGroup } from "@jasonbenfield/sharedwebapp/Api/AppApiGroup";
import { AppApiAction } from "@jasonbenfield/sharedwebapp/Api/AppApiAction";
import { AppApiView } from "@jasonbenfield/sharedwebapp/Api/AppApiView";
import { AppApiEvents } from "@jasonbenfield/sharedwebapp/Api/AppApiEvents";
import { AppResourceUrl } from "@jasonbenfield/sharedwebapp/Api/AppResourceUrl";

export class CaseGroup extends AppApiGroup {
	constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'Case');
		this.GetCaseDetailAction = this.createAction<IGetCaseRequest,ICaseDetailModel>('GetCaseDetail', 'Get Case Detail');
		this.GetInspectionsAction = this.createAction<IGetInspectionsRequest,IInspectionModel[]>('GetInspections', 'Get Inspections');
		this.GetMapLayersAction = this.createAction<number,ICwMapLayerModel[]>('GetMapLayers', 'Get Map Layers');
		this.GetServiceRequestsAction = this.createAction<IGetSrvReqsRequest,IServiceRequestModel[]>('GetServiceRequests', 'Get Service Requests');
		this.GetWorkOrdersAction = this.createAction<IGetWorkOrdersRequest,IWorkOrderModel[]>('GetWorkOrders', 'Get Work Orders');
		this.Index = this.createView<IGetCaseRequest>('Index');
	}
	
	readonly GetCaseDetailAction: AppApiAction<IGetCaseRequest,ICaseDetailModel>;
	readonly GetInspectionsAction: AppApiAction<IGetInspectionsRequest,IInspectionModel[]>;
	readonly GetMapLayersAction: AppApiAction<number,ICwMapLayerModel[]>;
	readonly GetServiceRequestsAction: AppApiAction<IGetSrvReqsRequest,IServiceRequestModel[]>;
	readonly GetWorkOrdersAction: AppApiAction<IGetWorkOrdersRequest,IWorkOrderModel[]>;
	readonly Index: AppApiView<IGetCaseRequest>;
	
	GetCaseDetail(model: IGetCaseRequest, errorOptions?: IActionErrorOptions) {
		return this.GetCaseDetailAction.execute(model, errorOptions || {});
	}
	GetInspections(model: IGetInspectionsRequest, errorOptions?: IActionErrorOptions) {
		return this.GetInspectionsAction.execute(model, errorOptions || {});
	}
	GetMapLayers(model: number, errorOptions?: IActionErrorOptions) {
		return this.GetMapLayersAction.execute(model, errorOptions || {});
	}
	GetServiceRequests(model: IGetSrvReqsRequest, errorOptions?: IActionErrorOptions) {
		return this.GetServiceRequestsAction.execute(model, errorOptions || {});
	}
	GetWorkOrders(model: IGetWorkOrdersRequest, errorOptions?: IActionErrorOptions) {
		return this.GetWorkOrdersAction.execute(model, errorOptions || {});
	}
}