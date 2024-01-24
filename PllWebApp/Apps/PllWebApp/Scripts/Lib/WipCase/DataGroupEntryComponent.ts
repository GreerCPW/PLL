import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { DataGroupDetailEntryComponent } from "./DataGroupDetailEntryComponent";
import { DataGroupEntry } from "./DataGroupEntry";
import { DataGroupEntryView } from "./DataGroupEntryView";

export class DataGroupEntryComponent extends BasicComponent {
    private readonly titleComponent: TextComponent;
    private readonly detailComponents: DataGroupDetailEntryComponent[] = [];

    constructor(protected readonly view: DataGroupEntryView) {
        super(view);
        this.titleComponent = new TextComponent(view.titleView);
    }

    setDataGroupEntry(dataGroupEntry: DataGroupEntry) {
        this.titleComponent.setText(dataGroupEntry.description);
        for (const detailComponent of this.detailComponents) {
            detailComponent.dispose();
        }
        const detailComponents: DataGroupDetailEntryComponent[] = [];
        for (const detailEntry of dataGroupEntry.detailEntries) {
            const detailView = this.view.addDataGroupDetailEntryView();
            const detailEntryComponent = new DataGroupDetailEntryComponent(detailEntry, detailView);
            detailComponents.push(detailEntryComponent);
        }
        this.detailComponents.splice(0, this.detailComponents.length, ...detailComponents);
    }

    setFocus() {
        const focusableComponent = this.detailComponents.find(dc => dc.canFocus());
        if (focusableComponent) {
            focusableComponent.setFocus();
        }
    }

    save() {
        for (const detailComponent of this.detailComponents) {
            detailComponent.save();
        }
    }
}