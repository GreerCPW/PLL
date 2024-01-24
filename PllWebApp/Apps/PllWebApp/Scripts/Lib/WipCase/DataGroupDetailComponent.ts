import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { FormGroupTextView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { DataGroupDetailEntry } from "./DataGroupDetailEntry";
import { TextValueFormGroup } from "@jasonbenfield/sharedwebapp/Forms/TextValueFormGroup";

export class DataGroupDetailComponent extends BasicComponent {
    constructor(detailEntry: DataGroupDetailEntry, view: FormGroupTextView) {
        super(view);
        const formGroup = new TextValueFormGroup(view);
        formGroup.setCaption(detailEntry.caption);
        formGroup.setValue(detailEntry.formatValue());
    }
}