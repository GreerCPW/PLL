import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { FormGroupView } from "@jasonbenfield/sharedwebapp/Views/FormGroup";

export class DataGroupDetailEntryView extends FormGroupView {
    constructor(container: BasicComponentView) {
        super(container);
        this.captionCell.setTextCss(new TextCss().start().bold());
    }
}