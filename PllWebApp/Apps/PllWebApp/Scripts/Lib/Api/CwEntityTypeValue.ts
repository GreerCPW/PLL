// Generated code
import { NumericValue } from '@jasonbenfield/sharedwebapp/NumericValue';
import { NumericValues } from '@jasonbenfield/sharedwebapp/NumericValues';

export class CwEntityTypeValues extends NumericValues<CwEntityTypeValue> {
	constructor(
		public readonly NotSet: CwEntityTypeValue,
		public readonly WaterMeter: CwEntityTypeValue,
		public readonly ElectricMeter: CwEntityTypeValue,
		public readonly GasMeter: CwEntityTypeValue,
		public readonly Light: CwEntityTypeValue,
		public readonly BackflowDevice: CwEntityTypeValue
	) {
		super([NotSet,WaterMeter,ElectricMeter,GasMeter,Light,BackflowDevice]);
	}
}

export class CwEntityTypeValue extends NumericValue implements ICwEntityTypeValue {
	public static readonly values = new CwEntityTypeValues(
		new CwEntityTypeValue(0, 'Not Set'),
		new CwEntityTypeValue(10, 'Water Meter'),
		new CwEntityTypeValue(20, 'Electric Meter'),
		new CwEntityTypeValue(30, 'Gas Meter'),
		new CwEntityTypeValue(40, 'Light'),
		new CwEntityTypeValue(50, 'Backflow Device')
	);
	
	private constructor(Value: number, DisplayText: string) {
		super(Value, DisplayText);
	}
}