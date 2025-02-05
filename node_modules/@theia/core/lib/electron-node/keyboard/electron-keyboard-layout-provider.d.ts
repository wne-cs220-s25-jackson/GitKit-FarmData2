import { KeyboardLayoutProvider, NativeKeyboardLayout } from '../../common/keyboard/keyboard-layout-provider';
export declare class ElectronKeyboardLayoutProvider implements KeyboardLayoutProvider {
    getNativeLayout(): Promise<NativeKeyboardLayout>;
    protected getNativeLayoutSync(): NativeKeyboardLayout;
}
//# sourceMappingURL=electron-keyboard-layout-provider.d.ts.map