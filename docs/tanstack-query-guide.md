# TanStack Query 사용 가이드라인

## 핵심 철학: React Query로 사고하기

### 서버 상태의 본질 이해

- **서버 상태는 "빌린" 것**: 우리가 소유하지 않은, 원격에서 관리되는 상태
- **시간의 스냅샷**: 서버 상태는 특정 시점의 스냅샷이며 언제든 구식이 될 수 있음
- **비동기 상태 관리자**: React Query는 데이터 페칭 라이브러리가 아닌 비동기 상태 관리 도구

### 핵심 원칙

1. **상태의 위치가 아닌 타입에 집중**: 서버 상태 vs 클라이언트 상태
2. **매개변수를 의존성으로 취급**: 쿼리 키에 모든 의존성 포함
3. **렌더링 복원력 설계**: 많은 리렌더링을 가정하고 코드 작성

## 1. 쿼리 키 전략

### 쿼리 키 팩토리 패턴

```typescript
// 기능별 쿼리 키 팩토리 생성
const todoKeys = {
  // 최상위 범위
  all: ['todos'] as const,

  // 목록 관련
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,

  // 상세 관련
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
};

// 사용 예시
useQuery({ queryKey: todoKeys.detail(todoId), ... });
queryClient.invalidateQueries({ queryKey: todoKeys.lists() }); // 모든 목록 무효화
```

### 쿼리 키 구조화 원칙

- **일반적 → 구체적 순서**: `['todos', 'list', { filters }]`
- **의존성 배열처럼 취급**: 모든 queryFn 의존성을 키에 포함
- **일관된 구조 유지**: 예측 가능한 캐시 상호작용

## 2. Query Options API (v5+)

### React Query의 캐시 공유 이해하기

React Query는 **기본적으로 같은 queryKey를 사용하면 데이터를 자동으로 공유**합니다:

```typescript
// 컴포넌트 A
function TodoDetail() {
  const { data } = useQuery({
    queryKey: ['todo', 1],
    queryFn: fetchTodo
  });
  // data = { id: 1, title: "청소하기" }
}

// 컴포넌트 B (완전히 다른 곳)
function TodoSummary() {
  const { data } = useQuery({
    queryKey: ['todo', 1],  // 같은 키 사용!
    queryFn: fetchTodo
  });
  // 자동으로 같은 data 공유됨 (API 재호출 없음)
}
```

### queryOptions의 실제 역할

`queryOptions`는 데이터 공유가 아닌 **"설정 공유"**를 위한 도구입니다:

```typescript
// ❌ 문제: 같은 설정을 여러 곳에 반복 작성
// ProductList.tsx
const { data } = useQuery({
  queryKey: ['products', category],
  queryFn: () => fetchProducts(category),
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
});

// Cart.tsx - 똑같은 설정 반복
const { data } = useQuery({
  queryKey: ['products', category],  // 중복
  queryFn: () => fetchProducts(category),  // 중복
  staleTime: 1000 * 60 * 5,  // 중복, 실수 가능!
  gcTime: 1000 * 60 * 10,  // 중복
});

// ✅ 해결: queryOptions로 설정을 한 곳에서 관리
import { queryOptions } from '@tanstack/react-query';

const productOptions = (category: string) =>
  queryOptions({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

// 이제 어디서든 일관된 설정 사용
const { data } = useQuery(productOptions('electronics'));
```

### 언제 queryOptions가 필요한가?

1. **같은 쿼리를 여러 작업에 사용할 때**:

```typescript
const todoOptions = (id: number) =>
  queryOptions({
    queryKey: ['todos', 'detail', id],
    queryFn: () => fetchTodoById(id),
    staleTime: 1000 * 60 * 5,
  });

// 1. 컴포넌트에서 데이터 조회
const { data } = useQuery(todoOptions(id));

// 2. 라우트 진입 전 프리페칭
await queryClient.prefetchQuery(todoOptions(id));

// 3. Mutation 후 캐시 직접 업데이트
queryClient.setQueryData(todoOptions(id).queryKey, newData);

// 4. 캐시 무효화
queryClient.invalidateQueries({ queryKey: todoOptions(id).queryKey });

// 5. 캐시에 데이터 있는지 확인
const cached = queryClient.getQueryData(todoOptions(id).queryKey);
```

2. **복잡한 쿼리 키 구조**:

```typescript
// 이런 복잡한 설정을 매번 작성하면 실수하기 쉬움
const searchOptions = (params: SearchParams) =>
  queryOptions({
    queryKey: ['search', params.query, params.category, params.sort, params.page],
    queryFn: () => searchAPI(params),
    staleTime: 1000 * 60 * 2,
    keepPreviousData: true,
  });
```

### 주의: 안티패턴 피하기

