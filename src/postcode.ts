import loadScriptOnce from 'load-script-once';
import { DaumLibraryLoader } from '.';

export class DaumPostcode implements DaumLibraryLoader {

  constructor(
    private readonly options?: Partial<PostcodeOptions & PostcodeEvents['onresize']>,
  ) { }

  get hasLoader() {
    const loader = window.daum && window.daum.postcode;
    return loader !== undefined && typeof loader === 'function';
  }

  get loaded() {
    const lib = window.daum && window.daum.Postcode;
    return lib !== undefined && typeof lib === 'function';
  }

  async loadlib() {
    // 로더 로드
    if (!this.hasLoader) {
      await loadScriptOnce('https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false');
    }
    // 스크립트 로드
    if (!this.loaded) {
      await new Promise((resolve) => {
        window.daum.postcode.load(resolve);
      });
    }
  }

  public async open(options?: Partial<PostcodePopupOptions>) {
    // 스크립트 로드 여부 확인
    await this.loadlib();
    // 팝업 오픈
    return new Promise<PostcodeData>((resolve) => {
      new window.daum.Postcode({
        ...this.options,
        oncomplete: resolve,
        onclose: (_) => resolve(),
      }).open(options);
    });
  }

  public async embed(container: HTMLElement, options?: Partial<PostcodeEmbedOptions>) {
    // 스크립트 로드 여부 확인
    await this.loadlib();
    // 팝업 오픈
    return new Promise<PostcodeData>((resolve) => {
      new window.daum.Postcode({
        ...this.options,
        oncomplete: resolve,
        onclose: (_) => resolve(),
      }).embed(container, options);
    });
  }
}

/* type definitions */

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
type CloseState = 'FORCE_CLOSE' | 'COMPLETE_CLOSE';

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
  new(options?: Partial<PostcodeOptions & PostcodeEvents>): Postcode;
}

declare global {
  interface DaumNamespace {
    readonly postcode: DaumScriptLoader;
    readonly Postcode: PostcodeConstructor;
  }
}
