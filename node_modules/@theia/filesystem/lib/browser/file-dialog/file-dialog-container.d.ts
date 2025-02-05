import { interfaces, Container } from '@theia/core/shared/inversify';
import { OpenFileDialogProps, SaveFileDialogProps } from './file-dialog';
export declare function createFileDialogContainer(parent: interfaces.Container): Container;
export declare function createOpenFileDialogContainer(parent: interfaces.Container, props: OpenFileDialogProps): Container;
export declare function createSaveFileDialogContainer(parent: interfaces.Container, props: SaveFileDialogProps): Container;
//# sourceMappingURL=file-dialog-container.d.ts.map