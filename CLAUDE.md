# Next.js 15 + TypeScript 프로젝트 가이드

## 기술 스택

- **Next.js 15.5.3** (App Router, Turbopack)
- **React 19.1.0** + **TypeScript 5.x**
- **Tailwind CSS 4**
- **TanStack Query** (복잡한 서버 상태 관리시)
- **react-hook-form** (복잡한 폼 관리시)
- **Biome 2.2.0** (린터/포매터)
- **Vitest** + **Playwright** (테스팅)

## 프로젝트 구조

```bash
/app              # Next.js 라우터
/features         # 기능별 모듈
  /[feature]
    /components   # Feature UI
    /hooks        # Feature 로직
    /services     # Feature API
    /types        # Feature 타입
    index.ts      # Public API
/components       # 공통 UI
  /ui            # 순수 UI 컴포넌트
  /layouts       # 레이아웃 컴포넌트
/lib             # 공통 유틸리티
/types           # 공통 타입 정의
/docs            # 프로젝트 문서
```

## 핵심 개발 원칙

### 1. 단일 책임 원칙 (SRP)

- 하나의 컴포넌트/함수는 하나의 책임만
- 데이터 fetching, 비즈니스 로직, UI는 분리

### 2. 의존성 방향

- UI → Domain → Data (단방향)
- 순환 의존성 금지
- 인터페이스로 의존성 주입

### 3. 응집도는 높게, 결합도는 낮게

- 관련 코드는 한 Feature에 모음
- Feature 간 직접 의존 금지
- index.ts로만 Public API 노출

## React/Next.js 패턴

### Server Component 우선

```typescript
// 기본: Server Component
async function Page() {
  const data = await fetch('/api/data');
  return <div>{data}</div>;
}

// 필요시만: Client Component
'use client';
function Interactive() {
  const [state, setState] = useState();
  return <button onClick={...}>클릭</button>;
}
```

### 데이터 페칭 전략

1. **Server Component에서 fetch** (우선)
2. **Client Component에서 단순 fetch**
3. **TanStack Query** (복잡한 캐싱 필요시)

> 📖 **[TanStack Query 가이드](/docs/tanstack-query-guide.md)**: 캐싱, 동기화, 백그라운드 업데이트가 필요한 경우

### 폼 관리 전략

```text
폼 복잡도 체크리스트:
├─ 필드 5개 미만? → Server Actions
├─ 실시간 검증 불필요? → Server Actions
└─ 아니면? → react-hook-form
```

> 📖 **[React Hook Form 가이드](/docs/react-hook-form-guide.md)**: 복잡한 폼 검증과 상태 관리가 필요한 경우

## TypeScript 규칙

### 필수 규칙

- `enum` 금지 → `const assertion` 사용
- `any` 금지 → `unknown` + 타입 가드
- `interface` 우선 사용
- `strict: true` 필수

### 타입 패턴

```typescript
// const assertion
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading'
} as const;
type Status = typeof STATUS[keyof typeof STATUS];

// Discriminated Union
type Result<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

## Suspense & Error Boundary

### Error Boundary 전략

#### Next.js App Router 방식 (권장)

```typescript
// app/error.tsx - 라우트 세그먼트별 에러 처리
'use client'; // Error Boundary는 Client Component여야 함

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// app/global-error.tsx - 루트 레이아웃 에러 처리
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Global Error</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
```

#### react-error-boundary 라이브러리 사용

```typescript
'use client';

import { ErrorBoundary } from 'react-error-boundary';

// 1. 전역 레벨 (앱 전체 보호)
function App() {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error, errorInfo) => {
        // 에러 로깅 서비스로 전송
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      <MainContent />
    </ErrorBoundary>
  );
}

// 2. 기능별 레벨 (도메인 특화)
function FeatureSection() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div role="alert">
          <p>Something went wrong in this feature:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Reset</button>
        </div>
      )}
      onReset={() => {
        // 리셋 시 정리 작업
        clearFeatureCache();
      }}
    >
      <FeatureComponent />
    </ErrorBoundary>
  );
}

// 3. 세부 레벨 (위험한 컴포넌트 격리)
function RiskyComponent() {
  return (
    <ErrorBoundary fallback={<div>Component failed to load</div>}>
      <ThirdPartyWidget />
    </ErrorBoundary>
  );
}

