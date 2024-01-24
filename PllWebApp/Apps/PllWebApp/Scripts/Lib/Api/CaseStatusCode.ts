// Generated code
import { NumericValue } from '@jasonbenfield/sharedwebapp/NumericValue';
import { NumericValues } from '@jasonbenfield/sharedwebapp/NumericValues';

export class CaseStatusCodes extends NumericValues<CaseStatusCode> {
	constructor(
		public readonly NotSet: CaseStatusCode,
		public readonly OPEN: CaseStatusCode,
		public readonly CLOSED: CaseStatusCode,
		public readonly CANCELLED: CaseStatusCode
	) {
		super([NotSet,OPEN,CLOSED,CANCELLED]);
	}
}

export class CaseStatusCode extends NumericValue implements ICaseStatusCode {
	public static readonly values = new CaseStatusCodes(
		new CaseStatusCode(0, 'Not Set'),
		new CaseStatusCode(10, 'OPEN'),
		new CaseStatusCode(20, 'CLOSED'),
		new CaseStatusCode(30, 'CANCELLED')
	);
	
	private constructor(Value: number, DisplayText: string) {
		super(Value, DisplayText);
	}
}