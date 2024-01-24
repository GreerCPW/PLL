import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { RelatedDocumentListItemView } from "./RelatedDocumentListItemView";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { RelatedDocumentEntry } from "./RelatedDocumentEntry";

export class RelatedDocumentListItem extends BasicComponent {
    constructor(readonly relatedDocumentEntry: RelatedDocumentEntry, protected readonly view: RelatedDocumentListItemView, clickable: boolean) {
        super(view);
        if (relatedDocumentEntry.thumbnail) {
            view.iconView.hide();
            view.thumbnailView.setSrc(`data:${relatedDocumentEntry.contentType};base64, ${relatedDocumentEntry.thumbnail}`);
        }
        else {
            if (/\.pdf$/.test(relatedDocumentEntry.fileName)) {
                view.iconView.solidStyle('file-pdf');
            }
            else if (/\.docx?$/.test(relatedDocumentEntry.fileName)) {
                view.iconView.solidStyle('file-word');
            }
            else if (/\.xlsx?$/.test(relatedDocumentEntry.fileName)) {
                view.iconView.solidStyle('file-excel');
            }
            else {
                view.iconView.solidStyle('file');
            }
            view.thumbnailView.hide();
        }
        const labelTextComponent = new TextComponent(view.labelTextView);
        labelTextComponent.setText(relatedDocumentEntry.labelText);
        const fileNameTextComponent = new TextComponent(view.fileNameTextView);
        fileNameTextComponent.setText(relatedDocumentEntry.fileName);
        if (clickable) {
            view.makeClickable();
        }
    }

}