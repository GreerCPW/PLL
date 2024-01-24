import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { FormGroupGridView, FormGroupTextView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { GridView } from "@jasonbenfield/sharedwebapp/Views/Grid";
import { MapComponentView } from "../../MapComponentView";
import { PanelView } from "../../PanelView";
import { PllTheme } from "../../PllTheme";

export class LocationPanelView extends PanelView {
    readonly locationTextView: BasicTextComponentView;
    readonly mapComponentView: MapComponentView;
    readonly keepLocationButton: ButtonCommandView;
    readonly enterLocationButton: ButtonCommandView;
    readonly backButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.body.height100();
        this.body.removeCssName('overflow-auto');
        const layout = this.body.addView(GridView);
        layout.height100();
        layout.layout();
        layout.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1));
        const topSection = layout.addCell();
        const formGroupContainer = topSection.addView(FormGroupGridView);
        const formGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        formGroup.caption.setText('Location');
        this.locationTextView = formGroup.textValue;

        const buttonContainer = PllTheme.instance.buttonContainer(topSection.addView(BlockView));
        buttonContainer.setMargin(MarginCss.bottom(3));

        this.keepLocationButton = buttonContainer.addView(ButtonCommandView);
        this.keepLocationButton.useOutlineStyle(ContextualClass.primary);
        this.keepLocationButton.icon.solidStyle('equals');
        this.keepLocationButton.setText('Keep This Address');
        this.keepLocationButton.setTextCss(new TextCss().start());

        this.enterLocationButton = buttonContainer.addView(ButtonCommandView);
        this.enterLocationButton.useOutlineStyle(ContextualClass.primary);
        this.enterLocationButton.icon.regularStyle('keyboard');
        this.enterLocationButton.setText('Enter a Different Address');
        this.enterLocationButton.setTextCss(new TextCss().start());

        const mapCell = layout.addCell();
        mapCell.positionRelative();
        this.mapComponentView = mapCell.addView(MapComponentView);

        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
    }
}