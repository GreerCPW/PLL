import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { MapLayerCardView } from "./MapLayerCardView";
import { MapLayerItem } from "./MapLayerItem";
import { MapLayerItemView } from "./MapLayerItemView";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { CardAlert } from "@jasonbenfield/sharedwebapp/Components/CardAlert";
import { PllAppApi } from "../../Lib/Api/PllAppApi";

export class MapLayerCard {
    private readonly alert: MessageAlert;
    private readonly layerListGroup: ListGroup<MapLayerItem, MapLayerItemView>;
    private caseID: number;

    constructor(private readonly customerClient: PllAppApi, view: MapLayerCardView) {
        this.alert = new CardAlert(view.alertView).alert;
        this.layerListGroup = new ListGroup(view.layerListGroupView);
    }

    setCaseID(caseID: number) {
        this.caseID = caseID;
    }

    async refresh() {
        const mapLayers = await this.alert.infoAction(
            'Loading...',
            () => this.customerClient.Case.GetMapLayers(this.caseID)
        );
        this.layerListGroup.setItems(
            mapLayers,
            (l, itemView) => new MapLayerItem(l, itemView)
        );
        if (mapLayers.length === 0) {
            this.alert.danger('No map layers have been added.');
        }
    }
}