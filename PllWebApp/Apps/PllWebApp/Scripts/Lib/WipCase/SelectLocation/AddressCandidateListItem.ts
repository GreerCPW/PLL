import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { TextButtonListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";

export class AddressCandidateListItem extends BasicComponent {
    constructor(readonly addressCandidate: IAddressCandidateModel, view: TextButtonListGroupItemView) {
        super(view);
        const text = new TextComponent(view);
        text.setText(addressCandidate.Address);
    }
}