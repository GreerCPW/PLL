import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { TextButtonListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";

export class BusinessCaseListItem extends BasicComponent {
    constructor(readonly businessCase: IBusinessCaseModel, view: TextButtonListGroupItemView) {
        super(view);
        const businessCaseText = new TextComponent(view);
        businessCaseText.setText(businessCase.Description);
    }
}