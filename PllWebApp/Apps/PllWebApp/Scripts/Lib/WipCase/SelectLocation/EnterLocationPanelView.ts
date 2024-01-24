import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { PanelView } from "../../PanelView";
import { FormView } from "@jasonbenfield/sharedwebapp/Views/FormView";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { PllTheme } from "../../PllTheme";
import { InputView } from "@jasonbenfield/sharedwebapp/Views/InputView";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { GridCellView } from "@jasonbenfield/sharedwebapp/Views/Grid";
import { InputGroupView } from "@jasonbenfield/sharedwebapp/Views/InputGroupView";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";
import { ButtonListGroupView, TextButtonListGroupItemView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { PaddingCss } from "@jasonbenfield/sharedwebapp/PaddingCss";
import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { FormGroupGridView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";

export class EnterLocationPanelView extends PanelView {
    private readonly topSection: GridCellView;
    private readonly form: FormView;
    readonly locationInputView: InputView;
    readonly alertView: MessageAlertView;
    readonly addressCandidateListView: ButtonListGroupView<TextButtonListGroupItemView>;
    readonly searchButton: ButtonCommandView;
    readonly selectOnMapButton: ButtonCommandView;
    readonly backButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        this.topSection = this.insertView(0, GridCellView);
        const topContainer = this.topSection.addView(BlockView);
        topContainer.addCssName('container');
        topContainer.setPadding(PaddingCss.xs(3));
        this.form = topContainer.addView(FormView);
        this.form.addOffscreenSubmit();
        const formGroupContainer = this.form.addView(FormGroupGridView);
        const formGroup = formGroupContainer.addFormGroup();
        formGroup.caption.setText('Address');
        const inputGroupView = formGroup.valueCell.addView(InputGroupView);
        this.locationInputView = inputGroupView.appendFormControl(InputView);
        this.searchButton = inputGroupView.addButton(ButtonCommandView);
        this.searchButton.icon.solidStyle('magnifying-glass');
        this.searchButton.setContext(ContextualClass.secondary);
        this.searchButton.setText('Find');
        const buttonContainer = PllTheme.instance.buttonContainer(topContainer.addView(BlockView));
        this.selectOnMapButton = buttonContainer.addView(ButtonCommandView);
        this.selectOnMapButton.useOutlineStyle(ContextualClass.primary);
        this.selectOnMapButton.setText('Select on Map Instead');
        this.selectOnMapButton.icon.solidStyle('map');
        this.selectOnMapButton.setTextCss(new TextCss().start());
        this.alertView = this.body.addView(MessageAlertView);
        this.addressCandidateListView = this.body.addButtonListGroup(TextButtonListGroupItemView);
        this.backButton = PllTheme.instance.commandToolbar.backButton(
            this.toolbar.addButtonCommandToStart()
        );
    }

    handleFormSubmit(action: () => void) {
        this.form.onSubmit()
            .preventDefault()
            .execute(action)
            .subscribe();
    }
}