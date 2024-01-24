import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { GridView } from "@jasonbenfield/sharedwebapp/Views/Grid";
import { ToolbarView } from "@jasonbenfield/sharedwebapp/Views/ToolbarView";
import { PllTheme } from "./PllTheme";
import { ColumnCss } from "@jasonbenfield/sharedwebapp/ColumnCss";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";

export class PanelView extends GridView {
    readonly body: BlockView;
    readonly toolbar: ToolbarView;

    constructor(container: BasicComponentView) {
        super(container);
        this.height100();
        this.layout();
        this.setTemplateRows(CssLengthUnit.flex(1), CssLengthUnit.auto());
        this.body = PllTheme.instance.mainContent(this.addCell());
        this.toolbar = PllTheme.instance.commandToolbar.toolbar(this.addCell().addView(ToolbarView));
        this.toolbar.columnStart.setColumnCss(ColumnCss.xs('auto'));
        this.toolbar.columnMiddle.setColumnCss(ColumnCss.xs('fill'));
        this.toolbar.columnMiddle.setTextCss(new TextCss().center());
    }
}