import { SingleActivePanel } from '@jasonbenfield/sharedwebapp/Panel/SingleActivePanel';
import { Url } from '@jasonbenfield/sharedwebapp/Url';
import { CasePanel } from '../Case/CasePanel';
import { PllPage } from '../PllPage';
import { MainPageView } from './MainPageView';

class MainPage extends PllPage {
    private readonly panels: SingleActivePanel;
    private readonly casePanel: CasePanel;

    constructor(protected readonly view: MainPageView) {
        super(view);
        const caseIDText = Url.current().getQueryValue('CaseID');
        const caseID = caseIDText ? Number(caseIDText) : 0;
        if (caseID) {
            this.panels = new SingleActivePanel();
            this.casePanel = this.panels.add(
                new CasePanel(this.defaultApi, view.casePanelView)
            );
            this.activateCasePanel();
            this.casePanel.setCaseID(caseID);
            this.casePanel.refresh();
            this.activateCasePanel();
        }
        else {
            this.defaultApi.Home.Index.open({});
        }
    }

    private async activateCasePanel() {
        this.panels.activate(this.casePanel);
        const result = await this.casePanel.start();
        if (result.menuRequested) {

        }
    }
}
new MainPage(new MainPageView());