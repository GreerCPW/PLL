import { Awaitable } from "@jasonbenfield/sharedwebapp/Awaitable";
import { Command } from "@jasonbenfield/sharedwebapp/Components/Command";
import { ListGroup } from "@jasonbenfield/sharedwebapp/Components/ListGroup";
import { CaseEntry } from "./CaseEntry";
import { CasePersonEntry } from "./CasePersonEntry";
import { PersonEntryListItem } from "./PersonEntryListItem";
import { PersonEntryListItemView } from "./PersonEntryListItemView";
import { PersonEntryListPanelView } from "./PersonEntryListPanelView";

interface IResult {
    back?: boolean;
    cancelCaseRequested?: boolean;
    next?: boolean;
    editPersonRequested?: { personEntry: CasePersonEntry };
}

class Result {
    static back() {
        return new Result({ back: true });
    }

    static cancelCaseRequested() {
        return new Result({ cancelCaseRequested: true });
    }

    static next() {
        return new Result({ next: true });
    }

    static editPersonRequested(personEntry: CasePersonEntry) {
        return new Result({ editPersonRequested: { personEntry: personEntry } });
    }

    private constructor(private readonly results: IResult) { }

    get back() { return this.results.back; }

    get cancelCaseRequested() { return this.results.cancelCaseRequested; }

    get next() { return this.results.next; }

    get editPersonRequested() { return this.results.editPersonRequested; }
}

export class PersonEntryListPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly personEntryListGroup: ListGroup<PersonEntryListItem, PersonEntryListItemView>;
    private caseEntry: CaseEntry;

    constructor(private readonly view: PersonEntryListPanelView) {
        this.personEntryListGroup = new ListGroup(view.personEntryListView);
        view.handlePersonEntryEditClicked(this.onPersonEntryEditClicked.bind(this));
        new Command(this.back.bind(this)).add(view.backButton);
        new Command(this.cancelCase.bind(this)).add(view.cancelCaseButton);
        new Command(this.next.bind(this)).add(view.nextButton);
    }

    private back() { this.awaitable.resolve(Result.back()); }

    private cancelCase() { this.awaitable.resolve(Result.cancelCaseRequested()); }

    private next() { this.awaitable.resolve(Result.next()); }

    private onPersonEntryEditClicked(el: HTMLElement) {
        const personEntryListItem = this.personEntryListGroup.getItemByElement(el);
        this.awaitable.resolve(Result.editPersonRequested(personEntryListItem.personEntry));
    }

    setCaseEntry(caseEntry: CaseEntry) {
        this.caseEntry = caseEntry;
        this.personEntryListGroup.setItems(
            this.caseEntry.personEntries,
            (p, itemView) => new PersonEntryListItem(p, itemView, true)
        );
    }

    start() {
        for (const personListItem of this.personEntryListGroup.getItems()) {
            personListItem.refresh();
        }
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }

}