import { CasePanelView } from './CasePanelView';
import { PllPageView } from '../PllPageView';

export class MainPageView extends PllPageView {
    readonly casePanelView: CasePanelView;

    constructor() {
        super();
        this.casePanelView = this.addView(CasePanelView);
    }
}