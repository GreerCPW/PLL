import { TextComponent } from "@jasonbenfield/sharedwebapp/Components/TextComponent";
import { CaseCardView } from "./CaseCardView";
import { FormattedDate } from "@jasonbenfield/sharedwebapp/FormattedDate";

export class CaseCard {
    private readonly caseNumberTextComponent: TextComponent;
    private readonly businessCaseTextComponent: TextComponent;
    private readonly statusTextComponent: TextComponent;
    private readonly timeCreatedTextComponent: TextComponent;
    private readonly locationTextComponent: TextComponent;

    constructor(view: CaseCardView) {
        this.caseNumberTextComponent = new TextComponent(view.caseNumberTextView);
        this.businessCaseTextComponent = new TextComponent(view.businessCaseTextView);
        this.statusTextComponent = new TextComponent(view.statusTextView);
        this.timeCreatedTextComponent = new TextComponent(view.timeCreatedTextView);
        this.locationTextComponent = new TextComponent(view.locationTextView);
    }

    setCaseDetail(caseDetail: ICaseDetailModel) {
        this.caseNumberTextComponent.setText(caseDetail.Case.CaseNumber);
        this.businessCaseTextComponent.setText(caseDetail.Case.BusinessCaseDescription);
        this.statusTextComponent.setText(caseDetail.Case.CaseStatus.Value);
        this.timeCreatedTextComponent.setText(new FormattedDate(caseDetail.Case.TimeCreated).formatDate());
        this.locationTextComponent.setText(caseDetail.Case.Location);
    }
}