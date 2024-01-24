import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { DataGroupEntry } from "./DataGroupEntry";
import { DataGroupView } from "./DataGroupView";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { DataGroupDetailComponent } from "./DataGroupDetailComponent";

export class DataGroupComponent extends BasicComponent {
    constructor(readonly dataGroupEntry: DataGroupEntry, view: DataGroupView) {
        super(view);
        const dataGroupTextComponent = new TextComponent(view.dataGroupTextView);
        this.addComponent(dataGroupTextComponent);
        dataGroupTextComponent.setText(dataGroupEntry.description);
        for (const detailEntry of dataGroupEntry.detailEntries) {
            const detailView = view.addDetail();
            const detailComponent = new DataGroupDetailComponent(detailEntry, detailView);
            this.addComponent(detailComponent);
        }
    }
}