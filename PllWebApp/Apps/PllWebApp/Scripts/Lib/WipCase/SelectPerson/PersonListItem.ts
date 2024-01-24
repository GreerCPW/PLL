import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { PersonListItemView } from "./PersonListItemView";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";

export class PersonListItem extends BasicComponent {

    constructor(readonly person: ICustomerPersonModel, protected readonly view: PersonListItemView) {
        super(view);
        const nameTextComponent = new TextComponent(view.nameTextView);
        nameTextComponent.setText(person.PersonName);
        const emailTextComponent = new TextComponent(view.emailTextView);
        emailTextComponent.setText(person.Email);
    }
}