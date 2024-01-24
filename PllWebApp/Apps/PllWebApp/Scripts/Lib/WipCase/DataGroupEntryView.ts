import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";
import { FormGroupGridView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { TextHeading1View } from "@jasonbenfield/sharedwebapp/Views/TextHeadings";
import { DataGroupDetailEntryView } from "./DataGroupDetailEntryView";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";

export class DataGroupEntryView extends BlockView {
    readonly titleView: BasicTextComponentView;
    private readonly detailContainer: FormGroupGridView;

    constructor(container: BasicComponentView) {
        super(container);
        this.titleView = this.addView(TextHeading1View);
        this.titleView.setMargin(MarginCss.bottom(3));
        this.detailContainer = this.addView(FormGroupGridView);
        this.detailContainer.setTemplateColumns(CssLengthUnit.flex(1));
    }

    addDataGroupDetailEntryView() {
        return this.detailContainer.addFormGroup(DataGroupDetailEntryView);
    }
}