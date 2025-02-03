# Next.js 템플릿

Next.js 생태계의 최신 업데이트와 개선사항을 반영하기 위해 완전히 새롭게 재구성된 모던한 템플릿 프로젝트입니다.

## 프로젝트 구조

```
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
  - 코드 품질을 위한 ESLint와 Prettier
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
