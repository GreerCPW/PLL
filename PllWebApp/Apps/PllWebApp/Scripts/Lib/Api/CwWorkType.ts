// Generated code
import { NumericValue } from '@jasonbenfield/sharedwebapp/NumericValue';
import { NumericValues } from '@jasonbenfield/sharedwebapp/NumericValues';

export class CwWorkTypes extends NumericValues<CwWorkType> {
	constructor(
		public readonly NotSet: CwWorkType,
		public readonly TurnOnService: CwWorkType,
		public readonly TurnOffService: CwWorkType,
		public readonly ReconnectService: CwWorkType,
		public readonly CutMeterForNonPay: CwWorkType,
		public readonly CheckForStillCut: CwWorkType,
		public readonly ReplaceMeter: CwWorkType,
		public readonly ReplaceErt: CwWorkType,
		public readonly RemoveMeter: CwWorkType,
		public readonly InstallMeterAndTurnOn: CwWorkType,
		public readonly ReadMeter: CwWorkType,
		public readonly FixMeterNumber: CwWorkType,
		public readonly TurnOnLight: CwWorkType,
		public readonly TurnOffLight: CwWorkType,
		public readonly ReplaceLight: CwWorkType,
		public readonly RemoveLight: CwWorkType,
		public readonly InstallLight: CwWorkType,
		public readonly TransferLightToNewAccount: CwWorkType,
		public readonly Restock: CwWorkType
	) {
		super([NotSet,TurnOnService,TurnOffService,ReconnectService,CutMeterForNonPay,CheckForStillCut,ReplaceMeter,ReplaceErt,RemoveMeter,InstallMeterAndTurnOn,ReadMeter,FixMeterNumber,TurnOnLight,TurnOffLight,ReplaceLight,RemoveLight,InstallLight,TransferLightToNewAccount,Restock]);
	}
}

export class CwWorkType extends NumericValue implements ICwWorkType {
	public static readonly values = new CwWorkTypes(
		new CwWorkType(0, 'Not Set'),
		new CwWorkType(5, 'Turn On Service'),
		new CwWorkType(10, 'Turn Off Service'),
		new CwWorkType(15, 'Reconnect Service'),
		new CwWorkType(20, 'Cut Meter For Non Pay'),
		new CwWorkType(25, 'Check For Still Cut'),
		new CwWorkType(30, 'Replace Meter'),
		new CwWorkType(35, 'Replace Ert'),
		new CwWorkType(40, 'Remove Meter'),
		new CwWorkType(45, 'Install Meter And Turn On'),
		new CwWorkType(50, 'Read Meter'),
		new CwWorkType(55, 'Fix Meter Number'),
		new CwWorkType(100, 'Turn On Light'),
		new CwWorkType(105, 'Turn Off Light'),
		new CwWorkType(110, 'Replace Light'),
		new CwWorkType(115, 'Remove Light'),
		new CwWorkType(120, 'Install Light'),
		new CwWorkType(130, 'Transfer Light To New Account'),
		new CwWorkType(200, 'Restock')
	);
	
	private constructor(Value: number, DisplayText: string) {
		super(Value, DisplayText);
	}
}