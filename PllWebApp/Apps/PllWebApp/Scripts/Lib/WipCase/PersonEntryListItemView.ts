import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { GridListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { TextBlockView } from "@jasonbenfield/sharedwebapp/Views/TextBlockView";
import { TextStrongView } from "@jasonbenfield/sharedwebapp/Views/TextStrongView";

export class PersonEntryListItemView extends GridListGroupItemView {
    readonly roleDescriptionView: BasicTextComponentView;
    readonly nameView: BasicTextComponentView;
    readonly editButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.roleDescriptionView = this.addCell().addView(TextStrongView);
        this.nameView = this.addCell().addView(TextBlockView);
        this.editButton = this.addCell().addView(ButtonCommandView);
        this.editButton.icon.solidStyle('edit');
        this.editButton.setText('Edit');
        this.editButton.useOutlineStyle(ContextualClass.primary);
        this.editButton.addCssName('editButton');
    }
}