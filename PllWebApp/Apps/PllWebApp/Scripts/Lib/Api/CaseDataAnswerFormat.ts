// Generated code
import { NumericValue } from '@jasonbenfield/sharedwebapp/NumericValue';
import { NumericValues } from '@jasonbenfield/sharedwebapp/NumericValues';

export class CaseDataAnswerFormats extends NumericValues<CaseDataAnswerFormat> {
	constructor(
		public readonly NotSet: CaseDataAnswerFormat,
		public readonly YesNo: CaseDataAnswerFormat,
		public readonly Number: CaseDataAnswerFormat,
		public readonly Date: CaseDataAnswerFormat,
		public readonly ListOfValues: CaseDataAnswerFormat,
		public readonly Text: CaseDataAnswerFormat,
		public readonly Comment: CaseDataAnswerFormat,
		public readonly Decimal: CaseDataAnswerFormat,
		public readonly CheckBox: CaseDataAnswerFormat,
		public readonly Currency: CaseDataAnswerFormat
	) {
		super([NotSet,YesNo,Number,Date,ListOfValues,Text,Comment,Decimal,CheckBox,Currency]);
	}
}

export class CaseDataAnswerFormat extends NumericValue implements ICaseDataAnswerFormat {
	public static readonly values = new CaseDataAnswerFormats(
		new CaseDataAnswerFormat(0, 'Not Set'),
		new CaseDataAnswerFormat(10, 'Yes No'),
		new CaseDataAnswerFormat(20, 'Number'),
		new CaseDataAnswerFormat(30, 'Date'),
		new CaseDataAnswerFormat(40, 'List Of Values'),
		new CaseDataAnswerFormat(50, 'Text'),
		new CaseDataAnswerFormat(60, 'Comment'),
		new CaseDataAnswerFormat(70, 'Decimal'),
		new CaseDataAnswerFormat(80, 'Check Box'),
		new CaseDataAnswerFormat(90, 'Currency')
	);
	
	private constructor(Value: number, DisplayText: string) {
		super(Value, DisplayText);
	}
}