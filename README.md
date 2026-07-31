## 환경 변수 설정

프로젝트 실행을 위해 루트 디렉토리에 `.env.local` 파일을 생성하고 아래 값을 채워주세요.

```dotenv
NEXT_PUBLIC_KAKAO_MAP_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
```

### 1. `NEXT_PUBLIC_KAKAO_MAP_KEY`

카카오맵 JavaScript SDK 키입니다.

1. [카카오 디벨로퍼스](https://developers.kakao.com/)에 로그인 후 애플리케이션을 생성합니다.
2. **앱 키 > JavaScript 키**를 복사해 값으로 넣어주세요.
3. **플랫폼 > Web 플랫폼 등록**에서 사용할 도메인(예: `http://localhost:3000`, 배포 도메인)을 반드시 등록해야 지도가 정상 동작합니다.

### 2. `NEXT_PUBLIC_APP_URL`

현재 서비스의 base URL입니다. OAuth 로그인 시 redirect_uri를 구성하는 데 사용됩니다.

- 로컬 개발: `http://localhost:3000`
- 배포 환경: 실제 서비스 도메인 (예: `https://example.com`)

### 3. Google OAuth (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)

1. [Google Cloud Console](https://console.cloud.google.com/) > **APIs & Services > Credentials**에서 OAuth 2.0 클라이언트 ID를 생성합니다.
2. **승인된 리디렉션 URI**에 아래 값을 등록합니다.
   ```
   {NEXT_PUBLIC_APP_URL}/api/auth/callback/google
   ```
3. 발급받은 클라이언트 ID/Secret을 각각 값으로 넣어주세요.

> 두 값 모두 서버에서만 사용되며 클라이언트에 노출되지 않습니다.

### 4. Kakao OAuth (`KAKAO_CLIENT_ID`, `KAKAO_CLIENT_SECRET`)

1. [카카오 디벨로퍼스](https://developers.kakao.com/)에서 카카오 로그인용 애플리케이션을 생성(또는 위 지도 앱과 동일 앱 사용)합니다.
2. **카카오 로그인 > Redirect URI**에 아래 값을 등록합니다.
   ```
   {NEXT_PUBLIC_APP_URL}/api/auth/callback/kakao
   ```
3. **앱 키 > REST API 키**를 `KAKAO_CLIENT_ID`에 넣습니다.
4. **카카오 로그인 > 보안 > Client Secret**을 활성화 후 발급받은 값을 `KAKAO_CLIENT_SECRET`에 넣습니다. (선택사항이지만 보안 강화를 위해 활성화를 권장합니다.)

> 두 값 모두 서버에서만 사용되며 클라이언트에 노출되지 않습니다.

---
