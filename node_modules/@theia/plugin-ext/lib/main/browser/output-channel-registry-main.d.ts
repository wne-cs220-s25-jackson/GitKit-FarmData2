import { CommandService } from '@theia/core/lib/common/command';
import { OutputChannelRegistryMain, PluginInfo } from '../../common/plugin-api-rpc';
export declare class OutputChannelRegistryMainImpl implements OutputChannelRegistryMain {
    protected readonly commandService: CommandService;
    $append(name: string, text: string, pluginInfo: PluginInfo): PromiseLike<void>;
    $clear(name: string): PromiseLike<void>;
    $dispose(name: string): PromiseLike<void>;
    $reveal(name: string, preserveFocus: boolean): Promise<void>;
    $close(name: string): PromiseLike<void>;
}
//# sourceMappingURL=output-channel-registry-main.d.ts.map