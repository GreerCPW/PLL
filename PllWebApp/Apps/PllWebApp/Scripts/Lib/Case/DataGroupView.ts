import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { CardView } from "@jasonbenfield/sharedwebapp/Views/Card";
import { FormGroupGridView, FormGroupTextView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { TextSpanView } from "@jasonbenfield/sharedwebapp/Views/TextSpanView";
import { PllTheme } from "../PllTheme";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";

export class DataGroupView extends CardView {
    readonly dataGroupTextView: BasicTextComponentView;
    private readonly formGroupContainer: FormGroupGridView;

    constructor(container: BasicComponentView) {
        super(container);
        const header = this.addCardHeader();
        this.dataGroupTextView = header.addView(TextSpanView);
        const editButton = PllTheme.instance.cardHeader.editButton(header.addView(ButtonCommandView));
        editButton.addCssName('float-end');
        editButton.addCssName('editButton');
        const body = this.addCardBody();
        this.formGroupContainer = body.addView(FormGroupGridView);
        this.formGroupContainer.setTemplateColumns(CssLengthUnit.flex(1));
    }

    addDetail() {
        const formGroup = this.formGroupContainer.addFormGroup(FormGroupTextView);
        formGroup.captionCell.setTextCss(new TextCss().start().bold());
        return formGroup;
    }
}