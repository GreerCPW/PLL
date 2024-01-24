import { PllAppApi } from "../Api/PllAppApi";
import { DataGroupEntry } from "./DataGroupEntry";
import { CasePersonEntry } from "./CasePersonEntry";
import { RelatedDocumentEntry } from "./RelatedDocuments/RelatedDocumentEntry";

export class CaseEntry {
    private readonly _casePersonEntries: CasePersonEntry[] = [];
    private readonly _dataGroupEntries: DataGroupEntry[] = [];
    private readonly _relatedDocumentEntries: RelatedDocumentEntry[] = [];
    private _location: string;
    private _x: number;
    private _y: number;

    constructor(
        private readonly pllClient: PllAppApi,
        private readonly wipCaseDetail: IWipCaseDetailModel
    ) {
        this._casePersonEntries = wipCaseDetail.People.map(p => new CasePersonEntry(pllClient, p));
        this._dataGroupEntries = wipCaseDetail.DataGroups
            .filter(dg => dg.DataGroupDefinition.IsRegistered)
            .map(dg => new DataGroupEntry(pllClient, dg));
        this._relatedDocumentEntries = wipCaseDetail.RelatedDocuments.map(rd => new RelatedDocumentEntry(pllClient, rd));
        this._location = wipCaseDetail.Case.Location;
        this._x = wipCaseDetail.Case.X;
        this._y = wipCaseDetail.Case.Y;
    }

    get businessCaseDescription() { return this.wipCaseDetail.BusinessCase.Description; }

    get location() { return this._location; }

    get x() { return this._x; }

    get y() { return this._y; }

    getPrimaryPerson() {
        return this._casePersonEntries.find(p => p.isPrimary);
    }

    get personEntries() { return this._casePersonEntries; }

    private dataGroupIndex = -1;

    get dataGroupEntries() { return this._dataGroupEntries; }

    hasPreviousDataGroup() {
        return this.dataGroupIndex > 0;
    }

    previousDataGroup() {
        this.dataGroupIndex--;
        return this._dataGroupEntries[this.dataGroupIndex];
    }

    hasNextDataGroup() {
        return this.dataGroupIndex < this._dataGroupEntries.length - 1;
    }

    nextDataGroup() {
        this.dataGroupIndex++;
        return this._dataGroupEntries[this.dataGroupIndex];
    }

    lastDataGroup() {
        this.dataGroupIndex = this._dataGroupEntries.length - 1;
        return this._dataGroupEntries[this.dataGroupIndex];
    }

    get documentLabels() { return this.wipCaseDetail.DocumentLabels; }

    get relatedDocumentEntries() { return this._relatedDocumentEntries.filter(d => !d.isDeleted); }

    async addRelatedDocument(label: ICwDocumentLabelModel, file: File) {
        const relatedDocument = await this.pllClient.WipCase.AddRelatedDocument({
            CaseID: this.wipCaseDetail.Case.ID,
            CityworksLabelID: label.ID,
            File: file
        });
        this._relatedDocumentEntries.push(new RelatedDocumentEntry(this.pllClient, relatedDocument));
    }

    saveAddressCandidate(addressCandidate: IAddressCandidateModel) {
        this._location = addressCandidate.Address;
        this._x = addressCandidate.X;
        this._y = addressCandidate.Y;
        return this.pllClient.WipCase.SaveLocation({
            CaseID: this.wipCaseDetail.Case.ID,
            Location: this._location,
            X: addressCandidate.X,
            Y: addressCandidate.Y
        });
    }

    async saveMapLocation(latitude: number, longitude: number) {
        const updatedCase = await this.pllClient.WipCase.SaveMapLocation({
            CaseID: this.wipCaseDetail.Case.ID,
            Latitude: latitude,
            Longitude: longitude
        });
        this._location = updatedCase.Location;
        this._x = updatedCase.X;
        this._y = updatedCase.Y;
    }

    complete() {
        return this.pllClient.WipCase.CompleteCase(this.wipCaseDetail.Case.ID);
    }

    cancel() {
        return this.pllClient.WipCase.DeleteCase(this.wipCaseDetail.Case.ID);
    }
}