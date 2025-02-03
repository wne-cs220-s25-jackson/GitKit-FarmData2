import { Disposable } from '../../../../../../base/common/lifecycle.js';
import { IObservable } from '../../../../../../base/common/observable.js';
import { IInstantiationService } from '../../../../../../platform/instantiation/common/instantiation.js';
import { ICodeEditor } from '../../../../../browser/editorBrowser.js';
import { IDiffProviderFactoryService } from '../../../../../browser/widget/diffEditor/diffProviderFactoryService.js';
import { SingleLineEdit } from '../../../../../common/core/lineEdit.js';
import { TextEdit, AbstractText } from '../../../../../common/core/textEdit.js';
import { Command } from '../../../../../common/languages.js';
import { IModelService } from '../../../../../common/services/model.js';
import { InlineCompletionsModel } from '../../model/inlineCompletionsModel.js';
import { InlineEdit } from '../../model/inlineEdit.js';
import { InlineCompletionItem } from '../../model/provideInlineCompletions.js';
export declare class InlineEditsViewAndDiffProducer extends Disposable {
    private readonly _editor;
    private readonly _edit;
    private readonly _model;
    private readonly _instantiationService;
    private readonly _diffProviderFactoryService;
    private readonly _modelService;
    static readonly hot: IObservable<typeof InlineEditsViewAndDiffProducer, unknown>;
    private readonly _modelUriGenerator;
    private readonly _originalModel;
    private readonly _modifiedModel;
    private readonly _differ;
    private readonly _inlineEditPromise;
    private readonly _inlineEdit;
    constructor(_editor: ICodeEditor, _edit: IObservable<InlineEdit | undefined>, _model: IObservable<InlineCompletionsModel | undefined>, _instantiationService: IInstantiationService, _diffProviderFactoryService: IDiffProviderFactoryService, _modelService: IModelService);
}
export declare class InlineEditWithChanges {
    readonly originalText: AbstractText;
    readonly edit: TextEdit;
    readonly isCollapsed: boolean;
    readonly userJumpedToIt: boolean;
    readonly commands: readonly Command[];
    readonly inlineCompletion: InlineCompletionItem;
    readonly lineEdit: SingleLineEdit;
    readonly originalLineRange: import("../../../../../common/core/lineRange.js").LineRange;
    readonly modifiedLineRange: import("../../../../../common/core/lineRange.js").LineRange;
    constructor(originalText: AbstractText, edit: TextEdit, isCollapsed: boolean, userJumpedToIt: boolean, commands: readonly Command[], inlineCompletion: InlineCompletionItem);
    equals(other: InlineEditWithChanges): boolean;
}
