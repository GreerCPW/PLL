import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { CssLengthUnit } from "@jasonbenfield/sharedwebapp/CssLengthUnit";
import { MarginCss } from "@jasonbenfield/sharedwebapp/MarginCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BasicTextComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicTextComponentView";
import { CardAlertView, CardView } from "@jasonbenfield/sharedwebapp/Views/Card";
import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { FormGroupGridView, FormGroupTextView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";
import { GridListGroupView } from "@jasonbenfield/sharedwebapp/Views/ListGroup";
import { MessageAlertView } from "@jasonbenfield/sharedwebapp/Views/MessageAlertView";
import { TextHeading1View } from "@jasonbenfield/sharedwebapp/Views/TextHeadings";
import { TextSpanView } from "@jasonbenfield/sharedwebapp/Views/TextSpanView";
import { PllTheme } from "../PllTheme";
import { PanelView } from "../PanelView";
import { DataGroupContainerView } from "./DataGroupContainerView";
import { PersonEntryListItemView } from "./PersonEntryListItemView";
import { RelatedDocumentListItemView } from "./RelatedDocuments/RelatedDocumentListItemView";

export class CaseEntryPanelView extends PanelView {
    readonly businessCaseTextView: BasicTextComponentView;
    readonly alertView: MessageAlertView;
    readonly locationTextView: BasicTextComponentView;
    readonly editLocationButton: ButtonCommandView;
    readonly personEntryListView: GridListGroupView<PersonEntryListItemView>;
    readonly editPeopleButton: ButtonCommandView;
    readonly dataGroupContainerView: DataGroupContainerView;
    readonly documentAlertView: CardAlertView;
    readonly editDocumentButton: ButtonCommandView;
    readonly documentListGroupView: GridListGroupView<RelatedDocumentListItemView>;
    readonly cancelCaseButton: ButtonCommandView;
    readonly completeButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.businessCaseTextView = this.body.addView(TextHeading1View);
        this.businessCaseTextView.setMargin(MarginCss.bottom(3));
        this.alertView = this.body.addView(MessageAlertView);
        const formGroupContainer = this.body.addView(FormGroupGridView);
        formGroupContainer.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        const locationFormGroup = formGroupContainer.addFormGroup(FormGroupTextView);
        locationFormGroup.caption.setText('Location');
        this.editLocationButton = locationFormGroup.addCell().addView(ButtonCommandView);
        this.editLocationButton.setText('Edit');
        this.editLocationButton.setTitle('Edit Location');
        this.editLocationButton.useOutlineStyle(ContextualClass.primary);
        this.editLocationButton.icon.solidStyle('pen-to-square');
        this.locationTextView = locationFormGroup.textValue;
        const peopleCardView = this.body.addView(CardView);
        const peopleHeader = peopleCardView.addCardHeader();
        const peopleTitle = peopleHeader.addView(TextSpanView);
        peopleTitle.setText('People Involved');
        this.editPeopleButton = PllTheme.instance.cardHeader.editButton(peopleHeader.addView(ButtonCommandView));
        this.editPeopleButton.addCssName('float-end');
        this.personEntryListView = peopleCardView.addGridListGroup(PersonEntryListItemView);
        this.personEntryListView.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1),
            CssLengthUnit.auto()
        );
        peopleCardView.setMargin(MarginCss.bottom(3));
        this.dataGroupContainerView = this.body.addView(DataGroupContainerView);
        const documentCardView = this.body.addView(CardView);
        const documentHeader = documentCardView.addCardHeader();
        const documentTitle = documentHeader.addView(TextSpanView);
        documentTitle.setText('Related Documents');
        this.editDocumentButton = PllTheme.instance.cardHeader.editButton(documentHeader.addView(ButtonCommandView));
        this.editDocumentButton.addCssName('float-end');
        this.documentAlertView = documentCardView.addCardAlert();
        this.documentListGroupView = documentCardView.addGridListGroup(RelatedDocumentListItemView);
        this.documentListGroupView.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.auto(), CssLengthUnit.flex(1));
        documentCardView.setMargin(MarginCss.bottom(3));

        this.cancelCaseButton = PllTheme.instance.commandToolbar.cancelCaseButton(
            this.toolbar.addButtonCommandToMiddle()
        );
        this.completeButton = PllTheme.instance.commandToolbar.saveButton(
            this.toolbar.addButtonCommandToEnd()
        );
        this.completeButton.setText('Submit');
        this.completeButton.setTitle('Submit Application');
    }

    handlePersonEntryEditClicked(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.personEntryListView.on('click')
            .select('.editButton')
            .preventDefault()
            .execute(action)
            .subscribe();
    }
}