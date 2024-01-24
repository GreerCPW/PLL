import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { CasePersonListItemView } from "./CasePersonListItemView";

export class CasePersonListItem extends BasicComponent {
    constructor(readonly casePerson: ICasePersonModel, view: CasePersonListItemView) {
        super(view);
        for (const role of casePerson.Roles) {
            const roleView = view.addRoleView();
            const roleTextComponent = new TextComponent(roleView);
            roleTextComponent.setText(role.Role.Description);
        }
        const nameTextComponent = new TextComponent(view.nameView);
        nameTextComponent.setText(casePerson.PersonName || casePerson.Email || casePerson.CellPhone);
    }
}