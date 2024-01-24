import { PllAppApi } from "../../../Lib/Api/PllAppApi";

export class RelatedDocumentEntry {
    private _isDeleted = false;

    constructor(private readonly pllClient: PllAppApi, private readonly relatedDocument: IWipCaseRelatedDocumentModel) {
    }

    get thumbnail() { return this.relatedDocument.Thumbnail; }

    get contentType() { return this.relatedDocument.ContentType; }

    get labelID() { return this.relatedDocument.DocumentLabel.ID; }

    get labelText() { return this.relatedDocument.DocumentLabel.LabelText; }

    get fileName() { return this.relatedDocument.FileName; }

    get isDeleted() { return this._isDeleted; }

    async updateLabel(label: ICwDocumentLabelModel) {
        await this.pllClient.WipCase.EditRelatedDocument({
            RelatedDocumentID: this.relatedDocument.ID,
            CityworksLabelID: label.ID
        });
        this.relatedDocument.DocumentLabel = label;
    }

    async deleteDocument() {
        await this.pllClient.WipCase.DeleteRelatedDocument(this.relatedDocument.ID);
        this._isDeleted = true;
    }

    downloadDocument() {
        this.pllClient.WipCase.DownloadRelatedDocument.openWindow(this.relatedDocument.ID);
    }
}