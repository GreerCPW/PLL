import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { DataGroupView } from "./DataGroupView";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";

export class DataGroupContainerView extends BlockView {
    constructor(container: BasicComponentView) {
        super(container);
    }

    addDataGroup() {
        const dataGroupView = this.addView(DataGroupView);
        dataGroupView.setMargin(MarginCss.bottom(3));
        return dataGroupView;
    }

    handleEditButtonClicked(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.on('click')
            .select('.editButton')
            .preventDefault()
            .execute(action)
            .subscribe();
    }
}