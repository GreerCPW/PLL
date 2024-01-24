import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { GridListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { TextBlockView } from "@jasonbenfield/sharedwebapp/Views/TextBlockView";

export class MapLayerItemView extends GridListGroupItemView {
    readonly layerTextView: BasicTextComponentView;
    readonly fieldTextView: BasicTextComponentView;
    readonly valueTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.layerTextView = this.addCell().addView(TextBlockView);
        this.fieldTextView = this.addCell().addView(TextBlockView);
        this.valueTextView = this.addCell().addView(TextBlockView);
    }
}