import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { AsyncCommand, Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { PllAppApi } from "../../Api/PllAppApi";
import { MapComponent } from "../../MapComponent";
import { CaseEntry } from "../CaseEntry";
import { SelectLocationPanelView } from "./SelectLocationPanelView";

interface IResult {
    back?: boolean;
    enterAddress?: boolean;
    next?: boolean;
}

class Result {
    static back() {
        return new Result({ back: true });
    }

    static enterAddress() {
        return new Result({ enterAddress: true });
    }

    static next() {
        return new Result({ next: true });
    }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get enterAddress() { return this.results.enterAddress; }

    get next() { return this.results.next; }
}

export class SelectLocationPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly alert: MessageAlert;
    private readonly mapComponent: MapComponent;
    private caseEntry: CaseEntry;

    constructor(pllClient: PllAppApi, private readonly view: SelectLocationPanelView) {
        this.alert = new MessageAlert(view.alertView);
        this.mapComponent = new MapComponent(pllClient, { id: 'selectLocationMap', selectCaseLocation: true }, view.mapComponentView);
        new Command(this.enterAddress.bind(this)).add(view.enterAddressButton);
        new AsyncCommand(this.next.bind(this)).add(view.nextButton);
        new Command(this.back.bind(this)).add(view.backButton);
    }

    private enterAddress() {
        this.awaitable.resolve(Result.enterAddress());
    }

    private async next() {
        const selectedPoint = this.mapComponent.getSelectedPoint();
        if (selectedPoint && selectedPoint.latitude && selectedPoint.longitude) {
            await this.alert.infoAction(
                'Saving...',
                () => this.caseEntry.saveMapLocation(selectedPoint.latitude, selectedPoint.longitude)
            );
            this.awaitable.resolve(Result.next());
        }
    }

    setCaseEntry(caseEntry: CaseEntry) {
        this.caseEntry = caseEntry;
    }

    private back() { this.awaitable.resolve(Result.back()); }

    start() {
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}