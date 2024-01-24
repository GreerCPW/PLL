import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { CasePersonEntry } from "./CasePersonEntry";
import { PersonEntryListItemView } from "./PersonEntryListItemView";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";

export class PersonEntryListItem extends BasicComponent {
    private readonly roleTextComponent: TextComponent;
    private readonly nameTextComponent: TextComponent;

    constructor(readonly personEntry: CasePersonEntry, view: PersonEntryListItemView, isEditButtonVisible: boolean) {
        super(view);
        this.roleTextComponent = new TextComponent(view.roleDescriptionView);
        this.nameTextComponent = new TextComponent(view.nameView);
        if (!isEditButtonVisible) {
            view.editButton.hide();
        }
        this.refresh();
    }

    refresh() {
        this.roleTextComponent.setText(this.personEntry.roleDescription);
        this.nameTextComponent.setText(this.personEntry.person.PersonName || this.personEntry.person.Email || this.personEntry.person.CellPhone);
    }
}