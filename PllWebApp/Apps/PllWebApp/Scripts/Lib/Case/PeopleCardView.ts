import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { CardView } from "@jasonbenfield/sharedwebapp/Views/Card";
import { GridListGroupView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { CasePersonListItemView } from "./CasePersonListItemView";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";

export class PeopleCardView extends CardView {
    readonly peopleListGroupView: GridListGroupView<CasePersonListItemView>;

    constructor(container: BasicComponentView) {
        super(container);
        const titleView = this.addCardTitleHeader();
        titleView.setText('People Involved');
        this.peopleListGroupView = this.addGridListGroup(CasePersonListItemView);
        this.peopleListGroupView.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
    }
}