
export class CaseFees {
    readonly amount: number;
    readonly amountPaid: number;
    readonly amountDue: number;

    constructor(readonly caseID: number, readonly fees: ICaseFeeModel[]) {
        this.amount = fees.map(f => f.Amount).reduce((prev, curr) => prev + curr);
        this.amountPaid = fees.map(f => f.PaymentAmount).reduce((prev, curr) => prev + curr);
        this.amountDue = this.amount - this.amountPaid;
    }

    get feesWithAmount() { return this.fees.filter(f => f.Amount > 0); }
}