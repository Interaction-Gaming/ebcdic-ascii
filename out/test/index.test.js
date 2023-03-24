"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require("../"));
var ebcdicTestStringEN = "818283848586878889919293949596979899A2A3A4A5A6A7A8A9C1C2C3C4C5C6C7C8C9D1D2D3D4D5D6D7D8D9E2E3E4E5E6E7E8E9F0F1F2F3F4F5F6F7F8F9";
var ebcdicTestStringDE = "818283848586878889919293949596979899A2A3A4A5A6A7A8A9C1C2C3C4C5C6C7C8C9D1D2D3D4D5D6D7D8D9E2E3E4E5E6E7E8E9F0F1F2F3F4F5F6F7F8F96AD0C0E04A5AA1";
var ebcdicTestStringFI_SE = "818283848586878889919293949596979899A2A3A4A5A6A7A8A9C1C2C3C4C5C6C7C8C9D1D2D3D4D5D6D7D8D9E2E3E4E5E6E7E8E9F0F1F2F3F4F5F6F7F8F9D0C06A5B7B7C";
var ebcdicTestStringLatin = "42434445464748494A4B4C4D4E4F505152535455565758595A5B5C5D5E5F606162636465666768696A6B6C6D6E6F707172737475767778797A7B7C7D7E7F808182838485868788898A8B8C8D8E8F909192939495969798999C9D9E9FA0A1A2A3A4A5A6A7A8A9AAABACADAEAFB0B1B2B3B4B5B6B7B8B9BABBBCBDBEBFC0C1C2C3C4C5C6C7C8C9CBCCCDCECFD0D1D2D3D4D5D6D7D8D9DADBDCDDDEDFE0E1E2E3E4E5E6E7E8E9EAEBECEDEEEFF0F1F2F3F4F5F6F7F8F9FAFBFCFDFE40";
describe("ebcdic-ascii", function () {
    describe("toASCII", function () {
        it("should resolve an english ebcdic string", function () {
            var converter = new __1.default("0037");
            var ascii = converter.toASCII(ebcdicTestStringEN);
            expect(ascii).toEqual("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
        });
        it("should resolve a german ebcdic string", function () {
            var converter = new __1.default("0273");
            var ascii = converter.toASCII(ebcdicTestStringDE);
            expect(ascii).toEqual("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789öüäÖÄÜß");
        });
        it("should resolve a finnish/swedish ebcdic string", function () {
            var converter = new __1.default("0278");
            var ascii = converter.toASCII(ebcdicTestStringFI_SE);
            expect(ascii).toEqual("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789åäöÅÄÖ");
        });
        it("should resolve a latin ebcdic string", function () {
            var converter = new __1.default("1047");
            var ascii = converter.toASCII(ebcdicTestStringLatin);
            expect(ascii).toEqual("âäàáãåçñ¢.<(+|&éêëèíîïìß!$*);^-/ÂÄÀÁÃÅÇÑ¦,%_>?øÉÊËÈÍÎÏÌ`:#@'=\"Øabcdefghi«»ðýþ±°jklmnopqræ¸Æ¤µ~stuvwxyz¡¿Ð[Þ®¬£¥·©§¶¼½¾Ý¨¯]´×{ABCDEFGHIôöòóõ}JKLMNOPQR¹ûüùúÿ\\÷STUVWXYZ²ÔÖÒÓÕ0123456789³ÛÜÙÚ ");
        });
    });
    describe("toEBCDIC", function () {
        it("should convert english ASCII to EBCDIC and back", function () {
            var converter = new __1.default("0037");
            var expectedString = "English Test String!§$&/()=?";
            var ebcdic = converter.toEBCDIC(Buffer.from(expectedString, "ascii").toString("hex"));
            var ascii = converter.toASCII(ebcdic);
            expect(ascii).toEqual(expectedString);
        });
        it("should convert german ASCII to EBCDIC and back", function () {
            var converter = new __1.default("0273");
            var expectedString = "ÖÄÜ öäü Test ßtring";
            var ebcdic = converter.toEBCDIC(Buffer.from(expectedString, "ascii").toString("hex"));
            var ascii = converter.toASCII(ebcdic);
            expect(ascii).toEqual(expectedString);
        });
        it("should convert finnish/swedish ASCII to EBCDIC and back", function () {
            var converter = new __1.default("0278");
            var expectedString = "ÖÄÅ öäå Test String !@#¤%&/()[]{}^'*_-:.;,";
            var ebcdic = converter.toEBCDIC(Buffer.from(expectedString, "ascii").toString("hex"));
            var ascii = converter.toASCII(ebcdic);
            expect(ascii).toEqual(expectedString);
        });
        it("should convert latin to EBCDIC and back", function () {
            var converter = new __1.default("1047");
            var expectedString = "âãáàêéèîíìôõóòúùü ç Test String !@#¤%&/()[]{}^'*_-:.;,";
            var ebcdic = converter.toEBCDIC(Buffer.from(expectedString, "ascii").toString("hex"));
            var ascii = converter.toASCII(ebcdic);
            expect(ascii).toEqual(expectedString);
        });
    });
    describe("toISO", function () {
        it("should convert english EBCDIC to ISO and back", function () {
            var converter = new __1.default("0037");
            var isoHex = converter.toISO(ebcdicTestStringEN);
            var ebcdic = converter.toEBCDIC(isoHex.toString("hex"));
            expect(ebcdic).toEqual(ebcdicTestStringEN);
        });
        it("should convert german EBCDIC to ISO and back", function () {
            var converter = new __1.default("0273");
            var isoHex = converter.toISO(ebcdicTestStringDE);
            var ebcdic = converter.toEBCDIC(isoHex.toString("hex"));
            expect(ebcdic).toEqual(ebcdicTestStringDE);
        });
        it("should convert finnish/swedish EBCDIC to ISO and back", function () {
            var converter = new __1.default("0278");
            var isoHex = converter.toISO(ebcdicTestStringFI_SE);
            var ebcdic = converter.toEBCDIC(isoHex.toString("hex"));
            expect(ebcdic).toEqual(ebcdicTestStringFI_SE);
        });
        it("should convert latin EBCDIC to ISO and back", function () {
            var converter = new __1.default("1047");
            var isoHex = converter.toISO(ebcdicTestStringLatin);
            var ebcdic = converter.toEBCDIC(isoHex.toString("hex"));
            expect(ebcdic).toEqual(ebcdicTestStringLatin);
        });
    });
});
