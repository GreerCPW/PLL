import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { TextButtonListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { BusinessCaseListItem } from "./BusinessCaseListItem";
import { SelectBusinessCasePanelView } from "./SelectBusinessCasePanelView";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { PllAppApi } from "../Api/PllAppApi";

interface IResult {
    back?: boolean;
    caseCreated?: { caseID: number };
}

class Result {
    static back() { return new Result({ back: true }); }

    static caseCreated(caseID: number) {
        return new Result({ caseCreated: { caseID: caseID } });
    }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get caseCreated() { return this.results.caseCreated; }
}

export class SelectBusinessCasePanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly alert: MessageAlert;
    private readonly businessCaseListGroup: ListGroup<BusinessCaseListItem, TextButtonListGroupItemView>;

    constructor(private readonly pllClient: PllAppApi, private readonly view: SelectBusinessCasePanelView) {
        this.alert = new MessageAlert(view.alertView);
        this.businessCaseListGroup = new ListGroup(view.businessCaseListGroupView);
        this.businessCaseListGroup.registerItemClicked(this.onBusinessCaseClicked.bind(this));
    }

    private async onBusinessCaseClicked(businessCaseListItem: BusinessCaseListItem) {
        const caseID = await this.alert.infoAction(
            'Loading...',
            () => this.pllClient.WipCases.AddCase(businessCaseListItem.businessCase.ID)
        );
        this.awaitable.resolve(Result.caseCreated(caseID));
    }

    start() {
        return this.awaitable.start();
    }

    activate() {
        this.view.show();
        this.refresh();
    }

    private async refresh() {
        if (this.businessCaseListGroup.getItems().length === 0) {
            const businessCases = await this.alert.infoAction(
                'Loading...',
                () => this.pllClient.WipCases.GetBusinessCases()
            );
            this.businessCaseListGroup.setItems(
                businessCases,
                (bc, itemView) => new BusinessCaseListItem(bc, itemView)
            );
        }
    }

    deactivate() { this.view.hide(); }

}