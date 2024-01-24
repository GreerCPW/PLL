import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { PllAppApi } from "../../Lib/Api/PllAppApi";
import { CaseCard } from "../../Lib/Case/CaseCard";
import { CasePanelView } from "./CasePanelView";
import { DataGroupContainerComponent } from "../../Lib/Case/DataGroupContainerComponent";
import { DocumentCard } from "../../Lib/Case/DocumentCard";
import { FeeCard } from "../../Lib/Case/FeeCard";
import { PeopleCard } from "../../Lib/Case/PeopleCard";
import { TaskCard } from "../../Lib/Case/TaskCard";
import { MapLayerCard } from "../Case/MapLayerCard";
import { ActivityCard } from "../Case/ActivityCard";

interface IResult {
    menuRequested?: boolean;
}

class Result {
    static menuRequested() {
        return new Result({ menuRequested: true });
    }

    private constructor(private readonly results: IResult) { }

    get menuRequested() { return this.results.menuRequested; }
}

export class CasePanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly alert: MessageAlert;
    private readonly caseCard: CaseCard;
    private readonly mapLayerCard: MapLayerCard;
    private readonly activityCard: ActivityCard;
    private readonly feeCard: FeeCard;
    private readonly peopleCard: PeopleCard;
    private readonly dataGroupContainerComponent: DataGroupContainerComponent;
    private readonly documentCard: DocumentCard;
    private readonly taskCard: TaskCard;
    private caseID: number;

    constructor(private readonly customerClient: PllAppApi, private readonly view: CasePanelView) {
        this.alert = new MessageAlert(view.alertView);
        this.caseCard = new CaseCard(view.caseCardView);
        this.mapLayerCard = new MapLayerCard(customerClient, view.mapLayerCardView);
        this.activityCard = new ActivityCard(customerClient, view.activityCardView);
        this.feeCard = new FeeCard(view.feeCardView);
        this.peopleCard = new PeopleCard(view.peopleCardView);
        this.dataGroupContainerComponent = new DataGroupContainerComponent(view.dataGroupContainerView);
        this.documentCard = new DocumentCard(view.documentCardView);
        this.taskCard = new TaskCard(view.taskCardView);
        new Command(this.menu.bind(this)).add(view.menuButton);
    }

    private menu() { this.awaitable.resolve(Result.menuRequested()); }

    setCaseID(caseID: number) {
        this.caseID = caseID;
        this.mapLayerCard.setCaseID(caseID);
    }

    async refresh() {
        this.feeCard.clear();
        this.dataGroupContainerComponent.setDataGroups([]);
        this.peopleCard.clear();
        this.taskCard.clear();
        this.documentCard.clear();
        this.mapLayerCard.refresh();
        const caseDetail = await this.alert.infoAction(
            'Loading...',
            () => this.customerClient.Case.GetCaseDetail({ CaseID: this.caseID })
        );
        this.caseCard.setCaseDetail(caseDetail);
        this.activityCard.setCaseDetail(caseDetail);
        this.activityCard.refresh();
        this.peopleCard.setCaseDetail(caseDetail);
        this.documentCard.setCaseDetail(caseDetail);
        this.taskCard.setCaseDetail(caseDetail);
        this.dataGroupContainerComponent.setDataGroups(caseDetail.DataGroupDetails);
    }

    start() {
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}