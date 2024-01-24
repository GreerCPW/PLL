// Generated code
import { NumericValue } from '@jasonbenfield/sharedwebapp/NumericValue';
import { NumericValues } from '@jasonbenfield/sharedwebapp/NumericValues';

export class WorkOrderCategoryValues extends NumericValues<WorkOrderCategoryValue> {
	constructor(
		public readonly NotSet: WorkOrderCategoryValue,
		public readonly CS: WorkOrderCategoryValue,
		public readonly Water: WorkOrderCategoryValue,
		public readonly Electric: WorkOrderCategoryValue,
		public readonly Gas: WorkOrderCategoryValue,
		public readonly Sewer: WorkOrderCategoryValue,
		public readonly Facilities: WorkOrderCategoryValue,
		public readonly Lakes: WorkOrderCategoryValue,
		public readonly Unknown: WorkOrderCategoryValue
	) {
		super([NotSet,CS,Water,Electric,Gas,Sewer,Facilities,Lakes,Unknown]);
	}
}

export class WorkOrderCategoryValue extends NumericValue implements IWorkOrderCategoryValue {
	public static readonly values = new WorkOrderCategoryValues(
		new WorkOrderCategoryValue(0, 'Not Set'),
		new WorkOrderCategoryValue(10, 'CS'),
		new WorkOrderCategoryValue(20, 'Water'),
		new WorkOrderCategoryValue(30, 'Electric'),
		new WorkOrderCategoryValue(40, 'Gas'),
		new WorkOrderCategoryValue(50, 'Sewer'),
		new WorkOrderCategoryValue(60, 'Facilities'),
		new WorkOrderCategoryValue(70, 'Lakes'),
		new WorkOrderCategoryValue(999, 'Unknown')
	);
	
	private constructor(Value: number, DisplayText: string) {
		super(Value, DisplayText);
	}
}