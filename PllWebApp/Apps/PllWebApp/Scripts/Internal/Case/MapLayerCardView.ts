import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { CardAlertView, CardView } from "@jasonbenfield/sharedwebapp/Views/Card";
import { GridListGroupView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { MapLayerItemView } from "./MapLayerItemView";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";

export class MapLayerCardView extends CardView {
    readonly alertView: CardAlertView;
    readonly layerListGroupView: GridListGroupView<MapLayerItemView>;

    constructor(container: BasicComponentView) {
        super(container);
        const titleView = this.addCardTitleHeader();
        titleView.setText('Map Layers');
        this.alertView = this.addCardAlert();
        this.layerListGroupView = this.addGridListGroup(MapLayerItemView);
        this.layerListGroupView.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1)
        );
    }
}