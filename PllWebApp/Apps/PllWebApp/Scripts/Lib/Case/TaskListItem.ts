import { BasicComponent } from "@jasonbenfield/sharedwebapp/Components/BasicComponent";
import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { FormattedDate } from "@jasonbenfield/sharedwebapp/FormattedDate";
import { CaseTaskDetail } from "./CaseTaskDetail";
import { TaskListItemView } from "./TaskListItemView";

export class TaskListItem extends BasicComponent {
    constructor(readonly taskDetail: CaseTaskDetail, view: TaskListItemView) {
        super(view);
        const descriptionTextComponent = new TextComponent(view.descriptionTextView);
        descriptionTextComponent.setText(taskDetail.task.Description);
        const resultTextComponent = new TextComponent(view.resultTextView);
        resultTextComponent.setText(taskDetail.result && taskDetail.result.Description);
        const targetEndDateTextComponent = new TextComponent(view.targetEndDateTextView);
        if (taskDetail.task.TargetEndDate && taskDetail.task.TargetEndDate.getFullYear() < 9999) {
            targetEndDateTextComponent.setText(new FormattedDate(taskDetail.task.TargetEndDate).formatDate());
        }
        const completedDateTextComponent = new TextComponent(view.completedDateTextView);
        if (taskDetail.task.ActualEndDate && taskDetail.task.ActualEndDate.getFullYear() < 9999) {
            completedDateTextComponent.setText(new FormattedDate(taskDetail.task.TargetEndDate).formatDate());
        }
        const milestoneTextComponent = new TextComponent(view.milestoneTextView);
        milestoneTextComponent.setText(taskDetail.task.StartPoint.toString());
    }
}

export class TaskHeaderListItem extends BasicComponent {
    constructor(view: TaskListItemView) {
        super(view);
        view.styleAsHeader();
        const descriptionTextComponent = new TextComponent(view.descriptionTextView);
        descriptionTextComponent.setText('Description');
        const resultTextComponent = new TextComponent(view.resultTextView);
        resultTextComponent.setText('Result');
        const targetEndDateTextComponent = new TextComponent(view.targetEndDateTextView);
        targetEndDateTextComponent.setText('Target End');
        const completedDateTextComponent = new TextComponent(view.completedDateTextView);
        completedDateTextComponent.setText('Completed');
        const milestoneTextComponent = new TextComponent(view.milestoneTextView);
        milestoneTextComponent.setText('Milestone');
    }
}