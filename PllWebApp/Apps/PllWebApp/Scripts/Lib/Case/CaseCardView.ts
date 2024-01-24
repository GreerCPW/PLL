import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { CardView } from "@jasonbenfield/sharedwebapp/Views/Card";
import { FormGroupGridView, FormGroupTextView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { TextHeading5View } from "@jasonbenfield/sharedwebapp/Views/TextHeadings";

export class CaseCardView extends CardView {
    readonly caseNumberTextView: BasicTextComponentView;
    readonly businessCaseTextView: BasicTextComponentView;
    readonly statusTextView: BasicTextComponentView;
    readonly timeCreatedTextView: BasicTextComponentView;
    readonly locationTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.caseNumberTextView = this.addCardTitleHeader();
        const caseBody = this.addCardBody();
        this.businessCaseTextView = caseBody.addView(TextHeading5View);
        this.businessCaseTextView.addCssName('card-title');
        const formGroupContainer = caseBody.addView(FormGroupGridView);
        const statusFormGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        statusFormGroup.caption.setText('Status');
        this.statusTextView = statusFormGroup.textValue;
        const timeCreatedFormGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        timeCreatedFormGroup.caption.setText('Created');
        this.timeCreatedTextView = timeCreatedFormGroup.textValue;
        const locationFormGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        locationFormGroup.caption.setText('Location');
        this.locationTextView = locationFormGroup.textValue;
    }
}