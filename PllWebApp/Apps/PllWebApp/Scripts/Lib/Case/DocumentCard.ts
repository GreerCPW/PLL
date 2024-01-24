import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { DocumentCardView } from "./DocumentCardView";
import { RelatedDocumentListItem } from "./RelatedDocumentListItem";
import { RelatedDocumentListItemView } from "./RelatedDocumentListItemView";
import { CardAlert } from "@jasonbenfield/sharedwebapp/Components/CardAlert";

export class DocumentCard {
    private readonly documentAlert: MessageAlert;
    private readonly documentListGroup: ListGroup<RelatedDocumentListItem, RelatedDocumentListItemView>;

    constructor(view: DocumentCardView) {
        this.documentAlert = new CardAlert(view.alert).alert;
        this.documentListGroup = new ListGroup(view.documentListGroupView);
    }

    clear() {
        this.documentAlert.clear();
        this.documentListGroup.clearItems();
    }

    setCaseDetail(caseDetail: ICaseDetailModel) {
        if (caseDetail.RelatedDocuments.length > 0) {
            this.documentListGroup.setItems(
                caseDetail.RelatedDocuments,
                (d, itemView) => new RelatedDocumentListItem(d, itemView)
            );
        }
        else {
            this.documentAlert.danger('No Documents have been added.');
        }
    }
}