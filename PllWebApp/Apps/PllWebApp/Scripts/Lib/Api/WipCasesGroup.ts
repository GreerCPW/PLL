// Generated code

import { AppApiGroup } from "@jasonbenfield/sharedwebapp/Api/AppApiGroup";
import { AppApiAction } from "@jasonbenfield/sharedwebapp/Api/AppApiAction";
import { AppApiView } from "@jasonbenfield/sharedwebapp/Api/AppApiView";
import { AppApiEvents } from "@jasonbenfield/sharedwebapp/Api/AppApiEvents";
import { AppResourceUrl } from "@jasonbenfield/sharedwebapp/Api/AppResourceUrl";

export class WipCasesGroup extends AppApiGroup {
	constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'WipCases');
		this.AddCaseAction = this.createAction<number,number>('AddCase', 'Add Case');
		this.GetIncompleteCasesAction = this.createAction<IEmptyRequest,IWipCaseModel[]>('GetIncompleteCases', 'Get Incomplete Cases');
		this.GetSubmittedCasesAction = this.createAction<IEmptyRequest,IWipCaseModel[]>('GetSubmittedCases', 'Get Submitted Cases');
		this.GetBusinessCasesAction = this.createAction<IEmptyRequest,IBusinessCaseModel[]>('GetBusinessCases', 'Get Business Cases');
	}
	
	readonly AddCaseAction: AppApiAction<number,number>;
	readonly GetIncompleteCasesAction: AppApiAction<IEmptyRequest,IWipCaseModel[]>;
	readonly GetSubmittedCasesAction: AppApiAction<IEmptyRequest,IWipCaseModel[]>;
	readonly GetBusinessCasesAction: AppApiAction<IEmptyRequest,IBusinessCaseModel[]>;
	
	AddCase(model: number, errorOptions?: IActionErrorOptions) {
		return this.AddCaseAction.execute(model, errorOptions || {});
	}
	GetIncompleteCases(errorOptions?: IActionErrorOptions) {
		return this.GetIncompleteCasesAction.execute({}, errorOptions || {});
	}
	GetSubmittedCases(errorOptions?: IActionErrorOptions) {
		return this.GetSubmittedCasesAction.execute({}, errorOptions || {});
	}
	GetBusinessCases(errorOptions?: IActionErrorOptions) {
		return this.GetBusinessCasesAction.execute({}, errorOptions || {});
	}
}