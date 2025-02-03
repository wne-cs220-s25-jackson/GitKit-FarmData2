import { BinaryBuffer } from '@theia/core/lib/common/buffer';
export interface IFullSemanticTokensDto {
    id: number;
    type: 'full';
    data: Uint32Array;
}
export interface IDeltaSemanticTokensDto {
    id: number;
    type: 'delta';
    deltas: {
        start: number;
        deleteCount: number;
        data?: Uint32Array;
    }[];
}
export type ISemanticTokensDto = IFullSemanticTokensDto | IDeltaSemanticTokensDto;
export declare function encodeSemanticTokensDto(semanticTokens: ISemanticTokensDto): BinaryBuffer;
export declare function decodeSemanticTokensDto(_buff: BinaryBuffer): ISemanticTokensDto;
//# sourceMappingURL=semantic-tokens-dto.d.ts.map