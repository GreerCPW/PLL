import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { ActivityListItemView } from "./ActivityListItemView";
import { TextLinkComponent } from "@jasonbenfield/sharedwebapp/Components/TextLinkComponent";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";

export class WorkOrderActivityListItem extends BasicComponent {
    constructor(workOrder: IWorkOrderModel, view: ActivityListItemView) {
        super(view);
        const linkComponent = new TextLinkComponent(view.activityLinkView);
        linkComponent.setText(workOrder.ID);
        linkComponent.setHref(workOrder.OfficeUrl);
        const descriptionTextComponent = new TextComponent(view.descriptionTextView);
        descriptionTextComponent.setText(workOrder.Description.CwValue);
        const statusTextComponent = new TextComponent(view.statusTextView);
        statusTextComponent.setText(workOrder.Status.StatusType.DisplayText);
    }
}

export class ServiceRequestActivityListItem extends BasicComponent {
    constructor(serviceRequest: IServiceRequestModel, view: ActivityListItemView) {
        super(view);
        const linkComponent = new TextLinkComponent(view.activityLinkView);
        linkComponent.setText(serviceRequest.ID.toString());
        linkComponent.setHref(serviceRequest.OfficeUrl);
        const descriptionTextComponent = new TextComponent(view.descriptionTextView);
        descriptionTextComponent.setText(serviceRequest.Description);
        const statusTextComponent = new TextComponent(view.statusTextView);
        statusTextComponent.setText(serviceRequest.Status.StatusType.DisplayText);
    }
}

export class InspectionActivityListItem extends BasicComponent {
    constructor(inspection: IInspectionModel, view: ActivityListItemView) {
        super(view);
        const linkComponent = new TextLinkComponent(view.activityLinkView);
        linkComponent.setText(inspection.ID.toString());
        linkComponent.setHref(inspection.OfficeUrl);
        const descriptionTextComponent = new TextComponent(view.descriptionTextView);
        descriptionTextComponent.setText(inspection.TemplateName);
        const statusTextComponent = new TextComponent(view.statusTextView);
        statusTextComponent.setText(inspection.Status.StatusType.DisplayText);
    }
}