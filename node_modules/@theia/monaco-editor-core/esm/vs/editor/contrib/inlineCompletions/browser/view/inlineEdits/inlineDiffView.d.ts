import { Disposable } from '../../../../../../base/common/lifecycle.js';
import { IObservable } from '../../../../../../base/common/observable.js';
import { ICodeEditor } from '../../../../../browser/editorBrowser.js';
import { AbstractText } from '../../../../../common/core/textEdit.js';
import { DetailedLineRangeMapping } from '../../../../../common/diff/rangeMapping.js';
import { ITextModel } from '../../../../../common/model.js';
export interface IOriginalEditorInlineDiffViewState {
    diff: DetailedLineRangeMapping[];
    modifiedText: AbstractText;
    mode: 'mixedLines' | 'interleavedLines' | 'sideBySide';
    modifiedCodeEditor: ICodeEditor;
}
export declare class OriginalEditorInlineDiffView extends Disposable {
    private readonly _originalEditor;
    private readonly _state;
    private readonly _modifiedTextModel;
    static supportsInlineDiffRendering(mapping: DetailedLineRangeMapping): boolean;
    constructor(_originalEditor: ICodeEditor, _state: IObservable<IOriginalEditorInlineDiffViewState | undefined>, _modifiedTextModel: ITextModel);
    private readonly _decorations;
}
