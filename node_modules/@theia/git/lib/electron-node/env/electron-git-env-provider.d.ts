import { DefaultGitEnvProvider } from '../../node/env/git-env-provider';
import { Askpass } from '../askpass/askpass';
/**
 * Git environment provider for Electron.
 *
 * This Git environment provider is customized for the Electron-based application. It sets the `GIT_ASKPASS` environment variable, to run
 * a custom script for the authentication.
 */
export declare class ElectronGitEnvProvider extends DefaultGitEnvProvider {
    protected readonly askpass: Askpass;
    protected _env: Object | undefined;
    protected init(): void;
    getEnv(): Promise<Object>;
}
//# sourceMappingURL=electron-git-env-provider.d.ts.map