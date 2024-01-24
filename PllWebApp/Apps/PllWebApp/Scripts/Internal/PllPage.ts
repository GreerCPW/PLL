import { BasicPage } from "@jasonbenfield/sharedwebapp/Components/BasicPage";
import { BasicPageView } from "@jasonbenfield/sharedwebapp/Views/BasicPageView";
import { PllAppApi } from "../Lib/Api/PllAppApi";
import { Apis } from "./Apis";

export class PllPage extends BasicPage {
    protected readonly defaultApi: PllAppApi;

    constructor(view: BasicPageView) {
        super(new Apis(view.modalError).Pll(), view);
    }
}