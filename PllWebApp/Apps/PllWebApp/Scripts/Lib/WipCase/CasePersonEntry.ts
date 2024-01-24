import { PllAppApi } from "../../Lib/Api/PllAppApi";

export class CasePersonEntry {
    constructor(private readonly pllClient: PllAppApi, private readonly casePerson: IWipCasePersonModel) {
    }

    get isPrimary() { return this.casePerson.Role.Code === 'PRIMARY'; }

    get roleDescription() { return this.casePerson.Role.Description; }

    get isNameRequired() { return this.casePerson.Role.RequiredFields.includes('name'); }

    get person() { return this.casePerson.Person; }

    get isCellPhoneRequired() { return this.casePerson.Role.RequiredFields.includes('cell_phone'); }

    get isEmailRequired() { return this.casePerson.Role.RequiredFields.includes('email'); }

    get isNobody() { return this.casePerson.Person.PersonKey === 'NOBODY'; }

    async save(personID: number) {
        this.casePerson.Person = await this.pllClient.WipCase.SaveCasePerson({
            CasePersonID: this.casePerson.ID,
            PersonID: personID
        });
    }

    async saveNew(personName: string, cellPhone: string, email: string) {
        this.casePerson.Person = await this.pllClient.WipCase.SaveNewPerson({
            CasePersonID: this.casePerson.ID,
            PersonName: personName,
            CellPhone: cellPhone,
            Email: email
        });
    }

    async reset() {
        this.casePerson.Person = await this.pllClient.WipCase.ResetCasePerson(this.casePerson.ID);
    }

    async saveExisting(personID: number, personName: string, cellPhone: string, email: string) {
        this.casePerson.Person = await this.pllClient.WipCase.EditPerson({
            PersonID: personID,
            PersonName: personName,
            CellPhone: cellPhone,
            Email: email
        });
    }
}