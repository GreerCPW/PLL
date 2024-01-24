import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { MapLayerItemView } from "./MapLayerItemView";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";

export class MapLayerItem extends BasicComponent {
    constructor(mapLayer: ICwMapLayerModel, view: MapLayerItemView) {
        super(view);
        const layerTextComponent = new TextComponent(view.layerTextView);
        layerTextComponent.setText(mapLayer.LayerName);
        const fieldTextComponent = new TextComponent(view.fieldTextView);
        fieldTextComponent.setText(mapLayer.LayerField);
        const valueTextComponent = new TextComponent(view.valueTextView);
        valueTextComponent.setText(mapLayer.Value);
    }
}