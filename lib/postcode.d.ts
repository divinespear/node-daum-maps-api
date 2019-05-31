import { DaumLibraryLoader } from '.';
export declare class DaumPostcode implements DaumLibraryLoader {
    private readonly options?;
    constructor(options?: Partial<PostcodeOptions & ((size: ResizeData) => void)> | undefined);
    readonly hasLoader: boolean;
    readonly loaded: boolean;
    loadlib(): Promise<void>;
    open(options?: Partial<PostcodePopupOptions>): Promise<PostcodeData>;
    embed(container: HTMLElement, options?: Partial<PostcodeEmbedOptions>): Promise<PostcodeData>;
}
export interface PostcodeData {
    readonly zonecode: string;
    readonly address: string;
    readonly addressEnglish: string;
    readonly addressType: 'R' | 'J';
    readonly userSelectedType: 'R' | 'J';
    readonly noSelected: 'Y' | 'N';
    readonly userLanguageType: 'K' | 'E';
    readonly roadAddress: string;
    readonly roadAddressEnglish: string;
    readonly jibunAddress: string;
    readonly jibunAddressEnglish: string;
    readonly autoRoadAddress: string;
    readonly autoRoadAddressEnglish: string;
    readonly autoJibunAddress: string;
    readonly autoJibunAddressEnglish: string;
    readonly buildingCode: string;
    readonly buildingName: string;
    readonly apartment: 'Y' | 'N';
    readonly sido: string;
    readonly sigungu: string;
    readonly sigunguCode: string;
    readonly roadnameCode: string;
    readonly bcode: string;
    readonly roadname: string;
    readonly bname: string;
    readonly bname1: string;
    readonly bname2: string;
    readonly hname: string;
    readonly query: string;
}
export interface PostcodeOptions {
    readonly width: number;
    readonly height: number;
    readonly animation: boolean;
    readonly autoMapping: boolean;
    readonly shorthand: boolean;
    readonly pleaseReadGuide: number;
    readonly pleaseReadGuideTimer: number;
    readonly maxSuggestItems: number;
    readonly showMoreHName: boolean;
    readonly hideMapBtn: boolean;
    readonly hideEngBtn: boolean;
    readonly alwaysShowEngAddr: boolean;
    readonly zonecodeOnly: boolean;
    readonly theme: Partial<PostcodeThemeOptions>;
}
export interface PostcodeThemeOptions {
    readonly bgColor: string;
    readonly searchBgColor: string;
    readonly contentBgColor: string;
    readonly pageBgColor: string;
    readonly textColor: string;
    readonly queryTextColor: string;
    readonly postcodeTextColor: string;
    readonly emphTextColor: string;
    readonly outlineColor: string;
}
interface ResizeData {
    readonly width: number;
    readonly height: number;
}
declare type CloseState = 'FORCE_CLOSE' | 'COMPLETE_CLOSE';
export interface PostcodeEvents {
    oncomplete(data: PostcodeData): void;
    onresize(size: ResizeData): void;
    onclose(state: CloseState): void;
}
export interface PostcodeEmbedOptions {
    readonly q: string;
    readonly autoClose: boolean;
}
export interface PostcodePopupOptions extends PostcodeEmbedOptions {
    readonly left: number;
    readonly top: number;
    readonly popupName: string;
}
interface Postcode {
    open(options?: Partial<PostcodePopupOptions>): void;
    embed(container: HTMLElement, options?: Partial<PostcodeEmbedOptions>): void;
}
interface PostcodeConstructor {
    prototype: DaumPostcode;
    new (options?: Partial<PostcodeOptions & PostcodeEvents>): Postcode;
}
declare global {
    interface DaumNamespace {
        readonly postcode: DaumScriptLoader;
        readonly Postcode: PostcodeConstructor;
    }
}
export {};
