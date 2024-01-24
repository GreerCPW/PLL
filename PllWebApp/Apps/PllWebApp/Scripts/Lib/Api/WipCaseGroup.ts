// Generated code

import { AppApiGroup } from "@jasonbenfield/sharedwebapp/Api/AppApiGroup";
import { AppApiAction } from "@jasonbenfield/sharedwebapp/Api/AppApiAction";
import { AppApiView } from "@jasonbenfield/sharedwebapp/Api/AppApiView";
import { AppApiEvents } from "@jasonbenfield/sharedwebapp/Api/AppApiEvents";
import { AppResourceUrl } from "@jasonbenfield/sharedwebapp/Api/AppResourceUrl";

export class WipCaseGroup extends AppApiGroup {
	constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'WipCase');
		this.AddRelatedDocumentAction = this.createAction<IAddRelatedDocumentRequest,IWipCaseRelatedDocumentModel>('AddRelatedDocument', 'Add Related Document');
		this.DeleteCaseAction = this.createAction<number,IEmptyActionResult>('DeleteCase', 'Delete Case');
		this.CompleteCaseAction = this.createAction<number,number>('CompleteCase', 'Complete Case');
		this.DeleteRelatedDocumentAction = this.createAction<number,IEmptyActionResult>('DeleteRelatedDocument', 'Delete Related Document');
		this.DownloadRelatedDocument = this.createView<number>('DownloadRelatedDocument');
		this.EditPersonAction = this.createAction<IEditPersonRequest,ICustomerPersonModel>('EditPerson', 'Edit Person');
		this.EditRelatedDocumentAction = this.createAction<IEditWipCaseRelatedDocumentRequest,IEmptyActionResult>('EditRelatedDocument', 'Edit Related Document');
		this.GeocodeAddressAction = this.createAction<string,IAddressCandidateModel[]>('GeocodeAddress', 'Geocode Address');
		this.GetCaseDetailAction = this.createAction<number,IWipCaseDetailModel>('GetCaseDetail', 'Get Case Detail');
		this.GetPeopleAction = this.createAction<IEmptyRequest,ICustomerPersonModel[]>('GetPeople', 'Get People');
		this.Index = this.createView<IGetWipCaseRequest>('Index');
		this.ResetCasePersonAction = this.createAction<number,ICustomerPersonModel>('ResetCasePerson', 'Reset Case Person');
		this.ReverseGeocodeAction = this.createAction<ILatLongCoordinates,string>('ReverseGeocode', 'Reverse Geocode');
		this.SaveCasePersonAction = this.createAction<ISaveWipCasePersonRequest,ICustomerPersonModel>('SaveCasePerson', 'Save Case Person');
		this.SaveDataGroupAction = this.createAction<ISaveDataGroupRequest,IEmptyActionResult>('SaveDataGroup', 'Save Data Group');
		this.SaveLocationAction = this.createAction<ISaveLocationRequest,IEmptyActionResult>('SaveLocation', 'Save Location');
		this.SaveMapLocationAction = this.createAction<ISaveMapLocationRequest,IWipCaseModel>('SaveMapLocation', 'Save Map Location');
		this.SaveNewPersonAction = this.createAction<ISaveNewPersonRequest,ICustomerPersonModel>('SaveNewPerson', 'Save New Person');
		this.SaveServiceTypesAction = this.createAction<ISaveServiceTypesRequest,IEmptyActionResult>('SaveServiceTypes', 'Save Service Types');
	}
	
	readonly AddRelatedDocumentAction: AppApiAction<IAddRelatedDocumentRequest,IWipCaseRelatedDocumentModel>;
	readonly DeleteCaseAction: AppApiAction<number,IEmptyActionResult>;
	readonly CompleteCaseAction: AppApiAction<number,number>;
	readonly DeleteRelatedDocumentAction: AppApiAction<number,IEmptyActionResult>;
	readonly DownloadRelatedDocument: AppApiView<number>;
	readonly EditPersonAction: AppApiAction<IEditPersonRequest,ICustomerPersonModel>;
	readonly EditRelatedDocumentAction: AppApiAction<IEditWipCaseRelatedDocumentRequest,IEmptyActionResult>;
	readonly GeocodeAddressAction: AppApiAction<string,IAddressCandidateModel[]>;
	readonly GetCaseDetailAction: AppApiAction<number,IWipCaseDetailModel>;
	readonly GetPeopleAction: AppApiAction<IEmptyRequest,ICustomerPersonModel[]>;
	readonly Index: AppApiView<IGetWipCaseRequest>;
	readonly ResetCasePersonAction: AppApiAction<number,ICustomerPersonModel>;
	readonly ReverseGeocodeAction: AppApiAction<ILatLongCoordinates,string>;
	readonly SaveCasePersonAction: AppApiAction<ISaveWipCasePersonRequest,ICustomerPersonModel>;
	readonly SaveDataGroupAction: AppApiAction<ISaveDataGroupRequest,IEmptyActionResult>;
	readonly SaveLocationAction: AppApiAction<ISaveLocationRequest,IEmptyActionResult>;
	readonly SaveMapLocationAction: AppApiAction<ISaveMapLocationRequest,IWipCaseModel>;
	readonly SaveNewPersonAction: AppApiAction<ISaveNewPersonRequest,ICustomerPersonModel>;
	readonly SaveServiceTypesAction: AppApiAction<ISaveServiceTypesRequest,IEmptyActionResult>;
	
	AddRelatedDocument(model: IAddRelatedDocumentRequest, errorOptions?: IActionErrorOptions) {
		return this.AddRelatedDocumentAction.execute(model, errorOptions || {});
	}
	DeleteCase(model: number, errorOptions?: IActionErrorOptions) {
		return this.DeleteCaseAction.execute(model, errorOptions || {});
	}
	CompleteCase(model: number, errorOptions?: IActionErrorOptions) {
		return this.CompleteCaseAction.execute(model, errorOptions || {});
	}
	DeleteRelatedDocument(model: number, errorOptions?: IActionErrorOptions) {
		return this.DeleteRelatedDocumentAction.execute(model, errorOptions || {});
	}
	EditPerson(model: IEditPersonRequest, errorOptions?: IActionErrorOptions) {
		return this.EditPersonAction.execute(model, errorOptions || {});
	}
	EditRelatedDocument(model: IEditWipCaseRelatedDocumentRequest, errorOptions?: IActionErrorOptions) {
		return this.EditRelatedDocumentAction.execute(model, errorOptions || {});
	}
	GeocodeAddress(model: string, errorOptions?: IActionErrorOptions) {
		return this.GeocodeAddressAction.execute(model, errorOptions || {});
	}
	GetCaseDetail(model: number, errorOptions?: IActionErrorOptions) {
		return this.GetCaseDetailAction.execute(model, errorOptions || {});
	}
	GetPeople(errorOptions?: IActionErrorOptions) {
		return this.GetPeopleAction.execute({}, errorOptions || {});
	}
	ResetCasePerson(model: number, errorOptions?: IActionErrorOptions) {
		return this.ResetCasePersonAction.execute(model, errorOptions || {});
	}
	ReverseGeocode(model: ILatLongCoordinates, errorOptions?: IActionErrorOptions) {
		return this.ReverseGeocodeAction.execute(model, errorOptions || {});
	}
	SaveCasePerson(model: ISaveWipCasePersonRequest, errorOptions?: IActionErrorOptions) {
		return this.SaveCasePersonAction.execute(model, errorOptions || {});
	}
	SaveDataGroup(model: ISaveDataGroupRequest, errorOptions?: IActionErrorOptions) {
		return this.SaveDataGroupAction.execute(model, errorOptions || {});
	}
	SaveLocation(model: ISaveLocationRequest, errorOptions?: IActionErrorOptions) {
		return this.SaveLocationAction.execute(model, errorOptions || {});
	}
	SaveMapLocation(model: ISaveMapLocationRequest, errorOptions?: IActionErrorOptions) {
		return this.SaveMapLocationAction.execute(model, errorOptions || {});
	}
	SaveNewPerson(model: ISaveNewPersonRequest, errorOptions?: IActionErrorOptions) {
		return this.SaveNewPersonAction.execute(model, errorOptions || {});
	}
	SaveServiceTypes(model: ISaveServiceTypesRequest, errorOptions?: IActionErrorOptions) {
		return this.SaveServiceTypesAction.execute(model, errorOptions || {});
	}
}