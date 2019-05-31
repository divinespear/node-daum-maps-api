# daum-maps-api
Promise를 지원하는 node.js용 다음 지도 및 우편번호 서비스 구현

## Disclaimers
 * 본인은 카카오와 관계 없는 사람입니다.
 * 본 라이브러리는 개인적인 필요로 인해서 기술습득 겸 해서 만든 것으로, 카카오와는 관련 없습니다.
 * 카카오 API의 명백한 오류가 아닌 이상 이 라이브러리 사용으로 인해서 발생하는 문제로 카카오측에 징징대지 마십시오.
 * 카카오의 API 변경으로 인해 불시에 오류가 발생할 수 있습니다.

## 그래서 뭐가 됩니까?
 * Promise, `async`/`await` 됩니다.
 * typescript 타입을 정의했습니다. ~~노가다 다메요~~

## 설치
```bash
npm i load-script-once daum-maps-api
```

## 사용하기

### 우편번호 서비스

Promise로 선택 결과가 넘어옵니다.

```typescript
import { DaumPostcode } from 'daum-maps-api'

const postcode = new DaumPostcode();

postcode.open().then((data) => {
  if (data) {
    ...
  }
});
```

`async`/`await`를 사용할 수 있습니다.

```typescript
import { DaumPostcode } from 'daum-maps-api'

const postcode = new DaumPostcode();

async function test() {
  const data = await postcode.open();
  if (data) {
    ...
  }
}
```

#### `new DaumPostcode(options)`

[http://postcode.map.daum.net/guide#attributes](http://postcode.map.daum.net/guide#attributes)를 참고해주세요.

* `oncomplete`, `onclose` 제외

```typescript
const postcode = new DaumPostcode({
  ...
});
```

#### `DaumPostcode#open(options)`

[http://postcode.map.daum.net/guide#methods](http://postcode.map.daum.net/guide#methods)의 `open` 함수를 참고해주세요.

```typescript
postcode.open({
  ...
});
```

#### `DaumPostcode#embed(container, options)`

[http://postcode.map.daum.net/guide#methods](http://postcode.map.daum.net/guide#methods)의 `embed` 함수를 참고해주세요.

```typescript
postcode.embed(container, {
  ...
});
```
