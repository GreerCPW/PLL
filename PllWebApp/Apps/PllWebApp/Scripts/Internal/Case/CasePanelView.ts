import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";
import { PllTheme } from "../../Lib/PllTheme";
import { PanelView } from "../../Lib/PanelView";
import { CaseCardView } from "../../Lib/Case/CaseCardView";
import { DataGroupContainerView } from "../../Lib/Case/DataGroupContainerView";
import { DocumentCardView } from "../../Lib/Case/DocumentCardView";
import { FeeCardView } from "../../Lib/Case/FeeCardView";
import { PeopleCardView } from "../../Lib/Case/PeopleCardView";
import { TaskCardView } from "../../Lib/Case/TaskCardView";
import { MapLayerCardView } from "../Case/MapLayerCardView";
import { ActivityCardView } from "../Case/ActivityCardView";

export class CasePanelView extends PanelView {
    readonly alertView: MessageAlertView;
    readonly caseCardView: CaseCardView;
    readonly mapLayerCardView: MapLayerCardView;
    readonly activityCardView: ActivityCardView;
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
        this.mapLayerCardView = this.body.addView(MapLayerCardView);
        this.mapLayerCardView.setMargin(MarginCss.bottom(3));
        this.activityCardView = this.body.addView(ActivityCardView);
        this.activityCardView.setMargin(MarginCss.bottom(3));
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