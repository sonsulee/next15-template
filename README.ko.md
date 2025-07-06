# Next.js 템플릿

Next.js 생태계의 최신 업데이트와 개선사항을 반영하기 위해 완전히 새롭게 재구성된 모던한 템플릿 프로젝트입니다.

## 프로젝트 구조

```shell
next15-template/
├── src/
│   └── app/                 # App Router 디렉토리
│       ├── layout.tsx       # 루트 레이아웃
│       ├── page.tsx         # 홈페이지
│       ├── globals.css.ts   # 전역 스타일 (Vanilla Extract)
│       └── favicon.ico      # 파비콘
├── public/                  # 정적 파일
├── .vscode/
│   └── settings.json       # VSCode 설정
└── 설정 파일
    ├── next.config.js      # Next.js 설정 (Vanilla Extract 플러그인 포함)
    ├── eslint.config.mjs   # ESLint 설정
    └── prettier.config.mjs # Prettier 설정
```

## 특징

- **프레임워크**: App Router를 지원하는 Next.js
- **언어**: 타입 안정성을 위한 TypeScript
- **스타일링**: 제로 런타임 CSS-in-JS를 위한 Vanilla Extract
- **개발 환경**:
  - 코드 품질을 위한 ESLint v9 플랫 설정과 Prettier
  - import 순서 강제 및 절대 경로 import
  - VSCode 설정 포함
  - **참고**: Vanilla Extract와의 호환성 문제로 인해 Turbopack이 비활성화되어 있습니다
- **패키지 관리**: pnpm

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 사용 가능한 스크립트

- `pnpm dev`: 개발 서버 시작
- `pnpm build`: 프로덕션 빌드
- `pnpm start`: 프로덕션 서버 시작
- `pnpm lint`: ESLint 실행
- `pnpm lint:fix`: ESLint 문제 수정
- `pnpm format`: Prettier로 코드 포맷팅
- `pnpm format:check`: 코드 포맷팅 검사
- `pnpm check`: 포맷 검사 및 린트 실행
- `pnpm fix`: 포맷 및 린트 수정 실행

## Vanilla Extract를 이용한 스타일링

