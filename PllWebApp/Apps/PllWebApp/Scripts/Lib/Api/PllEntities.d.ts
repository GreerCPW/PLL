// Generated code

interface ILinkModel {
	LinkName: string;
	DisplayText: string;
	Url: string;
}
interface IGetReceiptRequest {
	TransactionKey: string;
}
interface IReceiptModel {
	TransactionID: number;
	CityworksCaseID: number;
	Succeeded: boolean;
	CaseNumber: string;
	Fees: IReceiptFeeModel[];
}
interface IReceiptFeeModel {
	TransactionFeeID: number;
	FeeDescription: string;
	FeeAmount: number;
	AmountPaid: number;
}
interface IGetCaseRequest {
	CaseID: number;
}
interface ICaseDetailModel {
	Case: ICaseModel;
	DataGroupDetails: ICaseDataGroupDetailModel[];
	Fees: ICaseFeeModel[];
	Payments: ICasePaymentModel[];
	People: ICasePersonModel[];
	TaskDetails: ICaseTaskDetailModel[];
	RelatedDocuments: ICaseRelatedDocumentModel[];
	RelatedActivities: ICwActivityRelationship;
}
interface ICaseModel {
	ID: number;
	OfficeUrl: string;
	CaseType: ICaseTypeModel;
	SubTypeID: number;
	SubTypeDescription: string;
	TimeCreated: Date;
	TimeExpired: Date;
	CaseStatus: ICaseStatusModel;
	CaseName: string;
	CaseNumber: string;
	BusinessCaseID: number;
	BusinessCaseDescription: string;
	Location: string;
	Coordinates: ICwCoordinates;
}
interface ICaseTypeModel {
	ID: number;
	Code: string;
	Description: string;
}
interface ICaseStatusModel {
	ID: number;
	Code: ICaseStatusCode;
	Value: string;
}
interface ICwCoordinates {
	X: number;
	Y: number;
}
interface ICaseDataGroupDetailModel {
	DataGroup: ICaseDataGroupModel;
	Details: ICaseDataDetailModel[];
}
interface ICaseDataGroupModel {
	ID: number;
	DataGroupDefinitionID: number;
	Code: string;
	Description: string;
}
interface ICaseDataDetailModel {
	ID: number;
	DetailDefinitionID: number;
	Code: string;
	Description: string;
	Value: string;
}
interface ICaseFeeModel {
	ID: number;
	Code: string;
	Description: string;
	Amount: number;
	PaymentAmount: number;
}
interface ICasePaymentModel {
	ID: number;
	CaseFeeID: number;
	PaymentDate: Date;
	PaymentAmount: number;
	TenderType: string;
	Comment: string;
}
interface ICasePersonModel {
	ID: number;
	CompanyName: string;
	PersonName: string;
	CellPhone: string;
	Email: string;
	AddressLine1: string;
	AddressLine2: string;
	AddressLine3: string;
	City: string;
	State: string;
	ZipCode: string;
	Comment: string;
	Roles: ICasePersonRoleModel[];
}
interface ICasePersonRoleModel {
	ID: number;
	Role: ICaseRoleModel;
}
interface ICaseRoleModel {
	ID: number;
	Code: string;
	Description: string;
	RequiredFields: string[];
}
interface ICaseTaskDetailModel {
	Task: ICaseTaskModel;
	Results: ICaseTaskResultModel[];
	Comments: ICaseTaskCommentModel[];
}
interface ICaseTaskModel {
	ID: number;
	Code: string;
	Description: string;
	LocationNotes: string;
	TargetStartDate: Date;
	TargetEndDate: Date;
	ActualStartDate: Date;
	ActualEndDate: Date;
	TimeCompleted: Date;
	ResultID: number;
	StartPoint: number;
	EndPoint: number;
}
interface ICaseTaskResultModel {
	ID: number;
	Code: string;
	Description: string;
	DisplayText: string;
	Status: ICaseStatusModel;
}
interface ICaseTaskCommentModel {
	ID: number;
	Comment: string;
}
interface ICaseRelatedDocumentModel {
	ID: number;
	FileName: string;
	LabelText: string;
}
interface ICwActivityRelationship {
	Parent: ICwActivityIDList;
	Child: ICwActivityIDList;
	Related: ICwActivityIDList;
}
interface ICwActivityIDList {
	WorkOrders: string[];
	ServiceRequests: number[];
	Inspections: number[];
	Cases: number[];
}
interface IGetInspectionsRequest {
	InspectionIDs: number[];
}
interface IInspectionModel {
	ID: number;
	OfficeUrl: string;
	RespondUrl: string;
	TemplateName: string;
	Status: ICwActivityStatus;
	Observation: string;
	Repairs: string;
	Recommendation: string;
	AccountNumber: string;
	LocationNumber: string;
	InitiateDate: Date;
	ProjectedStartTime: Date;
	ActualFinishDate: Date;
	InspectionDate: Date;
	DateClosed: Date;
	Coordinates: ICwCoordinates;
	Entity: IActivityEntityModel;
}
interface ICwActivityStatus {
	StatusType: ICwActivityStatusValue;
	CwValue: string;
}
interface IActivityEntityModel {
	EntityID: number;
	EntityUid: string;
	EntityType: ICwEntityType;
	IsBlank: boolean;
	Location: string;
	Attributes: Record<string,object>;
}
interface ICwEntityType {
	EntityType: ICwEntityTypeValue;
	CwValue: string;
}
interface ICwMapLayerModel {
	LayerName: string;
	LayerField: string;
	Value: string;
}
interface IGetSrvReqsRequest {
	RequestIDs: number[];
}
interface IServiceRequestModel {
	ID: number;
	OfficeUrl: string;
	RespondUrl: string;
	Status: ICwActivityStatus;
	ServiceAddress: IAddress;
	ProblemCode: IProblemCode;
	Description: string;
	Details: string;
	ExternalKey: string;
	CancelReason: string;
	AccountNumber: string;
	LocationNumber: string;
	Coordinates: ICwCoordinates;
	TimeInitiated: Date;
	TimeClosed: Date;
	TimeCancelled: Date;
}
interface IAddress {
	StreetAddress: IStreetAddress;
	AdditionalLines: string[];
	City: string;
	State: string;
	ZipCode: IZipCode;
}
interface IStreetAddress {
	Number: string;
	Name: string;
}
interface IZipCode {
	Value: number;
}
interface IProblemCode {
	CodeType: IProblemCodeType;
	CwValue: string;
}
interface IGetWorkOrdersRequest {
	WorkOrderIDs: string[];
}
interface IWorkOrderModel {
	ID: string;
	OfficeUrl: string;
	RespondUrl: string;
	ApplyToEntity: ICwEntityType;
	FacilityID: string;
	Description: IWorkOrderDescription;
	Address: string;
	Location: string;
	Category: IWorkOrderCategory;
	Status: ICwActivityStatus;
	ProjectedStartTime: Date;
	GLAccountNumber: string;
	TimeInitiated: Date;
	TimeFinished: Date;
	TimeClosed: Date;
	Resolution: IWorkOrderResolution;
	AssetGroup: string;
	ExternalKey: string;
	AccountNumber: string;
	LocationNumber: string;
	TimeCancelled: Date;
	CancelReason: string;
	SourceMeterNumber: string;
	PayGoAccountNumber: string;
	PayGoCustomerName: string;
	PayGoCustomerID: string;
	Coordinates: ICwCoordinates;
}
interface IWorkOrderDescription {
	WorkType: ICwWorkType;
	CwValue: string;
}
interface IWorkOrderCategory {
	CategoryType: IWorkOrderCategoryValue;
	CwValue: string;
}
interface IStartCasePaymentRequest {
	CityworksCaseID: number;
	Fees: IStartCasePaymentFeeRequest[];
}
interface IStartCasePaymentFeeRequest {
	FeeID: number;
	Amount: number;
}
interface IPaymentTransactionModel {
	ID: number;
	TransactionKey: string;
	AmountReceived: number;
	TimeStarted: Date;
	TimeProcessed: Date;
	GatewayID: string;
}
interface IUploadMapImageRequest {
	Image: string;
}
interface IApplyPaymentRequest {
	TransactionFeeID: number;
	CityworksPaymentID: number;
	AmountPaid: number;
}
interface IPaymentReceivedRequest {
	TransactionID: number;
	AmountReceived: number;
	GatewayID: string;
}
interface IPaymentTransactionDetailModel {
	CityworksCaseID: number;
	Transaction: IPaymentTransactionModel;
	Fees: IPaymentTransactionFeeModel[];
}
interface IPaymentTransactionFeeModel {
	ID: number;
	CityworksFeeID: number;
	FeeAmount: number;
	AmountPaid: number;
	CityworksPaymentID: number;
}
interface IAddRelatedDocumentRequest {
	CaseID: number;
	CityworksLabelID: number;
	File: File;
}
interface IWipCaseRelatedDocumentModel {
	ID: number;
	FileName: string;
	Thumbnail: string;
	ContentType: string;
	DocumentLabel: ICwDocumentLabelModel;
	CityworksID: number;
}
interface ICwDocumentLabelModel {
	ID: number;
	LabelText: string;
}
interface IEditPersonRequest {
	PersonID: number;
	PersonName: string;
	CellPhone: string;
	Email: string;
}
interface ICustomerPersonModel {
	ID: number;
	PersonKey: string;
	PersonName: string;
	CellPhone: string;
	Email: string;
}
interface IEditWipCaseRelatedDocumentRequest {
	RelatedDocumentID: number;
	CityworksLabelID: number;
}
interface IAddressCandidateModel {
	Address: string;
	X: number;
	Y: number;
	Score: number;
}
interface IWipCaseDetailModel {
	Case: IWipCaseModel;
	BusinessCase: IBusinessCaseModel;
	DataGroups: ICustomerCaseDataGroupModel[];
	People: IWipCasePersonModel[];
	DocumentLabels: ICwDocumentLabelModel[];
	RelatedDocuments: IWipCaseRelatedDocumentModel[];
	ServiceTypes: string[];
}
interface IWipCaseModel {
	ID: number;
	Description: string;
	Location: string;
	X: number;
	Y: number;
	CityworksID: number;
	StatusCode: ICaseStatusCode;
	TimeCreated: Date;
	TimeCompleted: Date;
}
interface IBusinessCaseModel {
	ID: number;
	Code: string;
	Description: string;
	TermsAndConditions: string;
}
interface ICustomerCaseDataGroupModel {
	ID: number;
	DataGroupDefinition: ICaseDataGroupDefinitionModel;
	CityworksID: number;
	ServiceType: string;
	Details: ICustomerCaseDataGroupDetailModel[];
}
interface ICaseDataGroupDefinitionModel {
	ID: number;
	Code: string;
	Description: string;
	IsRegistered: boolean;
	Details: ICaseDataDetailDefinitionModel[];
}
interface ICaseDataDetailDefinitionModel {
	ID: number;
	Code: string;
	Description: string;
	IsRequiredAtIntake: boolean;
	AnswerFormat: ICaseDataAnswerFormat;
	Values: string[];
}
interface ICustomerCaseDataGroupDetailModel {
	ID: number;
	DetailDefinition: ICaseDataDetailDefinitionModel;
	CityworksID: number;
	Value: string;
}
interface IWipCasePersonModel {
	ID: number;
	Person: ICustomerPersonModel;
	Role: ICaseRoleModel;
	CityworksID: number;
}
interface IGetWipCaseRequest {
	CaseID: number;
}
interface ILatLongCoordinates {
	Latitude: number;
	Longitude: number;
}
interface ISaveWipCasePersonRequest {
	CasePersonID: number;
	PersonID: number;
}
interface ISaveDataGroupRequest {
	Details: ISaveWipCaseDataGroupDetailRequest[];
}
interface ISaveWipCaseDataGroupDetailRequest {
	DataGroupDetailID: number;
	Value: string;
}
interface ISaveLocationRequest {
	CaseID: number;
	Location: string;
	X: number;
	Y: number;
}
interface ISaveMapLocationRequest {
	CaseID: number;
	Latitude: number;
	Longitude: number;
}
interface ISaveNewPersonRequest {
	CasePersonID: number;
	PersonName: string;
	CellPhone: string;
	Email: string;
}
interface ISaveServiceTypesRequest {
	CaseID: number;
	ServiceTypes: string[];
}
interface ICaseStatusCode {
	Value: number;
	DisplayText: string;
}
interface ICwActivityStatusValue {
	Value: number;
	DisplayText: string;
}
interface ICwEntityTypeValue {
	Value: number;
	DisplayText: string;
}
interface IProblemCodeType {
	Value: number;
	DisplayText: string;
}
interface IWorkOrderResolution {
	Value: number;
	DisplayText: string;
}
interface ICwWorkType {
	Value: number;
	DisplayText: string;
}
interface IWorkOrderCategoryValue {
	Value: number;
	DisplayText: string;
}
interface ICaseDataAnswerFormat {
	Value: number;
	DisplayText: string;
}