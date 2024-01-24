import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { TextValueFormGroup } from "@jasonbenfield/sharedwebapp/Forms/TextValueFormGroup";
import { DataGroupView } from "./DataGroupView";

export class DataGroupComponent extends BasicComponent {
    constructor(readonly dataGroup: ICaseDataGroupDetailModel, view: DataGroupView) {
        super(view);
        const dataGroupTextComponent = new TextComponent(view.dataGroupTextView);
        this.addComponent(dataGroupTextComponent);
        dataGroupTextComponent.setText(dataGroup.DataGroup.Description);
        for (const detail of dataGroup.Details) {
            const detailView = view.addDetail();
            const detailFormGroup = new TextValueFormGroup(detailView);
            detailFormGroup.setCaption(detail.Description);
            detailFormGroup.setValue(detail.Value);
            this.addComponent(detailFormGroup);
        }
    }
}