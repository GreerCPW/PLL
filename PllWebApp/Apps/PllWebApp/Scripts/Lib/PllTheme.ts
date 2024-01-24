import { ButtonCommandView } from "@jasonbenfield/sharedwebapp/Views/Command";
import { ContextualClass } from "@jasonbenfield/sharedwebapp/ContextualClass";
import { ToolbarView } from "@jasonbenfield/sharedwebapp/Views/ToolbarView";
import { PaddingCss } from "@jasonbenfield/sharedwebapp/PaddingCss";
import { TextCss } from "@jasonbenfield/sharedwebapp/TextCss";
import { GridCellView } from "@jasonbenfield/sharedwebapp/Views/Grid";
import { BlockView } from "@jasonbenfield/sharedwebapp/Views/BlockView";

export class PllTheme {
    public static readonly instance = new PllTheme();

    mainContent(cell: GridCellView) {
        return cell
            .configure(c => c.positionRelative())
            .addView(BlockView)
            .configure(b => {
                b.positionAbsoluteFill();
                b.scrollable();
            })
            .addView(BlockView)
            .configure(b => {
                b.addCssName('container');
                b.setPadding(PaddingCss.top(3));
            });
    }

    readonly listItem = {
        deleteButton(button: ButtonCommandView) {
            return button
                .configure(b => {
                    b.icon.solidStyle('times');
                    b.icon.addCssFrom(new TextCss().context(ContextualClass.danger).cssClass());
                    b.useOutlineStyle(ContextualClass.secondary);
                    b.setText('');
                    b.setTitle('Delete');
                });
        }
    }

    readonly cardHeader = {
        editButton(button: ButtonCommandView) {
            return button
                .configure(b => {
                    b.icon.solidStyle('edit');
                    b.useOutlineStyle(ContextualClass.primary);
                    b.setText('Edit');
                    b.setTitle('Edit');
                });
        },
        addButton(button: ButtonCommandView) {
            return button
                .configure(b => {
                    b.icon.solidStyle('plus');
                    b.useOutlineStyle(ContextualClass.primary);
                    b.setText('Add');
                    b.setTitle('Add');
                });
        }
    }

    buttonContainer(buttonContainer: BlockView) {
        buttonContainer.addCssName('d-grid');
        buttonContainer.addCssName('gap-3');
        buttonContainer.addCssName('col-6');
        return buttonContainer;
    }

    readonly commandToolbar = {
        toolbar(toolbar: ToolbarView) {
            return toolbar
                .configure(t => {
                    t.setBackgroundContext(ContextualClass.secondary);
                    t.addCssName('bg-opacity-25');
                    t.setPadding(PaddingCss.xs(3));
                });
        },
        backButton(button: ButtonCommandView) {
            return button
                .configure(b => {
                    b.icon.solidStyle('caret-left');
                    b.setText('Back');
                    b.setTitle('Back');
                    b.setContext(ContextualClass.secondary);
                });
        },
        nextButton(button: ButtonCommandView) {
            return button
                .configure(b => {
                    b.icon.solidStyle('caret-right');
                    b.setText('Next');
                    b.setTitle('Next');
                    b.positionIconRight();
                    b.setContext(ContextualClass.secondary);
                });
        },
        addButton(button: ButtonCommandView) {
            return button
                .configure(b => {
                    b.icon.solidStyle('plus');
                    b.setText('Add');
                    b.setTitle('Add');
                    b.setContext(ContextualClass.secondary);
                });
        },
        cancelButton(button: ButtonCommandView) {
            return button
                .configure(b => {
                    b.icon.solidStyle('times');
                    b.setText('Cancel');
                    b.setTitle('Cancel');
                    b.setContext(ContextualClass.danger);
                });
        },
        cancelCaseButton(button: ButtonCommandView) {
            return button
                .configure(b => {
                    b.icon.solidStyle('times');
                    b.setText('Cancel Application');
                    b.setTitle('Cancel Application');
                    b.setContext(ContextualClass.danger);
                });
        },
        saveButton(button: ButtonCommandView) {
            return button
                .configure(b => {
                    b.icon.solidStyle('check');
                    b.setText('Save');
                    b.setTitle('Save');
                    b.setContext(ContextualClass.primary);
                });
        }
    };
}