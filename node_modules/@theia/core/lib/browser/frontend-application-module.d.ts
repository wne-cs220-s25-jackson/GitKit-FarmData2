import '../../src/browser/style/index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'file-icons-js/css/style.css';
import '@vscode/codicons/dist/codicon.css';
import { ContainerModule } from 'inversify';
import { bindResourceProvider, bindMessageService, bindPreferenceService } from './frontend-application-bindings';
export { bindResourceProvider, bindMessageService, bindPreferenceService };
export declare const frontendApplicationModule: ContainerModule;
//# sourceMappingURL=frontend-application-module.d.ts.map