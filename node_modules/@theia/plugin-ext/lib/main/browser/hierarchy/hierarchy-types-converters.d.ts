import { CallHierarchyIncomingCall, CallHierarchyItem, CallHierarchyOutgoingCall } from '@theia/callhierarchy/lib/browser';
import * as languageProtocol from '@theia/core/shared/vscode-languageserver-protocol';
import { TypeHierarchyItem } from '@theia/typehierarchy/lib/browser';
import * as rpc from '../../../common/plugin-api-rpc';
import * as model from '../../../common/plugin-api-rpc-model';
import { UriComponents } from '../../../common/uri-components';
export declare function toUriComponents(uri: string): UriComponents;
export declare function fromUriComponents(uri: UriComponents): string;
export declare function fromLocation(location: languageProtocol.Location): model.Location;
export declare function toLocation(uri: UriComponents, range: model.Range): languageProtocol.Location;
export declare function fromPosition(position: languageProtocol.Position): rpc.Position;
export declare function fromRange(range: languageProtocol.Range): model.Range;
export declare function toRange(range: model.Range): languageProtocol.Range;
export declare namespace SymbolKindConverter {
    function fromSymbolKind(kind: languageProtocol.SymbolKind): model.SymbolKind;
    function toSymbolKind(kind: model.SymbolKind): languageProtocol.SymbolKind;
}
export declare function toItemHierarchyDefinition(modelItem: model.HierarchyItem): TypeHierarchyItem | CallHierarchyItem;
export declare function fromItemHierarchyDefinition(definition: TypeHierarchyItem | CallHierarchyItem): model.HierarchyItem;
export declare function toCaller(caller: model.CallHierarchyIncomingCall): CallHierarchyIncomingCall;
export declare function fromCaller(caller: CallHierarchyIncomingCall): model.CallHierarchyIncomingCall;
export declare function toCallee(callee: model.CallHierarchyOutgoingCall): CallHierarchyOutgoingCall;
export declare function fromCallHierarchyCallerToModelCallHierarchyIncomingCall(caller: CallHierarchyIncomingCall): model.CallHierarchyIncomingCall;
export declare function fromCallHierarchyCalleeToModelCallHierarchyOutgoingCall(callee: CallHierarchyOutgoingCall): model.CallHierarchyOutgoingCall;
//# sourceMappingURL=hierarchy-types-converters.d.ts.map