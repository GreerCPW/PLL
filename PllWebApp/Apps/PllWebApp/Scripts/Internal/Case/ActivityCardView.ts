import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { CardAlertView, CardView } from "@jasonbenfield/sharedwebapp/Views/Card";
import { GridListGroupView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { ActivityListItemView } from "./ActivityListItemView";

export class ActivityCardView extends CardView {
    private readonly workOrderTitle: BasicTextComponentView;
    readonly workOrderAlertView: CardAlertView;
    readonly workOrderListGroupView: GridListGroupView<ActivityListItemView>;
    private readonly requestTitle: BasicTextComponentView;
    readonly requestAlertView: CardAlertView;
    readonly requestListGroupView: GridListGroupView<ActivityListItemView>;
    private readonly inspectionTitle: BasicTextComponentView;
    readonly inspectionAlertView: CardAlertView;
    readonly inspectionListGroupView: GridListGroupView<ActivityListItemView>;

    constructor(container: BasicComponentView) {
        super(container);
        this.workOrderTitle = this.addCardTitleHeader();
        this.workOrderTitle.setText('Work Orders');
        this.workOrderAlertView = this.addCardAlert();
        this.workOrderListGroupView = this.addGridListGroup(ActivityListItemView);
        this.workOrderListGroupView.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        this.requestTitle = this.addCardTitleHeader();
        this.requestTitle.setText('Service Requests');
        this.requestAlertView = this.addCardAlert();
        this.requestListGroupView = this.addGridListGroup(ActivityListItemView);
        this.requestListGroupView.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        this.inspectionTitle = this.addCardTitleHeader();
        this.inspectionTitle.setText('Inspections');
        this.inspectionAlertView = this.addCardAlert();
        this.inspectionListGroupView = this.addGridListGroup(ActivityListItemView);
        this.inspectionListGroupView.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
    }

    showWorkOrders() {
        this.workOrderTitle.show();
    }

    hideWorkOrders() {
        this.workOrderTitle.hide();
    }

    showServiceRequests() {
        this.requestTitle.show();
    }

    hideServiceRequests() {
        this.requestTitle.hide();
    }

    showInspections() {
        this.inspectionTitle.show();
    }

    hideInspections() {
        this.inspectionTitle.hide();
    }
}