import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { BooleanInputControl } from "@jasonbenfield/sharedwebapp/Components/BooleanInputControl";
import { FormCheck } from "@jasonbenfield/sharedwebapp/Components/FormCheck";
import { InputControl } from "@jasonbenfield/sharedwebapp/Components/InputControl";
import { SelectControl } from "@jasonbenfield/sharedwebapp/Components/SelectControl";
import { SelectOption } from "@jasonbenfield/sharedwebapp/Components/SelectOption";
import { TextAreaControl } from "@jasonbenfield/sharedwebapp/Components/TextAreaControl";
import { TextToDateViewValue } from "@jasonbenfield/sharedwebapp/Forms/TextToDateViewValue";
import { TextToNumberViewValue } from "@jasonbenfield/sharedwebapp/Forms/TextToNumberViewValue";
import { TextToTextViewValue } from "@jasonbenfield/sharedwebapp/Forms/TextToTextViewValue";
import { FormCheckView } from "@jasonbenfield/sharedwebapp/Views/FormCheckView";
import { InputView } from "@jasonbenfield/sharedwebapp/Views/InputView";
import { SelectView } from "@jasonbenfield/sharedwebapp/Views/SelectView";
import { TextAreaView } from "@jasonbenfield/sharedwebapp/Views/TextAreaView";
import { CaseDataAnswerFormat } from "../Api/CaseDataAnswerFormat";
import { DataGroupDetailEntry } from "./DataGroupDetailEntry";
import { DataGroupDetailEntryView } from "./DataGroupDetailEntryView";

export class DataGroupDetailEntryComponent extends BasicComponent {
    private readonly control: InputControl<string | number | Date> | SelectControl<string | boolean> | TextAreaControl | BooleanInputControl;

    constructor(readonly dataGroupDetailEntry: DataGroupDetailEntry, protected readonly view: DataGroupDetailEntryView) {
        super(view);
        view.caption.setText(dataGroupDetailEntry.caption);
        if (dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Number)) {
            const inputView = view.valueCell.addView(InputView);
            inputView.styleAsFormControl();
            this.control = new InputControl(inputView, new TextToNumberViewValue());
            this.control.setValue(dataGroupDetailEntry.value as number);
        }
        else if (dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Decimal)) {
            const inputView = view.valueCell.addView(InputView);
            inputView.styleAsFormControl();
            this.control = new InputControl(inputView, new TextToNumberViewValue());
            this.control.setValue(dataGroupDetailEntry.value as number);
        }
        else if (dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Currency)) {
            const inputView = view.valueCell.addView(InputView);
            inputView.styleAsFormControl();
            this.control = new InputControl(inputView, new TextToNumberViewValue());
            this.control.setValue(dataGroupDetailEntry.value as number);
        }
        else if (dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Text)) {
            const inputView = view.valueCell.addView(InputView);
            inputView.styleAsFormControl();
            inputView.setMaxLength(40);
            this.control = new InputControl(inputView, new TextToTextViewValue());
            this.control.setValue(dataGroupDetailEntry.value as string);
        }
        else if (dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Comment)) {
            const textAreaView = view.valueCell.addView(TextAreaView);
            textAreaView.styleAsFormControl();
            textAreaView.setRows(3);
            textAreaView.setMaxLength(2000);
            this.control = new TextAreaControl(textAreaView);
            this.control.setValue(dataGroupDetailEntry.value as string);
        }
        else if (dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Date)) {
            const inputView = view.valueCell.addView(InputView);
            inputView.styleAsFormControl();
            inputView.setType('date');
            this.control = new InputControl(inputView, new TextToDateViewValue());
            this.control.setValue(dataGroupDetailEntry.value as Date);
        }
        else if (dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.YesNo)) {
            const checkView = view.valueCell.addView(FormCheckView);
            checkView.styleAsSwitch();
            const check = new FormCheck(checkView);
            this.control = check.booleanInput;
            this.control.setValue(dataGroupDetailEntry.value as boolean);
        }
        else if (dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.CheckBox)) {
            const selectView = view.valueCell.addView(SelectView);
            selectView.styleAsFormControl();
            this.control = new SelectControl(selectView);
            this.control.setItemCaption('Select...');
            this.control.setItems(
                new SelectOption(true, 'Yes'),
                new SelectOption(false, 'No')
            );
            const value = dataGroupDetailEntry.value as boolean;
            this.control.setValue(value);
        }
        else if (dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.ListOfValues)) {
            const selectView = view.valueCell.addView(SelectView);
            selectView.styleAsFormControl();
            this.control = new SelectControl(selectView);
            this.control.setItemCaption('Select...');
            const items = dataGroupDetailEntry.listOfValues.map(v => new SelectOption(v, v));
            this.control.setItems(...items);
            this.control.setValue(dataGroupDetailEntry.value as string);
        }
    }

    save() {
        if (this.control) {
            this.dataGroupDetailEntry.value = this.control.getValue();
        }
    }

    canFocus() {
        return this.dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Number) ||
            this.dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Text) ||
            this.dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Decimal) ||
            this.dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Currency) ||
            this.dataGroupDetailEntry.answerFormat.equals(CaseDataAnswerFormat.values.Comment);
    }

    setFocus() {
        const inputControl = this.control as InputControl<any> | TextAreaControl;
        inputControl.setFocus();
    }
}