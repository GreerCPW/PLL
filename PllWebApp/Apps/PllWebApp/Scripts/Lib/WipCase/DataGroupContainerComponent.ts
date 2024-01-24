import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { DataGroupComponent } from "./DataGroupComponent";
import { DataGroupContainerView } from "./DataGroupContainerView";
import { DataGroupEntry } from "./DataGroupEntry";
import { EventSource } from "@jasonbenfield/sharedwebapp/Events";

type Events = { editRequested: DataGroupEntry };

export class DataGroupContainerComponent extends BasicComponent {
    private readonly eventSource = new EventSource<Events>(this, { editRequested: null as DataGroupEntry });
    readonly when = this.eventSource.when;

    constructor(protected readonly view: DataGroupContainerView) {
        super(view);
        view.handleEditButtonClicked(this.onDataGroupEditClicked.bind(this));
    }

    private onDataGroupEditClicked(el: HTMLElement) {
        const dataGroupComponent = this.getComponentByElement(el) as DataGroupComponent;
        this.eventSource.events.editRequested.invoke(dataGroupComponent.dataGroupEntry);
    }

    setDataGroupEntries(dataGroupEntries: DataGroupEntry[]) {
        this.clearComponents();
        for (const dataGroupEntry of dataGroupEntries) {
            const dataGroupView = this.view.addDataGroup();
            const dataGroupComponent = new DataGroupComponent(dataGroupEntry, dataGroupView);
            this.addComponent(dataGroupComponent);
        }
    }
}