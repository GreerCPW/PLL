import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { DataGroupComponent } from "./DataGroupComponent";
import { DataGroupContainerView } from "./DataGroupContainerView";

export class DataGroupContainerComponent extends BasicComponent {

    constructor(protected readonly view: DataGroupContainerView) {
        super(view);
    }

    setDataGroups(dataGroups: ICaseDataGroupDetailModel[]) {
        this.clearComponents();
        for (const dataGroup of dataGroups) {
            const dataGroupView = this.view.addDataGroup();
            const dataGroupComponent = new DataGroupComponent(dataGroup, dataGroupView);
            this.addComponent(dataGroupComponent);
        }
    }
}