```typescript
// ❌ 안티패턴: React Query 데이터를 props/context로 전달
function Parent() {
  const { data } = useQuery({ queryKey: ['todo', 1], queryFn: fetchTodo });
  // 이렇게 하지 마세요!
  return <Child todoData={data} />;
}

// ✅ 올바른 패턴: 각 컴포넌트에서 직접 호출
function Parent() {
  return <Child todoId={1} />;
}

function Child({ todoId }) {
  // React Query가 알아서 캐시 공유
  const { data } = useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => fetchTodo(todoId)
  });
}
```

**핵심**: React Query는 이미 전역 캐시를 제공하므로 Context API나 상태 관리 라이브러리로 데이터를 옮길 필요가 없습니다.

## 3. 데이터 변환 전략

### 변환 접근법 비교

```typescript
// 1. ❌ queryFn에서 변환 (매 페치마다 실행)
useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const data = await fetchTodos();
    return data.map(transformTodo); // 매번 실행됨
  },
});

// 2. ⚠️ 렌더 함수에서 변환 (useMemo 필요)
const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });
const transformedData = useMemo(() => data?.map(transformTodo), [data]);

// 3. ✅ select 옵션 사용 (최적화됨)
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  select: (data) => data.map(transformTodo), // 구조적 공유로 최적화
});

// 4. ✅ 부분 구독으로 리렌더링 최소화
const todoCount = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  select: (data) => data.length, // length만 변경될 때 리렌더링
});
```

## 4. TypeScript 통합

### 타입 추론 최대화

```typescript
// ✅ Good: 타입 추론 활용
const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

const { data } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id), // User 타입 자동 추론
});

// ❌ Bad: 불필요한 제네릭
const { data } = useQuery<User, Error, User, string[]>({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id),
});
```

### 에러 타입 처리

```typescript
// 런타임 타입 가드 활용
const { error } = useQuery({ ... });

if (error) {
  if (error instanceof ApiError) {
    return <div>API Error: {error.code}</div>;
  }
  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  return <div>Unknown error occurred</div>;
}
```

## 5. 상태 체크 우선순위

### 백그라운드 리페치를 고려한 순서

```typescript
function TodoList() {
  const { data, error, isLoading } = useTodos();

  // 1️⃣ 데이터 먼저 확인 (stale 데이터라도 표시)
  if (data) {
    return (
      <>
        {error && <ErrorBanner error={error} />}
        <TodoItems todos={data} />
      </>
    );
  }

  // 2️⃣ 에러 처리
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  // 3️⃣ 로딩 상태
  return <LoadingSpinner />;
}
```

## 6. Placeholder vs Initial Data

### 언제 무엇을 사용할까?

```typescript
// placeholderData: 임시 데이터, 항상 백그라운드 페치
const { data, isPlaceholderData } = useQuery({
  queryKey: ['user', id],
  queryFn: fetchUser,
  placeholderData: {
    name: 'Loading...',
    avatar: '/default-avatar.png',
  },
});

// initialData: 캐시에 저장, staleTime 존중
const { data } = useQuery({
  queryKey: ['todo', id],
  queryFn: fetchTodo,
  initialData: () => {
    // 목록에서 가져온 데이터로 초기화
    return queryClient
      .getQueryData(['todos'])
      ?.find((todo) => todo.id === id);
  },
  initialDataUpdatedAt: () =>
    queryClient.getQueryState(['todos'])?.dataUpdatedAt,
});
```

## 7. Mutation 마스터하기

### Mutation 라이프사이클

```typescript
const mutation = useMutation({
  mutationFn: updateTodo,

  // 실행 순서: onMutate → mutationFn → onSuccess/onError → onSettled
  onMutate: async (variables) => {
    // Optimistic update 준비
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previousTodos = queryClient.getQueryData(['todos']);

    queryClient.setQueryData(['todos'], (old) => {
      // 낙관적 업데이트
      return updateTodoInList(old, variables);
    });

    return { previousTodos }; // context로 전달
  },

  onError: (err, variables, context) => {
    // 롤백
    if (context?.previousTodos) {
      queryClient.setQueryData(['todos'], context.previousTodos);
    }
    toast.error('Update failed');
  },

  onSuccess: (data, variables, context) => {
    toast.success('Updated successfully');
  },

  onSettled: (data, error, variables, context) => {
    // 성공/실패 관계없이 실행
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});

// mutate vs mutateAsync
mutation.mutate(data); // 에러 자동 처리
await mutation.mutateAsync(data); // try-catch 필요
```

### 자동 쿼리 무효화

```typescript
// 글로벌 캐시 콜백으로 자동화
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      // 모든 mutation 후 자동 무효화
      queryClient.invalidateQueries();
    },
  }),
});

// 또는 meta 활용
useMutation({
  mutationFn: updateTodo,
  meta: {
    invalidates: ['todos'],
  },
});
```

## 8. 렌더링 최적화

### notifyOnChangeProps 활용

```typescript
// 특정 속성 변경시에만 리렌더링
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  notifyOnChangeProps: ['data'], // isFetching 변경 무시
});

// tracked 쿼리 사용
const { data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  notifyOnChangeProps: 'tracked', // 사용된 속성만 추적
});
// 주의: 구조 분해 할당 시 모든 속성 추적됨
```

