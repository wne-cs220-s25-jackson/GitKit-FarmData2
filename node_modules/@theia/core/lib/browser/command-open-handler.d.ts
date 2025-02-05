import { CommandService } from '../common/command';
import URI from '../common/uri';
import { OpenHandler } from './opener-service';
export declare class CommandOpenHandler implements OpenHandler {
    readonly id = "command";
    protected readonly commands: CommandService;
    canHandle(uri: URI): number;
    open(uri: URI): Promise<boolean>;
}
//# sourceMappingURL=command-open-handler.d.ts.map