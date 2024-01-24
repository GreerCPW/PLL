import { AppApiFactory } from "@jasonbenfield/sharedwebapp/Api/AppApiFactory";
import { ModalErrorView } from "@jasonbenfield/sharedwebapp/Views/ModalError";
import { PllAppApi } from "../Lib/Api/PllAppApi";

export class Apis {
    private readonly apiFactory: AppApiFactory;

    constructor(modalError: ModalErrorView) {
        this.apiFactory = new AppApiFactory(modalError)
    }

    Pll() {
        return this.apiFactory.api(PllAppApi);
    }
}