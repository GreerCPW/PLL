import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { CardAlertView, CardView } from "@jasonbenfield/sharedwebapp/Views/Card";
import { GridListGroupView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { RelatedDocumentListItemView } from "./RelatedDocumentListItemView";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";

export class DocumentCardView extends CardView {
    readonly alert: CardAlertView;
    readonly documentListGroupView: GridListGroupView<RelatedDocumentListItemView>;

    constructor(container: BasicComponentView) {
        super(container);
        const documentTitleView = this.addCardTitleHeader();
        documentTitleView.setText('Related Documents');
        this.documentListGroupView = this.addGridListGroup(RelatedDocumentListItemView);
        this.documentListGroupView.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.auto(), CssLengthUnit.flex(1));
    }
}