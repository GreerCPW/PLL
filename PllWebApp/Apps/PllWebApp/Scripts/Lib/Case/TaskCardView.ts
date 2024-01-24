import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { CardAlertView, CardView } from "@jasonbenfield/sharedwebapp/Views/Card";
import { GridListGroupView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { TaskListItemView } from "./TaskListItemView";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";

export class TaskCardView extends CardView {
    readonly taskAlert: CardAlertView;
    readonly taskListGroupView: GridListGroupView<TaskListItemView>;

    constructor(container: BasicComponentView) {
        super(container);
        const taskTitleView = this.addCardTitleHeader();
        taskTitleView.setText('Workflow');
        this.taskAlert = this.addCardAlert();
        this.taskListGroupView = this.addGridListGroup(TaskListItemView);
        this.taskListGroupView.setTemplateColumns(
            CssLengthUnit.flex(1),
            CssLengthUnit.auto(),
            CssLengthUnit.auto(),
            CssLengthUnit.auto(),
            CssLengthUnit.auto()
        );
    }
}