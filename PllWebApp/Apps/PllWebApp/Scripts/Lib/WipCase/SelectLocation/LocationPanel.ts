import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { CaseEntry } from "../CaseEntry";
import { LocationPanelView } from "./LocationPanelView";
import { MapComponent } from "../../MapComponent";
import { PllAppApi } from "../../Api/PllAppApi";

interface IResult {
    back?: boolean;
    next?: boolean;
    enterLocationRequested?: boolean;
}

class Result {
    static back() {
        return new Result({ back: true });
    }

    static next() {
        return new Result({ next: true });
    }

    static enterLocationRequested() {
        return new Result({ enterLocationRequested: true });
    }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get next() { return this.results.next; }

    get enterLocationRequested() { return this.results.enterLocationRequested; }
}

export class LocationPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly locationTextComponent: TextComponent;
    private readonly mapComponent: MapComponent;
    private caseEntry: CaseEntry;

    constructor(customerClient: PllAppApi, private readonly view: LocationPanelView) {
        this.locationTextComponent = new TextComponent(view.locationTextView);
        this.mapComponent = new MapComponent(customerClient, { id: 'locationMap' }, view.mapComponentView);
        new Command(this.keepAddress.bind(this)).add(view.keepLocationButton);
        new Command(this.selectAddress.bind(this)).add(view.enterLocationButton);
        new Command(this.back.bind(this)).add(view.backButton);
    }

    private keepAddress() {
        this.awaitable.resolve(Result.next());
    }

    private selectAddress() {
        this.awaitable.resolve(Result.enterLocationRequested());
    }

    setCaseEntry(caseEntry: CaseEntry) {
        this.caseEntry = caseEntry;
        this.load();
    }

    private back() { this.awaitable.resolve(Result.back()); }

    start() {
        this.load();
        return this.awaitable.start();
    }

    private load() {
        this.locationTextComponent.setText(this.caseEntry.location);
        this.mapComponent.clearGraphics();
        this.mapComponent.addCase(this.caseEntry.location, this.caseEntry.x, this.caseEntry.y);
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}