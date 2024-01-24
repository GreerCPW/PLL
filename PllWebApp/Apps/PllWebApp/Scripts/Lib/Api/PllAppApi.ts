// Generated code

import { AppApi } from "@jasonbenfield/sharedwebapp/Api/AppApi";
import { AppApiEvents } from "@jasonbenfield/sharedwebapp/Api/AppApiEvents";
import { AppApiQuery } from "@jasonbenfield/sharedwebapp/Api/AppApiQuery";
import { AfterPaymentGroup } from "./AfterPaymentGroup";
import { CaseGroup } from "./CaseGroup";
import { CustomerCaseGroup } from "./CustomerCaseGroup";
import { HomeGroup } from "./HomeGroup";
import { PaymentsGroup } from "./PaymentsGroup";
import { WipCaseGroup } from "./WipCaseGroup";
import { WipCasesGroup } from "./WipCasesGroup";


export class PllAppApi extends AppApi {
	constructor(events: AppApiEvents) {
		super(events, 'Pll');
		this.AfterPayment = this.addGroup((evts, resourceUrl) => new AfterPaymentGroup(evts, resourceUrl));
		this.Case = this.addGroup((evts, resourceUrl) => new CaseGroup(evts, resourceUrl));
		this.CustomerCase = this.addGroup((evts, resourceUrl) => new CustomerCaseGroup(evts, resourceUrl));
		this.Home = this.addGroup((evts, resourceUrl) => new HomeGroup(evts, resourceUrl));
		this.Payments = this.addGroup((evts, resourceUrl) => new PaymentsGroup(evts, resourceUrl));
		this.WipCase = this.addGroup((evts, resourceUrl) => new WipCaseGroup(evts, resourceUrl));
		this.WipCases = this.addGroup((evts, resourceUrl) => new WipCasesGroup(evts, resourceUrl));
	}
	
	readonly AfterPayment: AfterPaymentGroup;
	readonly Case: CaseGroup;
	readonly CustomerCase: CustomerCaseGroup;
	readonly Home: HomeGroup;
	readonly Payments: PaymentsGroup;
	readonly WipCase: WipCaseGroup;
	readonly WipCases: WipCasesGroup;
}