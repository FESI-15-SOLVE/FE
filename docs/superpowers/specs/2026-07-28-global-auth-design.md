# Global Authentication State Management Design

## Background & Problem
현재 로그인은 정상 동작(토큰 발급 및 HttpOnly 쿠키 저장)하고 있으나, 클라이언트 전역에서 로그인 상태(`user`, `isLoggedIn`)를 관리하는 로직이 부재함. 이로 인해 컴포넌트 간 로그인 여부나 사용자 식별자(`currentUserId`)를 프롭스로 전달하는 데 한계가 있음.

## Solution Architecture
서버 단에서 초기 데이터를 패칭하여 클라이언트로 주입(SSR)하는 방식을 채택하여 Layout Shift 방지. 

### 1. 전역 Store (Zustand)
- **파일**: `src/store/use-auth-store.ts`
- **상태**: 
  - `user: User | null` (현재 로그인된 사용자 정보)
  - `isLoggedIn: boolean` (파생 상태 또는 boolean 플래그)
- **액션**: 
  - `setAuth(user: User | null)`
  - `clearAuth()`

### 2. 초기화 (Auth Provider)
- **파일**: `src/providers/auth-provider.tsx`
- 클라이언트 래퍼 컴포넌트.
- `layout.tsx`에서 서버 액션을 통해 받아온 초기 `user` 데이터를 Zustand 스토어에 주입(마운트 시점).
- 하위 트리에 `children` 렌더링.

### 3. 서버 통신 (Server Actions)
- **파일**: `src/actions/auth/auth-actions.ts`
- **`getMyProfileAction`**:
  - `ServerApi.users.getMyProfile()` 호출.
  - 쿠키의 `accessToken`을 읽어 백엔드에 요청. 실패(401) 시 예외 발생시키지 않고 `null` 반환.
- **`logoutAction`**:
  - 백엔드 `/auth/logout` API에 `refreshToken` 전송하여 세션 무효화.
  - 쿠키(`accessToken`, `refreshToken`) 삭제.

### 4. Layout 및 UI 통합
- **`src/app/layout.tsx`**: 비동기 컴포넌트로 변경하여 렌더링 전 `getMyProfileAction()` 호출 후 `<AuthProvider>`로 전체 레이아웃 래핑.
- **`GlobalNavigationBar`**: 하드코딩된 `isLoggedIn` 제거하고 스토어와 연동하여 아바타 및 로그아웃 버튼 노출.
- **`MeetingDetailHeader`**: `currentUserId` prop 제거하고, `useAuthStore`에서 직접 상태를 꺼내어 사용.

## Trade-offs
- SSR 주입 방식은 초기 데이터 패칭으로 인해 첫 문서 로딩 시 서버 지연이 조금 발생할 수 있으나, 화면 렌더링 후의 UI 깜빡임을 100% 방지할 수 있어 사용자 경험상 가장 적절함.
