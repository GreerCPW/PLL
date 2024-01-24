// Generated code
import { NumericValue } from '@jasonbenfield/sharedwebapp/NumericValue';
import { NumericValues } from '@jasonbenfield/sharedwebapp/NumericValues';

export class ProblemCodeTypes extends NumericValues<ProblemCodeType> {
	constructor(
		public readonly NotSet: ProblemCodeType,
		public readonly TroubleshootLight: ProblemCodeType,
		public readonly MoveIn: ProblemCodeType,
		public readonly MoveOut: ProblemCodeType,
		public readonly MoveOutMoveIn: ProblemCodeType
	) {
		super([NotSet,TroubleshootLight,MoveIn,MoveOut,MoveOutMoveIn]);
	}
}

export class ProblemCodeType extends NumericValue implements IProblemCodeType {
	public static readonly values = new ProblemCodeTypes(
		new ProblemCodeType(0, 'Not Set'),
		new ProblemCodeType(125, 'Troubleshoot Light'),
		new ProblemCodeType(5, 'Move In'),
		new ProblemCodeType(10, 'Move Out'),
		new ProblemCodeType(15, 'Move Out Move In')
	);
	
	private constructor(Value: number, DisplayText: string) {
		super(Value, DisplayText);
	}
}