이 템플릿은 [Vanilla Extract](https://vanilla-extract.style/)를 사용하여 스타일링을 구현하며, 완전한 TypeScript 지원을 제공하는 제로 런타임 CSS-in-JS를 제공합니다.

### Vanilla Extract를 선택하는 이유

- **제로 런타임**: 모든 스타일이 빌드 시점에 추출되어 런타임 오버헤드가 없음
- **타입 안정성**: CSS 속성에 대한 자동 완성 기능을 갖춘 완전한 TypeScript 지원
- **CSS 변수**: CSS 커스텀 속성과 테마 기능에 대한 내장 지원
- **프레임워크 독립적**: 모든 프레임워크 또는 라이브러리와 호환
- **친숙한 문법**: camelCase로 된 표준 CSS 속성명 사용

### 기본 사용법

`.css.ts` 파일에서 스타일 생성:

```typescript
// styles.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '1rem',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
});
```

컴포넌트에서 사용:

```typescript
// component.tsx
import { container } from './styles.css.ts';

export function MyComponent() {
  return <div className={container}>내용</div>;
}
```

### 글로벌 스타일

글로벌 스타일은 `src/app/globals.css.ts`에서 정의:

```typescript
import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  margin: 0,
  fontFamily: 'Arial, sans-serif',
});
```

### 중요한 주의사항

- **Turbopack 호환성**: Vanilla Extract는 현재 Next.js 15의 Turbopack과 호환성 문제가 있습니다. 이 템플릿은 올바른 동작을 보장하기 위해 개발 시 Turbopack을 비활성화합니다.
- **파일 명명**: 스타일 파일은 Vanilla Extract에서 처리되기 위해 `.css.ts`로 끝나야 합니다.
- **빌드 시점 처리**: 스타일은 빌드 시점에 생성되어 최적의 런타임 성능을 보장합니다.

## 코드 품질

이 템플릿은 코드 품질을 위해 ESLint v9 플랫 설정과 Prettier를 사용합니다.

### ESLint 설정

#### 주요 기능

1. **TypeScript 규칙**
   - `any` 타입 사용 방지(`@typescript-eslint/no-explicit-any`)
   - 타입 전용 import에는 `import type` 사용 강제(`@typescript-eslint/consistent-type-imports`)
   - 미사용 변수에 대한 경고, `_` 접두사 예외 처리(`@typescript-eslint/no-unused-vars`)

2. **React 규칙**
   - 배열 내 모든 컴포넌트에 키 요구(`react/jsx-key`)
   - React Hooks 규칙 강제(`react-hooks/rules-of-hooks`)
   - 훅 내 누락된 종속성에 대한 경고(`react-hooks/exhaustive-deps`)

3. **Import 정렬**
   - 그룹별로 import를 정렬하고 알파벳 순으로 정렬(`import/order`)
   - 그룹 순서: builtin → external → internal → parent → sibling → index → type
   - import 그룹 간 빈 줄 요구

4. **일반 규칙**
   - 네이티브 `no-unused-vars` 비활성화(TypeScript가 처리)
   - 재할당되지 않는 변수에 `const` 강제(`prefer-const`)
   - `warn`과 `error` 제외한 console 사용에 대한 경고(`no-console`)
   - TypeScript enum 사용 방지, const assertions 또는 union 타입 사용 권장(`no-restricted-syntax`)

5. **Prettier 통합**
   - ESLint와 Prettier 간의 충돌 방지
   - 코드 포매팅에 Prettier 설정 사용

#### 설정 구조

ESLint 설정은 새로운 플랫 설정 형식을 사용하며 다음을 포함합니다:

1. **ignoresConfig**: ESLint 검사에서 제외할 파일 패턴 정의
   - 제외 대상: `dist`, `node_modules`, `build`, `.next`, `coverage`, `*.min.js`, `*.d.ts`, `.history`, `**/.git/**`

2. **기본 설정**:
   - ESLint 권장 규칙(`js.configs.recommended`)
   - Next.js 내장 규칙(`next/core-web-vitals`, `next/typescript`)

3. **customRulesConfig**: 모든 프로젝트 특정 규칙을 포함:
   - TypeScript 규칙
   - React 및 React Hooks 규칙
   - Import 정렬 규칙
   - 일반 JavaScript 규칙
   - Prettier 통합

4. **Prettier 설정**:
   - 충돌하는 규칙을 비활성화하는 ESLint Config Prettier
   - 포매팅을 위한 Prettier 플러그인

#### 주요 규칙

##### import 순서 규칙

```javascript
'import/order': [
  'error',
  {
    groups: [
      'builtin',     // Node.js 내장 모듈
      'external',    // 외부 패키지
      'internal',    // 내부 모듈
      'parent',      // 부모 디렉토리 import
      'sibling',     // 같은 디렉토리 import
      'index',       // 인덱스 import
      'type',        // 타입 import
    ],
    'newlines-between': 'always',  // 그룹 간 빈 줄 요구
    alphabetize: {                 // 알파벳 순 정렬
      order: 'asc',
      caseInsensitive: true
    },
  }
]
```

##### TypeScript 규칙

```javascript
// 'any' 타입 사용 방지
'@typescript-eslint/no-explicit-any': 'error',

// 타입 전용 import에 타입 import 강제
'@typescript-eslint/consistent-type-imports': [
  'error',
  {
    prefer: 'type-imports',
    fixStyle: 'inline-type-imports',
  },
],

// 미사용 변수에 대한 경고(예외 포함)
'@typescript-eslint/no-unused-vars': [
  'error',
  {
    argsIgnorePattern: '^_',           // '_'로 시작하는 인자는 무시
    varsIgnorePattern: '^_',           // '_'로 시작하는 변수는 무시
    caughtErrorsIgnorePattern: '^_',  // '_'로 시작하는 catch 오류는 무시
  },
],
```

##### React 규칙

```javascript
// 배열의 모든 컴포넌트에 키 요구
'react/jsx-key': ['error', { checkFragmentShorthand: true }],

// React Hooks 규칙 강제
'react-hooks/rules-of-hooks': 'error',
'react-hooks/exhaustive-deps': 'warn',
```

##### 일반 규칙

```javascript
// 기본 규칙 비활성화(TypeScript 규칙이 처리)
'no-unused-vars': 'off',

// 변경되지 않는 변수에 const 강제
'prefer-const': 'error',

// console 사용 제한
'no-console': ['warn', { allow: ['warn', 'error'] }],

// TypeScript enum 사용 방지
'no-restricted-syntax': [
  'error',
  {
    selector: 'TSEnumDeclaration',
    message: 'Use const assertions or union types instead of enums.',
  },
],
```

### Prettier 설정

Prettier 설정은 다음과 같은 스타일링을 적용합니다:

- 세미콜론 사용(`semi: true`)
- 작은따옴표 사용(`singleQuote: true`)
- 탭에 2 공백 사용(`tabWidth: 2`)
- 모든 곳에 후행 쉼표 사용(`trailingComma: 'all'`)
- 최대 라인 길이 100자로 설정(`printWidth: 100`)
- 화살표 함수에서 항상 괄호 사용(`arrowParens: 'always'`)
- LF 줄 바꿈 사용(`endOfLine: 'lf'`)
- 필요에 따라 추가 포맷팅 플러그인 지원

### IDE 통합

이 프로젝트는 파일 저장 시 자동으로 ESLint와 Prettier를 실행하는 VSCode 설정을 포함하고 있습니다. 이 설정은 `.vscode/settings.json`에 정의되어 있습니다.

#### 저장 시 동작

프로젝트 설정이 적용된 VSCode에서 파일을 저장하면:

1. **자동 포맷팅**: 먼저, Prettier가 `prettier.config.mjs` 설정에 따라 파일 전체를 포맷팅합니다.
2. **ESLint 수정**: 그 다음, ESLint가 import 정렬 등의 수정 가능한 린트 문제를 수정합니다.
3. **import 정리**: 마지막으로, 설정된 규칙에 따라 import문이 정리됩니다.

#### 필요한 VSCode 확장 프로그램

자동 포맷팅이 올바르게 작동하려면 다음 VSCode 확장 프로그램이 필요합니다:

1. **ESLint**(Microsoft): `dbaeumer.vscode-eslint`
2. **Prettier - Code formatter**(Prettier): `esbenp.prettier-vscode`
3. **Prettier ESLint**(Rebecca Shen): `rvest.vs-code-prettier-eslint`

#### Cursor 사용하기

Cursor는 VSCode와 유사한 설정을 가지고 있습니다. 자동 포맷팅이 작동하지 않는 경우:

1. Cursor 설정에서 "Format on Save"가 활성화되어 있는지 확인
2. 프로젝트와 필요한 확장 프로그램을 설치한 후 Cursor 재시작
3. 필요하다면 "Developer: Reload Window" 명령 시도

#### 기타 IDE 설정

#### WebStorm/IntelliJ IDEA

1. Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint로 이동
2. "Automatic ESLint configuration" 활성화
3. "Run eslint --fix on save" 체크
4. Preferences > Languages & Frameworks > JavaScript > Prettier로 이동
5. "Prettier package"를 활성화하고 Prettier 설치 선택
6. "Run on save" 체크

### 문제 해결

#### 일반적인 문제

1. **플러그인 충돌**
   - "Cannot redefine plugin X" 오류가 표시되면 플러그인이 여러 번 임포트되고 있는 것입니다
   - 해결책: 중복된 플러그인 임포트를 제거하거나 호환성 레이어 사용

2. **import 순서 오류**
   - import 순서 관련 많은 오류가 표시되는 경우
   - 해결책: `pnpm run lint`를 실행하여 모든 오류 확인 후 `pnpm run fix`를 실행하여 자동 수정

3. **자동 포맷팅이 작동하지 않음**
   - 필요한 확장 프로그램이 설치되어 있는지 확인
   - 워크스페이스 설정이 프로젝트 설정을 덮어쓰지 않는지 확인
   - "Developer: Reload Window"를 실행하고 "Output" 패널(ESLint) 확인

4. **경로 별칭 설정**
   - 절대 경로 import가 올바르게 작동하려면 `tsconfig.json`에 적절한 경로 별칭이 있는지 확인:

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["src/*"]
       }
     }
   }
   ```
