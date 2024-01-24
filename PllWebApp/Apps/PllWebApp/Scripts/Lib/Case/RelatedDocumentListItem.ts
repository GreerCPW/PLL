import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { RelatedDocumentListItemView } from "./RelatedDocumentListItemView";

export class RelatedDocumentListItem extends BasicComponent {
    constructor(readonly relatedDocument: ICaseRelatedDocumentModel, protected readonly view: RelatedDocumentListItemView) {
        super(view);
        const labelTextComponent = new TextComponent(view.labelTextView);
        labelTextComponent.setText(relatedDocument.LabelText);
        const fileNameTextComponent = new TextComponent(view.fileNameTextView);
        fileNameTextComponent.setText(relatedDocument.FileName);
    }

}