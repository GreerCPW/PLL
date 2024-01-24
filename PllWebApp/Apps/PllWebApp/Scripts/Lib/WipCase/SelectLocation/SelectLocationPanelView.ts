import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { PaddingCss } from "@jasonbenfield/sharedwebapp/PaddingCss";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { GridCellView } from "@jasonbenfield/sharedwebapp/Views/Grid";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";
import { TextHeading1View } from "@jasonbenfield/sharedwebapp/Views/TextHeadings";
import { PllTheme } from "../../PllTheme";
import { PanelView } from "../../PanelView";
import { MapComponentView } from "../../MapComponentView";

export class SelectLocationPanelView extends PanelView {
    private readonly topSection: GridCellView;
    readonly enterAddressButton: ButtonCommandView;
    readonly alertView: MessageAlertView;
    readonly mapComponentView: MapComponentView;
    readonly backButton: ButtonCommandView;
    readonly nextButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        this.topSection = this.insertView(0, GridCellView);
        const topContainer = this.topSection.addView(BlockView);
        topContainer.addCssName('container');
        topContainer.setPadding(PaddingCss.xs(3));
        const title = topContainer.addView(TextHeading1View);
        title.setText('Select Location');
        const buttonContainer = PllTheme.instance.buttonContainer(topContainer.addView(BlockView));
        this.enterAddressButton = buttonContainer.addView(ButtonCommandView);
        this.enterAddressButton.icon.solidStyle('keyboard');
        this.enterAddressButton.useOutlineStyle(ContextualClass.primary);
        this.enterAddressButton.setText('Enter Address Instead');
        this.enterAddressButton.setTextCss(new TextCss().start());
        this.alertView = topContainer.addView(MessageAlertView);
        this.body.positionRelative();
        this.body.height100();
        this.mapComponentView = this.body.addView(MapComponentView);
        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
        this.nextButton = PllTheme.instance.commandToolbar.nextButton(
            this.toolbar.addButtonCommandToEnd()
        );
    }
}