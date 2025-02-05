import { OpenerService, Widget } from '@theia/core/lib/browser';
import { KeybindingRegistry, ScopedKeybinding } from '@theia/core/lib/browser/keybinding';
import { Keybinding } from '@theia/core/lib/common/keybinding';
import { Emitter } from '@theia/core/lib/common/event';
import { MonacoTextModelService } from '@theia/monaco/lib/browser/monaco-text-model-service';
import { MonacoEditorModel } from '@theia/monaco/lib/browser/monaco-editor-model';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { MonacoWorkspace } from '@theia/monaco/lib/browser/monaco-workspace';
import { MessageService } from '@theia/core/lib/common/message-service';
import { MonacoJSONCEditor } from '@theia/preferences/lib/browser/monaco-jsonc-editor';
export declare class KeymapsService {
    protected readonly workspace: MonacoWorkspace;
    protected readonly textModelService: MonacoTextModelService;
    protected readonly keybindingRegistry: KeybindingRegistry;
    protected readonly opener: OpenerService;
    protected readonly messageService: MessageService;
    protected readonly jsoncEditor: MonacoJSONCEditor;
    protected readonly changeKeymapEmitter: Emitter<void>;
    readonly onDidChangeKeymaps: import("@theia/core/lib/common/event").Event<void>;
    protected model: MonacoEditorModel | undefined;
    protected readonly deferredModel: Deferred<MonacoEditorModel>;
    /**
     * Initialize the keybinding service.
     */
    protected init(): void;
    protected doInit(): Promise<void>;
    /**
     * Reconcile all the keybindings, registering them to the registry.
     */
    protected reconcile(): void;
    /**
     * Open the keybindings widget.
     * @param ref the optional reference for opening the widget.
     */
    open(ref?: Widget): Promise<void>;
    /**
     * Set the keybinding in the JSON.
     * @param newKeybinding the new JSON keybinding
     * @param oldKeybinding the old JSON keybinding
     */
    setKeybinding(newKeybinding: Keybinding, oldKeybinding: ScopedKeybinding | undefined): Promise<void>;
    /**
     * Unset the given keybinding in the JSON.
     * If the given keybinding has a default scope, it will be disabled in the JSON.
     * Otherwise, it will be removed from the JSON.
     * @param keybinding the keybinding to unset
     */
    unsetKeybinding(keybinding: ScopedKeybinding): Promise<void>;
    /**
     * Whether there is a keybinding with the given command id in the JSON.
     * @param commandId the keybinding command id
     */
    hasKeybinding(commandId: string): boolean;
    /**
     * Remove the keybindings with the given command id from the JSON.
     * This includes disabled keybindings.
     * @param commandId the keybinding command id.
     */
    removeKeybinding(commandId: string): Promise<void>;
    protected updateKeymap(op: () => Keybinding[] | void): Promise<void>;
}
//# sourceMappingURL=keymaps-service.d.ts.map