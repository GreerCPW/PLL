import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { TextButtonListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";

export class LabelListItem extends BasicComponent {
    constructor(readonly label: ICwDocumentLabelModel, protected readonly view: TextButtonListGroupItemView) {
        super(view);
        const textComponent = new TextComponent(view);
        textComponent.setText(label.LabelText);
    }

    styleAsActive() {
        this.view.active();
    }

    styleAsNotActive() {
        this.view.notActive();
    }
}