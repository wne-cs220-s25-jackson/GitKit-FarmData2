import { KeyboardLayoutChangeNotifier, NativeKeyboardLayout } from '../../common/keyboard/keyboard-layout-provider';
import { Emitter, Event } from '../../common/event';
/**
 * Keyboard layout changes are detected by the native-keymap package. This must happen in the
 * main process of Electron. The events are sent to the renderer process using Electron IPC.
 */
export declare class ElectronKeyboardLayoutChangeNotifier implements KeyboardLayoutChangeNotifier {
    protected readonly nativeLayoutChanged: Emitter<NativeKeyboardLayout>;
    get onDidChangeNativeLayout(): Event<NativeKeyboardLayout>;
    protected init(): void;
}
//# sourceMappingURL=electron-keyboard-layout-change-notifier.d.ts.map