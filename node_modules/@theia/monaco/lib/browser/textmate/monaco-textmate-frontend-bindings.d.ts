import { interfaces } from '@theia/core/shared/inversify';
import { OnigScanner, OnigString } from 'vscode-oniguruma';
import { IOnigLib } from 'vscode-textmate';
export declare class OnigasmLib implements IOnigLib {
    createOnigScanner(sources: string[]): OnigScanner;
    createOnigString(sources: string): OnigString;
}
declare const _default: (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => void;
export default _default;
export declare function createOnigasmLib(): Promise<IOnigLib>;
export declare function fetchOnigasm(): Promise<ArrayBuffer>;
//# sourceMappingURL=monaco-textmate-frontend-bindings.d.ts.map