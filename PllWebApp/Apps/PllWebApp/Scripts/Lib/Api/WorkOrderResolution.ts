// Generated code
import { NumericValue } from '@jasonbenfield/sharedwebapp/NumericValue';
import { NumericValues } from '@jasonbenfield/sharedwebapp/NumericValues';

export class WorkOrderResolutions extends NumericValues<WorkOrderResolution> {
	constructor(
		public readonly NotSet: WorkOrderResolution,
		public readonly PreTripComplete: WorkOrderResolution,
		public readonly LeftNote: WorkOrderResolution,
		public readonly Unknown: WorkOrderResolution
	) {
		super([NotSet,PreTripComplete,LeftNote,Unknown]);
	}
}

export class WorkOrderResolution extends NumericValue implements IWorkOrderResolution {
	public static readonly values = new WorkOrderResolutions(
		new WorkOrderResolution(0, 'Not Set'),
		new WorkOrderResolution(10, 'Pre Trip Complete'),
		new WorkOrderResolution(20, 'Left Note'),
		new WorkOrderResolution(999, 'Unknown')
	);
	
	private constructor(Value: number, DisplayText: string) {
		super(Value, DisplayText);
	}
}