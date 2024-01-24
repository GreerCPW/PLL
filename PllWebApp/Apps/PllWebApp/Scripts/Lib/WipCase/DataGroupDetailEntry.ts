import { FormattedDate } from "@jasonbenfield/sharedwebapp/FormattedDate";
import { CaseDataAnswerFormat } from "../Api/CaseDataAnswerFormat";

type ValueType = string | boolean | Date | number;

export class DataGroupDetailEntry {
    private _value: ValueType;

    constructor(private readonly detail: ICustomerCaseDataGroupDetailModel) {
        const answerFormat = CaseDataAnswerFormat.values.value(detail.DetailDefinition.AnswerFormat.Value);
        if (detail.Value === '') {
            if (answerFormat.equalsAny(CaseDataAnswerFormat.values.Text, CaseDataAnswerFormat.values.Comment)) {
                this._value = '';
            }
            else {
                this._value = null;
            }
        }
        else {
            if (answerFormat.equalsAny(CaseDataAnswerFormat.values.CheckBox)) {
                this._value = detail.Value === 'Y';
            }
            else if (answerFormat.equalsAny(CaseDataAnswerFormat.values.Date)) {
                const detailValue: any = detail.Value;
                if (detailValue instanceof Date) {
                    this._value = detailValue;
                }
                else {
                    this._value = Date.parse(detailValue);
                }
            }
            else if (answerFormat.equalsAny(CaseDataAnswerFormat.values.Number, CaseDataAnswerFormat.values.Decimal, CaseDataAnswerFormat.values.Currency)) {
                this._value = Number(detail.Value);
            }
            else {
                this._value = detail.Value;
            }
        }
    }

    get answerFormat() { return CaseDataAnswerFormat.values.value(this.detail.DetailDefinition.AnswerFormat.Value); }

    get listOfValues() { return this.detail.DetailDefinition.Values; }

    get caption() { return this.detail.DetailDefinition.Description; }

    get value() { return this._value; }

    set value(value: ValueType) { this._value = value; }

    getSaveRequest() {
        let value: string;
        if (this._value instanceof Date) {
            value = this._value.toISOString();
        }
        else if (typeof this._value === 'string') {
            value = this._value;
        }
        else if (typeof this._value === 'boolean') {
            value = this._value ? 'Y' : 'N';
        }
        else if (this._value) {
            value = this._value.toString();
        }
        else {
            value = '';
        }
        return <ISaveWipCaseDataGroupDetailRequest>{
            DataGroupDetailID: this.detail.ID,
            Value: value
        };
    }

    formatValue() {
        let value: string;
        if (this._value instanceof Date) {
            value = new FormattedDate(this._value).formatDate();
        }
        else if (typeof this._value === 'string') {
            value = this._value;
        }
        else if (typeof this._value === 'boolean') {
            value = this._value ? 'Yes' : 'No';
        }
        else if (this._value) {
            value = this._value.toString();
        }
        else {
            value = '';
        }
        return value;
    }
}