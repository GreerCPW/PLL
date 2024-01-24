import { TextComponent } from '@jasonbenfield/sharedwebapp/Components/TextComponent';
import { PllPage } from '../PllPage';
import { MainPageView } from './MainPageView';

class MainPage extends PllPage {
    protected readonly view: MainPageView;

    constructor() {
        super(new MainPageView());
        new TextComponent(this.view.heading).setText('Home Page');
    }
}
new MainPage();