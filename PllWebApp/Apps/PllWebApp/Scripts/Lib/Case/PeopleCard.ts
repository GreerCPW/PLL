import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { PeopleCardView } from "./PeopleCardView";
import { CasePersonListItem } from "./CasePersonListItem";
import { CasePersonListItemView } from "./CasePersonListItemView";

export class PeopleCard {
    private readonly peopleListGroup: ListGroup<CasePersonListItem, CasePersonListItemView>;

    constructor(view: PeopleCardView) {
        this.peopleListGroup = new ListGroup(view.peopleListGroupView);
    }

    clear() {
        this.peopleListGroup.clearItems();
    }

    setCaseDetail(caseDetail: ICaseDetailModel) {
        this.peopleListGroup.setItems(
            caseDetail.People,
            (p, itemView) => new CasePersonListItem(p, itemView)
        );
    }
}