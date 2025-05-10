# Next.js 템플릿

Next.js 생태계의 최신 업데이트와 개선사항을 반영하기 위해 완전히 새롭게 재구성된 모던한 템플릿 프로젝트입니다.

## 프로젝트 구조

```shell
next15-template/
├── src/
│   └── app/                 # App Router 디렉토리
│       ├── layout.tsx       # 루트 레이아웃
│       ├── page.tsx         # 홈페이지
│       ├── globals.css      # 전역 스타일
│       └── favicon.ico      # 파비콘
├── public/                  # 정적 파일
├── .vscode/
│   └── settings.json       # VSCode 설정
└── 설정 파일
    ├── next.config.ts      # Next.js 설정
    ├── tailwind.config.ts  # Tailwind CSS 설정
    ├── postcss.config.mjs  # PostCSS 설정
    ├── eslint.config.mjs   # ESLint 설정
    └── prettier.config.mjs # Prettier 설정
```

## 특징

- **프레임워크**: App Router를 지원하는 Next.js
- **언어**: 타입 안정성을 위한 TypeScript
- **스타일링**: 유틸리티 중심의 TailwindCSS
- **개발 환경**:
  - 빠른 개발을 위한 Turbopack
  - 코드 품질을 위한 ESLint v9 플랫 설정과 Prettier
  - import 순서 강제 및 절대 경로 import
  - VSCode 설정 포함
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

## 코드 품질

이 템플릿은 코드 품질을 위해 ESLint v9 플랫 설정과 Prettier를 사용합니다.

### ESLint 설정

#### 주요 기능

1. **기본 JavaScript 및 TypeScript 규칙**

   - ESLint 권장 규칙 적용
   - Next.js 내장 규칙(`next/core-web-vitals`, `next/typescript`) 적용

2. **import 순서 및 절대 경로 강제**

   - 모든 import가 정의된 순서대로 정렬
   - 모듈 타입별 그룹화 및 알파벳 순 정렬
   - 상대 경로(`../`) 대신 절대 경로(`@/`) 사용 강제

3. **강화된 TypeScript 규칙**

   - 사용하지 않는 변수에 대한 경고(`@typescript-eslint/no-unused-vars`)
   - `any` 타입 사용에 대한 경고(`@typescript-eslint/no-explicit-any`)
   - 일관된 타입 import 강제(`@typescript-eslint/consistent-type-imports`)

4. **Prettier 통합**

   - ESLint와 Prettier 간의 충돌 방지
   - 스타일링에 Prettier 설정 사용

5. **기타 사용자 정의 규칙**
   - 콘솔 사용 제한(`no-console` - warn과 error만 허용)

#### 설정 구조

ESLint 설정은 다음과 같이 모듈화되어 있습니다:

1. **ignoresConfig**: ESLint 검사에서 제외할 파일 패턴 정의

   - node_modules, .next, dist, CSS/SCSS 파일 등 제외

2. **nextConfig**: Next.js 내장 ESLint 설정을 플랫 설정 형식으로 변환

3. **importRulesConfig**: import 관련 규칙 정의

   - import 순서, 그룹화, 절대 경로 사용 등 강제

4. **customRulesConfig**: 프로젝트 특정 규칙 정의

   - TypeScript 관련 규칙 및 기타 사용자 정의 규칙

5. **prettierConfig**: Prettier를 ESLint와 통합
   - ESLint에 Prettier 규칙 적용
   - 충돌 방지 설정 포함

#### 주요 규칙

##### import 순서 규칙

```javascript
'import/order': [
  'error',
  {
    groups: [
      'builtin',     // Node.js 내장 모듈
      'external',    // 외부 패키지
      'internal',    // 절대 경로 import
      'parent',      // 부모 디렉토리 import
      'sibling',     // 같은 디렉토리 import
      'index',       // 인덱스 import
      'object',      // 객체 import
      'type',        // 타입 import
    ],
    'newlines-between': 'always',  // 그룹 간 빈 줄 요구
    alphabetize: {                 // 알파벳 순 정렬
      order: 'asc',
      caseInsensitive: true
    },
    pathGroups: [
      {
        pattern: '@/**',           // '@/'로 시작하는 모든 import
        group: 'internal',
        position: 'before'
      }
    ],
    pathGroupsExcludedImportTypes: ['builtin']
  }
]
```

##### 절대 경로 강제 규칙

```javascript
'no-restricted-imports': [
  'error',
  {
    patterns: [
      {
        group: ['../*'],           // '../' import 금지
        message: '상대 경로 대신 절대 경로를 사용하세요'
      }
    ]
  }
]
```

##### TypeScript 규칙

```javascript
'@typescript-eslint/no-unused-vars': [
  'warn',
  {
    argsIgnorePattern: '^_',       // '_'로 시작하는 인자는 무시
    varsIgnorePattern: '^_',       // '_'로 시작하는 변수는 무시
  },
],
'@typescript-eslint/no-explicit-any': 'warn',        // 'any' 타입 사용 시 경고
'@typescript-eslint/consistent-type-imports': 'error', // 'import type' 사용 강제
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
- Tailwind CSS 플러그인 사용(`plugins: ['prettier-plugin-tailwindcss']`)

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