### 구독 기반 상태 관리

```typescript
// useWatch로 특정 필드만 구독
const role = useWatch({
  queryKey: ['user'],
  select: (data) => data.role,
});

// isFetching 전역 관리
const isFetching = useIsFetching();
const isMutating = useIsMutating();
```

## 9. 오프라인 지원

### Network Mode 설정

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst', // 오프라인 우선
      retry: true,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
});

// fetchStatus 활용
const { data, fetchStatus } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});

if (fetchStatus === 'paused') {
  return <div>오프라인 상태입니다</div>;
}
```

## 10. 캐시 시딩 전략

### Pull 방식: 필요할 때 가져오기

```typescript
const { data } = useQuery({
  queryKey: ['todo', id],
  queryFn: fetchTodo,
  initialData: () => {
    // 목록 캐시에서 가져오기
    return queryClient
      .getQueryData(['todos'])
      ?.find(todo => todo.id === id);
  },
});
```

### Push 방식: 미리 채우기

```typescript
// 목록 페치 시 상세 캐시도 채움
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const todos = await fetchTodos();

    // 각 todo를 개별 캐시에 저장
    todos.forEach(todo => {
      queryClient.setQueryData(['todo', todo.id], todo);
    });

    return todos;
  },
});
```

### Prefetching 전략

```typescript
// 라우트 진입 전 프리페칭
export const loader = async ({ params }) => {
  await queryClient.prefetchQuery({
    queryKey: ['todo', params.id],
    queryFn: () => fetchTodo(params.id),
  });
  return null;
};
```

## 11. 폼과의 통합

### 서버 상태와 폼 상태 분리

```typescript
function EditTodoForm({ id }: { id: string }) {
  const { data: serverData } = useTodo(id);
  const [formData, setFormData] = useState(serverData);

  // 서버 데이터 업데이트 시 처리
  useEffect(() => {
    if (serverData && !formData) {
      setFormData(serverData);
    }
  }, [serverData]);

  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      // 폼 리셋 또는 리다이렉트
      queryClient.invalidateQueries(['todo', id]);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id, data: formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData?.title || ''}
        onChange={(e) => setFormData({
          ...formData,
          title: e.target.value,
        })}
        disabled={mutation.isLoading}
      />
    </form>
  );
}
```

## 12. 테스팅 전략

### 테스트 환경 설정

```typescript
// test-utils.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트에서 재시도 비활성화
        gcTime: Infinity, // 가비지 컬렉션 비활성화
      },
    },
  });
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 커스텀 훅 테스트

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from './test-utils';

test('should fetch todos', async () => {
  const { result } = renderHook(() => useTodos(), {
    wrapper: createWrapper(),
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data).toHaveLength(3);
});
```

### Mock Service Worker 활용

```typescript
// mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/todos', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, title: 'Todo 1' },
        { id: 2, title: 'Todo 2' },
      ])
    );
  }),
];
```

## 13. 성능 최적화 체크리스트

### 캐싱 전략 설정

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 staleTime 설정으로 과도한 리페치 방지
      staleTime: 1000 * 60 * 5, // 5분

      // 가비지 컬렉션 시간
      gcTime: 1000 * 60 * 10, // 10분

      // 윈도우 포커스 시 리페치 (필요에 따라)
      refetchOnWindowFocus: false,

      // 재연결 시 리페치
      refetchOnReconnect: 'always',

      // 백그라운드 리페치 간격
      refetchInterval: false,
    },
  },
});
```

### 무한 쿼리 최적화

```typescript
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['todos', 'infinite'],
  queryFn: ({ pageParam = 0 }) => fetchTodos({ page: pageParam }),
  getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevPage,
});
```

## 14. 모범 사례 요약

### DO ✅

- 쿼리 키를 의존성 배열처럼 취급
- 서버 상태와 클라이언트 상태 명확히 구분
- select 옵션으로 데이터 변환 및 구독 최적화
- 적절한 staleTime 설정으로 네트워크 요청 최소화
- 데이터 우선 표시로 UX 개선
- DevTools로 캐시 상태 모니터링

### DON'T ❌

- queryCache를 글로벌 상태 관리자로 사용
- 서버 상태를 로컬 상태에 복사하여 동기화 문제 발생
- 과도한 optimistic update로 복잡성 증가
- 불필요한 수동 리페치
- select 옵션에서 새 객체/배열 생성 (메모이제이션 필요)
- 네트워크 상태를 고려하지 않은 설계

## 참고 자료

- [TkDodo's Blog Series](https://tkdodo.eu/blog/practical-react-query)
- [TanStack Query 공식 문서](https://tanstack.com/query/latest)
- [React Query ESLint Plugin](https://tanstack.com/query/latest/docs/react/eslint/eslint-plugin-query)
