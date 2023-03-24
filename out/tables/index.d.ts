export interface IConvTableEntry {
    hex: string;
    ebcdic: string;
    ascii: string;
}
export type ConvTableName = "0037" | "0273" | "0278" | "1047";
export declare const convTables: Record<ConvTableName, IConvTableEntry[]>;
