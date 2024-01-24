import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { PllAppApi } from "../../Lib/Api/PllAppApi";
import { ActivityCardView } from "./ActivityCardView";
import { CardAlert } from "@jasonbenfield/sharedwebapp/Components/CardAlert";
import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { InspectionActivityListItem, ServiceRequestActivityListItem, WorkOrderActivityListItem } from "./ActivityListItem";
import { ActivityListItemView } from "./ActivityListItemView";

export class ActivityCard {
    private readonly workOrderAlert: MessageAlert;
    private readonly workOrderListGroup: ListGroup<WorkOrderActivityListItem, ActivityListItemView>;
    private readonly requestAlert: MessageAlert;
    private readonly requestListGroup: ListGroup<WorkOrderActivityListItem, ActivityListItemView>;
    private readonly inspectionAlert: MessageAlert;
    private readonly inspectionListGroup: ListGroup<WorkOrderActivityListItem, ActivityListItemView>;
    private caseDetail: ICaseDetailModel;

    constructor(private readonly pllClient: PllAppApi, private readonly view: ActivityCardView) {
        this.workOrderAlert = new CardAlert(view.workOrderAlertView).alert;
        this.workOrderListGroup = new ListGroup(view.workOrderListGroupView);
        this.requestAlert = new CardAlert(view.requestAlertView).alert;
        this.requestListGroup = new ListGroup(view.requestListGroupView);
        this.inspectionAlert = new CardAlert(view.inspectionAlertView).alert;
        this.inspectionListGroup = new ListGroup(view.inspectionListGroupView);
    }

    setCaseDetail(caseDetail: ICaseDetailModel) {
        this.caseDetail = caseDetail;
    }

    refresh() {
        const promises = [
            this.refreshWorkOrders(),
            this.refreshServiceRequests(),
            this.refreshInspections()
        ];
        return Promise.all(promises);
    }

    private async refreshWorkOrders() {
        this.workOrderListGroup.clearItems();
        const workOrderIDs: string[] = [];
        workOrderIDs.push(...this.caseDetail.RelatedActivities.Parent.WorkOrders);
        workOrderIDs.push(...this.caseDetail.RelatedActivities.Child.WorkOrders);
        workOrderIDs.push(...this.caseDetail.RelatedActivities.Related.WorkOrders);
        if (workOrderIDs.length > 0) {
            this.view.showWorkOrders();
            const workOrders = await this.workOrderAlert.infoAction(
                'Loading...',
                () => this.pllClient.Case.GetWorkOrders({
                    WorkOrderIDs: workOrderIDs
                })
            );
            this.workOrderListGroup.setItems(
                workOrders,
                (wo, itemView) => new WorkOrderActivityListItem(wo, itemView)
            );
        }
        if (workOrderIDs.length === 0) {
            this.view.hideWorkOrders();
        }
    }

    private async refreshServiceRequests() {
        this.requestListGroup.clearItems();
        const requestIDs: number[] = [];
        requestIDs.push(...this.caseDetail.RelatedActivities.Parent.ServiceRequests);
        requestIDs.push(...this.caseDetail.RelatedActivities.Child.ServiceRequests);
        requestIDs.push(...this.caseDetail.RelatedActivities.Related.ServiceRequests);
        if (requestIDs.length > 0) {
            this.view.showServiceRequests();
            const serviceRequests = await this.requestAlert.infoAction(
                'Loading...',
                () => this.pllClient.Case.GetServiceRequests({
                    RequestIDs: requestIDs
                })
            );
            this.requestListGroup.setItems(
                serviceRequests,
                (sr, itemView) => new ServiceRequestActivityListItem(sr, itemView)
            );
        }
        if (requestIDs.length === 0) {
            this.view.hideServiceRequests();
        }
    }

    private async refreshInspections() {
        this.inspectionListGroup.clearItems();
        const inspectionIDs: number[] = [];
        inspectionIDs.push(...this.caseDetail.RelatedActivities.Parent.Inspections);
        inspectionIDs.push(...this.caseDetail.RelatedActivities.Child.Inspections);
        inspectionIDs.push(...this.caseDetail.RelatedActivities.Related.Inspections);
        if (inspectionIDs.length > 0) {
            this.view.showInspections();
            const inspections = await this.inspectionAlert.infoAction(
                'Loading...',
                () => this.pllClient.Case.GetInspections({
                    InspectionIDs: inspectionIDs
                })
            );
            this.inspectionListGroup.setItems(
                inspections,
                (insp, itemView) => new InspectionActivityListItem(insp, itemView)
            );
        }
        if (inspectionIDs.length === 0) {
            this.view.hideInspections();
        }
    }
}
