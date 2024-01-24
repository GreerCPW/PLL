import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { EnterLocationPanelView } from "./EnterLocationPanelView";
import { LocationPanelView } from "./LocationPanelView";
import { SelectLocationPanelView } from "./SelectLocationPanelView";

export class SelectLocationWorkflowView extends BlockView {
    readonly enterLocationPanelView: EnterLocationPanelView;
    readonly locationPanelView: LocationPanelView;
    readonly selectLocationPanelView: SelectLocationPanelView;

    constructor(container: BasicComponentView) {
        super(container);
        this.height100();
        this.enterLocationPanelView = this.addView(EnterLocationPanelView);
        this.locationPanelView = this.addView(LocationPanelView);
        this.selectLocationPanelView = this.addView(SelectLocationPanelView);
    }
}