import { RawProcessFactory, ProcessManager } from '@theia/process/lib/node';
import { DebugAdapterExecutable, DebugAdapterSession, DebugAdapterSessionFactory, DebugAdapterFactory, DebugAdapter } from '../common/debug-model';
/**
 * [DebugAdapterFactory](#DebugAdapterFactory) implementation based on
 * launching the debug adapter as separate process.
 */
export declare class LaunchBasedDebugAdapterFactory implements DebugAdapterFactory {
    protected readonly processFactory: RawProcessFactory;
    protected readonly processManager: ProcessManager;
    start(executable: DebugAdapterExecutable): DebugAdapter;
    private childProcess;
    connect(debugServerPort: number): DebugAdapter;
}
/**
 * [DebugAdapterSessionFactory](#DebugAdapterSessionFactory) implementation.
 */
export declare class DebugAdapterSessionFactoryImpl implements DebugAdapterSessionFactory {
    get(sessionId: string, debugAdapter: DebugAdapter): DebugAdapterSession;
}
//# sourceMappingURL=debug-adapter-factory.d.ts.map