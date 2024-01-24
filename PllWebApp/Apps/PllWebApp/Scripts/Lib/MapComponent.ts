import Graphic from '@arcgis/core/Graphic.js';
import Map from "@arcgis/core/Map.js";
import PopupTemplate from '@arcgis/core/PopupTemplate.js';
import config from "@arcgis/core/config";
import Point from "@arcgis/core/geometry/Point.js";
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import MapView from "@arcgis/core/views/MapView.js";
import Search from '@arcgis/core/widgets/Search.js';
import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { PllAppApi } from "./Api/PllAppApi";
import { MapComponentView } from "./MapComponentView";

interface ViewClickEvent {
    button: number;
    buttons: number;
    mapPoint: Point;
    native: any;
    stopPropagation: Function;
    timestamp: number;
    type: string;
    x: number;
    y: number;
}

interface MapComponentOptionsMapComponentOptions {
    id: string;
    selectCaseLocation?: boolean;
    search?: boolean;
}

class CaseGraphic {
    private _address: string;

    constructor(address: string, readonly pointGraphic: Graphic) {
        this._address = address;
    }

    get address() { return this._address; }

    set address(address: string) {
        this._address = address;
    }
}

export class MapComponent extends BasicComponent {
    private readonly mapView: MapView;
    private readonly graphicsLayer: GraphicsLayer;
    private selectedCase: CaseGraphic;
    private readonly cases: CaseGraphic[] = [];

    constructor(private readonly customerClient: PllAppApi, options: MapComponentOptionsMapComponentOptions, protected readonly view: MapComponentView) {
        super(view);
        config.apiKey = 'AAPKf33c95fae33b4389a4640e3cb281c442izYPKFgvzDzgVUCp0dqSTSeQiQ_sYA_gnhmatfKxFSAHjl1PYPobzQaG9tgsG9ig';
        view.shellView.mapContainerID = options.id;
        const map = new Map({
            basemap: 'arcgis-streets'
        });
        this.graphicsLayer = new GraphicsLayer();
        map.add(this.graphicsLayer);
        this.mapView = new MapView({
            map: map,
            container: view.shellView.mapContainerID
        });
        this.mapView.when(() => {
            if (options.selectCaseLocation) {
                this.mapView.on('click', this.onMapClick.bind(this));
            }
            if (options.search) {
                const search = new Search({
                    view: this.mapView
                });
                this.mapView.ui.add(search, 'top-right');
            }
            this.mapView.ui.move("zoom", "top-left");
            this.mapView.center = new Point({
                longitude: -82.231978,
                latitude: 34.937484
            });
            this.mapView.zoom = 12;
        });
    }

    clearGraphics() {
        this.selectedCase = null;
        this.cases.splice(0, this.cases.length);
        this.graphicsLayer.removeAll();
    }

    addCase(address: string, x: number, y: number) {
        const pointGraphic = new Graphic({
            geometry: new Point({ x: x, y: y, spatialReference: { wkid: 102733 } }),
            symbol: this.getSymbol()
        });
        this.graphicsLayer.add(pointGraphic);
        const caseGraphic = new CaseGraphic(address, pointGraphic);
        caseGraphic.pointGraphic.popupTemplate = new PopupTemplate({
            title: 'Address',
            content: this.getPopupContent(caseGraphic) 
        });
        this.cases.push(caseGraphic);
    }

    getSelectedPoint() {
        return this.selectedCase && this.selectedCase.pointGraphic.geometry as Point;
    }

    private async onMapClick(event: ViewClickEvent) {
        if (this.selectedCase) {
            const index = this.cases.indexOf(this.selectedCase);
            this.cases.splice(index, 1);
            this.graphicsLayer.remove(this.selectedCase.pointGraphic);
            this.selectedCase = null;
        }
        const pointGraphic = new Graphic({
            geometry: event.mapPoint,
            symbol: this.getSymbol()
        });
        this.graphicsLayer.add(pointGraphic);
        this.selectedCase = new CaseGraphic('Looking up address...', pointGraphic);
        this.selectedCase.pointGraphic.popupTemplate = new PopupTemplate({
            title: 'Selected Address',
            content: this.getPopupContentAsync.bind(this, this.selectedCase)
        });
    }

    private getSymbol() {
        return new SimpleMarkerSymbol({
            color: "green",
            path: "M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z",
            outline: null
        });
    }

    private async getPopupContentAsync(caseGraphic: CaseGraphic) {
        const pt = caseGraphic.pointGraphic.geometry as Point;
        caseGraphic.address = await this.customerClient.WipCase.ReverseGeocode({ Latitude: pt.latitude, Longitude: pt.longitude });
        const popupContent = this.getPopupContent(caseGraphic);
        return popupContent;
    }

    private getPopupContent(caseGraphic: CaseGraphic) {
        const pt = caseGraphic.pointGraphic.geometry as Point;
        const x = pt.latitude || pt.x;
        const y = pt.longitude || pt.y;
        caseGraphic.address = caseGraphic.address || 'Address not found';
        return `<div>${caseGraphic.address}</div><div>${x && x.toFixed(3)}, ${y && y.toFixed(3)}</div >`;
    }
}