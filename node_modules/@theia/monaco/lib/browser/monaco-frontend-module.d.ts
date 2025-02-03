import '../../src/browser/style/index.css';
import { ContainerModule, interfaces } from '@theia/core/shared/inversify';
import { IConfigurationService } from '@theia/monaco-editor-core/esm/vs/platform/configuration/common/configuration.js';
declare const _default: ContainerModule;
export default _default;
export declare const MonacoConfigurationService: unique symbol;
export declare function createMonacoConfigurationService(container: interfaces.Container): IConfigurationService;
//# sourceMappingURL=monaco-frontend-module.d.ts.map