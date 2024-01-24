// Generated code
import { NumericValue } from '@jasonbenfield/sharedwebapp/NumericValue';
import { NumericValues } from '@jasonbenfield/sharedwebapp/NumericValues';

export class CwActivityStatusValues extends NumericValues<CwActivityStatusValue> {
	constructor(
		public readonly NotSet: CwActivityStatusValue,
		public readonly Open: CwActivityStatusValue,
		public readonly Unassigned: CwActivityStatusValue,
		public readonly Assigned: CwActivityStatusValue,
		public readonly Hold: CwActivityStatusValue,
		public readonly Cancel: CwActivityStatusValue,
		public readonly Closed: CwActivityStatusValue,
		public readonly Unknown: CwActivityStatusValue
	) {
		super([NotSet,Open,Unassigned,Assigned,Hold,Cancel,Closed,Unknown]);
	}
}

export class CwActivityStatusValue extends NumericValue implements ICwActivityStatusValue {
	public static readonly values = new CwActivityStatusValues(
		new CwActivityStatusValue(0, 'Not Set'),
		new CwActivityStatusValue(10, 'Open'),
		new CwActivityStatusValue(20, 'Unassigned'),
		new CwActivityStatusValue(30, 'Assigned'),
		new CwActivityStatusValue(40, 'Hold'),
		new CwActivityStatusValue(50, 'Cancel'),
		new CwActivityStatusValue(60, 'Closed'),
		new CwActivityStatusValue(999, 'Unknown')
	);
	
	private constructor(Value: number, DisplayText: string) {
		super(Value, DisplayText);
	}
}