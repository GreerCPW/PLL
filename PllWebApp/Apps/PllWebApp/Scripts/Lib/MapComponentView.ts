import { CalciteShellView } from "@greercpw/giswebapp/Map/Views/CalciteShellView";
import { BasicComponentView } from "@jasonbenfield/sharedwebapp/Views/BasicComponentView";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";

export class MapComponentView extends BlockView {
    readonly shellView: CalciteShellView;

    constructor(container: BasicComponentView) {
        super(container);
        this.positionAbsoluteFill();
        const body = this.addView(BlockView);
        body.positionRelative();
        body.height100();
        body.addCssName('d-flex');
        this.shellView = body.addView(CalciteShellView);
    }
}