### Suspense 경계 설정

#### 1. 라우트 레벨 Suspense

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      {children}
    </Suspense>
  );
}
```

#### 2. 컴포넌트 레벨 Suspense

```typescript
// 독립적 로딩 단위
function ProductPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<ProductInfoSkeleton />}>
        <ProductInfo />
      </Suspense>
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews />
      </Suspense>
    </>
  );
}
```

### Suspense + Error Boundary 조합

```typescript
// 권장 순서: Error Boundary가 Suspense를 감싸야 함
<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<LoadingUI />}>
    <DataComponent />
  </Suspense>
</ErrorBoundary>
```

### 권장 사항

#### Error Boundary 사용 원칙

1. **계층적 접근**
   - Next.js App Router: `error.tsx` 파일로 라우트별 처리
   - 전역 에러: `global-error.tsx`로 루트 레이아웃 보호
   - 세부 격리: react-error-boundary로 위험 컴포넌트 격리

2. **전략적 배치**
   - 모든 컴포넌트를 감싸지 말 것 (과도한 복잡도)
   - 에러가 발생하기 쉬운 곳에만 배치
   - 사용자 입력, 외부 API, 서드파티 라이브러리 위주

3. **에러 복구 메커니즘**
   - `reset()` 함수로 재시도 기능 제공
   - 에러 발생 시 캐시/상태 정리
   - 사용자에게 명확한 피드백과 액션 제공

#### Suspense 사용 원칙

1. **점진적 렌더링**
   - 중요 콘텐츠 먼저 표시
   - 독립적 로딩 단위로 세분화
   - 네트워크 워터폴 방지

2. **Skeleton UI 일관성**
   - 실제 레이아웃과 동일한 구조
   - CLS(Cumulative Layout Shift) 최소화
   - 적절한 로딩 피드백

#### 제한사항 및 주의사항

- **Error Boundary가 잡지 못하는 에러**:
  - 이벤트 핸들러 내부 에러
  - 비동기 코드 (setTimeout, Promise)
  - SSR 중 발생한 에러
  - Error Boundary 자체의 에러

- **Next.js 특수 사항**:
  - Error Boundary는 반드시 Client Component
  - `error.tsx`는 같은 세그먼트의 `layout.tsx` 에러 못 잡음
  - Production에서만 작동하는 `global-error.tsx`

- **성능 고려사항**:
  - 과도한 Error Boundary는 성능 저하
  - Suspense 경계 과다 설정 시 복잡도 증가

## 성능 최적화

- **측정 없는 최적화 금지**
- **명시적 요청시에만 최적화**
- **단순한 코드 우선**

## 테스팅 전략

### TDD 워크플로우

1. 🔴 실패하는 테스트 작성
2. 🟢 테스트 통과하는 최소 코드
3. ⚪ 리팩토링

### 테스트 파일 네이밍

```bash
*.unit.spec.tsx   # 단위 테스트
*.int.spec.tsx    # 통합 테스트
*.e2e.spec.tsx    # E2E 테스트
```

## 코딩 컨벤션

### 파일명

- 일반 파일: `kebab-case`
- React 컴포넌트: `PascalCase`

### 네이밍

- 변수/함수: `camelCase`
- 상수: `UPPER_SNAKE_CASE`
- 타입/인터페이스: `PascalCase`

## 프로젝트 핵심 원칙

1. **Server Component를 기본으로 사용**
2. **리팩토링을 통한 근본적 문제 해결**
3. **간단하고 안정적인 로직 우선**
4. **TDD는 필수**
5. **성능 최적화는 명시적 요청시에만**

## 추가 문서

상세한 기술 가이드는 `/docs` 디렉토리의 문서를 참고하세요:

- 📚 [TanStack Query 가이드](/docs/tanstack-query-guide.md) - 서버 상태 관리
- 📝 [React Hook Form 가이드](/docs/react-hook-form-guide.md) - 폼 상태 관리

---

> 이 가이드는 프로젝트 전체의 기초가 되는 개발 원칙입니다.
> 세부 구현은 각 Feature의 요구사항에 맞게 조정하되,
> 위 원칙들은 일관되게 유지해야 합니다.
