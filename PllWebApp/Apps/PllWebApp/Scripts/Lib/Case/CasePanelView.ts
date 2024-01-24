import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";
import { PllTheme } from "../PllTheme";
import { PanelView } from "../PanelView";
import { CaseCardView } from "./CaseCardView";
import { DataGroupContainerView } from "./DataGroupContainerView";
import { DocumentCardView } from "./DocumentCardView";
import { FeeCardView } from "./FeeCardView";
import { PeopleCardView } from "./PeopleCardView";
import { TaskCardView } from "./TaskCardView";

export class CasePanelView extends PanelView {
    readonly alertView: MessageAlertView;
    readonly caseCardView: CaseCardView;
    readonly feeCardView: FeeCardView;
    readonly peopleCardView: PeopleCardView;
    readonly dataGroupContainerView: DataGroupContainerView;
    readonly documentCardView: DocumentCardView;
    readonly taskCardView: TaskCardView;
    readonly menuButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.alertView = this.body.addView(MessageAlertView);
        this.caseCardView = this.body.addView(CaseCardView);
        this.caseCardView.setMargin(MarginCss.bottom(3));
        this.feeCardView = this.body.addView(FeeCardView);
        this.feeCardView.setMargin(MarginCss.bottom(3));
        this.peopleCardView = this.body.addView(PeopleCardView);
        this.peopleCardView.setMargin(MarginCss.bottom(3));
        this.dataGroupContainerView = this.body.addView(DataGroupContainerView);
        this.documentCardView = this.body.addView(DocumentCardView);
        this.documentCardView.setMargin(MarginCss.bottom(3));
        this.taskCardView = this.body.addView(TaskCardView);
        this.taskCardView.setMargin(MarginCss.bottom(3));
        this.menuButton = PllTheme.instance.commandToolbar.addButton(
            this.toolbar.addButtonCommandToStart()
        );
    }

}