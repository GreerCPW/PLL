import { MessageAlert } from "@jasonbenfield/sharedwebapp/Components/MessageAlert";
import { TaskCardView } from "./TaskCardView";
import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { TaskHeaderListItem, TaskListItem } from "./TaskListItem";
import { TaskListItemView } from "./TaskListItemView";
import { CardAlert } from "@jasonbenfield/sharedwebapp/Components/CardAlert";
import { CaseTaskDetail } from "./CaseTaskDetail";

export class TaskCard {
    private readonly taskAlert: MessageAlert;
    private readonly taskListGroup: ListGroup<TaskListItem | TaskHeaderListItem, TaskListItemView>;

    constructor(view: TaskCardView) {
        this.taskAlert = new CardAlert(view.taskAlert).alert;
        this.taskListGroup = new ListGroup(view.taskListGroupView);
    }

    clear() {
        this.taskAlert.clear();
        this.taskListGroup.clearItems();
    }

    setCaseDetail(caseDetail: ICaseDetailModel) {
        if (caseDetail.TaskDetails.length > 0) {
            this.taskListGroup.addItem({}, (_, itemView) => new TaskHeaderListItem(itemView));
            for (const taskDetail of caseDetail.TaskDetails) {
                this.taskListGroup.addItem(
                    taskDetail,
                    (t, itemView) => new TaskListItem(new CaseTaskDetail(t), itemView)
                );
            }
        }
        else {
            this.taskAlert.danger('No Tasks have been added.');
        }
    }
}