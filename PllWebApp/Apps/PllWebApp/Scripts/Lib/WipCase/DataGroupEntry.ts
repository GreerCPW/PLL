import { PllAppApi } from "../Api/PllAppApi";
import { DataGroupDetailEntry } from "./DataGroupDetailEntry";

export class DataGroupEntry {
    private readonly _detailEntries: DataGroupDetailEntry[] = [];

    constructor(private readonly pllClient: PllAppApi, private readonly dataGroup: ICustomerCaseDataGroupModel) {
        for (const detail of dataGroup.Details) {
            this._detailEntries.push(
                new DataGroupDetailEntry(detail)
            );
        }
    }

    get description() { return this.dataGroup.DataGroupDefinition.Description; }

    get detailEntries() { return this._detailEntries; }

    get isVisible() { return this.dataGroup.DataGroupDefinition.IsRegistered; }

    save() {
        const saveRequests = this._detailEntries.map(d => d.getSaveRequest());
        return this.pllClient.WipCase.SaveDataGroup({
            Details: saveRequests
        });
    }
}