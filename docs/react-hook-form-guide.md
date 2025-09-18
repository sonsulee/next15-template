# React Hook Form 사용 가이드라인

## 1. TypeScript 타입 정의

### 폼 데이터 타입 정의

```typescript
// 폼 데이터 인터페이스 정의
interface FormData {
  username: string;
  email: string;
  age: number;
  role: 'admin' | 'user' | 'guest';
  newsletter: boolean;
  birthDate: Date | null;
}

// useForm에 타입 적용
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  defaultValues: {
    username: '',
    email: '',
    age: 0,
    role: 'user',
    newsletter: false,
    birthDate: null,
  },
});
```

### 타입 추론 활용

```typescript
// ✅ Good: 타입 추론 활용
const methods = useForm<FormData>();

// ❌ Bad: 불필요한 타입 명시
const methods = useForm<FormData, any, FormData>();
```

## 2. 성능 최적화

### Uncontrolled Components 활용

```typescript
// React Hook Form은 기본적으로 uncontrolled 방식
function FormComponent() {
  const { register } = useForm<FormData>();

  return (
    <form>
      {/* ref를 통한 직접 DOM 접근으로 리렌더링 최소화 */}
      <input {...register('username')} />
      <input {...register('email')} />
    </form>
  );
}
```

### 구독 기반 상태 관리

```typescript
// useWatch: 특정 필드만 구독
function WatchExample() {
  const { control } = useForm<FormData>();
  const watchedRole = useWatch({
    control,
    name: 'role', // role 필드만 구독
  });

  return (
    <div>
      {watchedRole === 'admin' && <AdminOptions />}
    </div>
  );
}

// useFormState: 특정 form 상태만 구독
function FormStateExample() {
  const { control } = useForm<FormData>();
  const { isDirty, isValid } = useFormState({ control });

  return (
    <button disabled={!isDirty || !isValid}>
      Submit
    </button>
  );
}
```

## 3. 유효성 검증

### HTML 네이티브 검증

```typescript
// 기본 HTML5 검증 활용
<input
  {...register('email', {
    required: '이메일은 필수입니다',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: '올바른 이메일 형식이 아닙니다',
    },
  })}
  type="email"
/>
```

### 스키마 기반 검증 (Zod)

```typescript
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod 스키마 정의
const formSchema = z.object({
  username: z.string().min(3, '최소 3자 이상'),
  email: z.string().email('올바른 이메일을 입력하세요'),
  age: z.number().min(1).max(120),
  password: z
    .string()
    .min(8, '최소 8자 이상')
    .regex(/[A-Z]/, '대문자 포함')
    .regex(/[0-9]/, '숫자 포함'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof formSchema>;

// useForm에 resolver 적용
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(formSchema),
});
```

### 커스텀 검증

```typescript
<input
  {...register('username', {
    validate: {
      // 단일 검증
      checkUsername: async (value) => {
        const isValid = await checkUsernameAPI(value);
        return isValid || '이미 사용중인 사용자명입니다';
      },
      // 다중 검증
      noAdmin: (value) =>
        !value.includes('admin') || 'admin은 사용할 수 없습니다',
      minLength: (value) =>
        value.length >= 3 || '최소 3자 이상 입력하세요',
    },
  })}
/>
```

## 4. 컴포넌트 패턴

### Controller 컴포넌트 사용

```typescript
// 외부 UI 라이브러리와 통합
import { Controller } from 'react-hook-form';
import { DatePicker } from '@/components/ui/date-picker';
import { Select } from '@/components/ui/select';

function ControlledComponents() {
  const { control } = useForm<FormData>();

  return (
    <>
      {/* 날짜 선택기 */}
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      {/* Select 컴포넌트 */}
      <Controller
        name="role"
        control={control}
        rules={{ required: '역할을 선택하세요' }}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            error={fieldState.error?.message}
            options={[
              { value: 'admin', label: '관리자' },
              { value: 'user', label: '사용자' },
              { value: 'guest', label: '게스트' },
            ]}
          />
        )}
      />
    </>
  );
}
```

### FormProvider 패턴

```typescript
// 중첩된 폼 컴포넌트에서 context 활용
function ParentForm() {
  const methods = useForm<FormData>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <PersonalInfo />
        <AddressInfo />
        <PaymentInfo />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}

// 자식 컴포넌트에서 useFormContext 사용
function PersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>(); // 타입 안전성 유지

  return (
    <div>
      <input {...register('username')} />
      {errors.username && <span>{errors.username.message}</span>}
    </div>
  );
}
```

## 5. 동적 폼 필드

### useFieldArray 활용

```typescript
interface FormData {
  users: {
    name: string;
    email: string;
    role: string;
  }[];
}

function DynamicFields() {
  const { control, register } = useForm<FormData>({
    defaultValues: {
      users: [{ name: '', email: '', role: '' }],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'users',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`users.${index}.name`)} />
          <input {...register(`users.${index}.email`)} />
          <select {...register(`users.${index}.role`)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button type="button" onClick={() => remove(index)}>
            삭제
          </button>
          <button type="button" onClick={() => move(index, index - 1)}>
            위로
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: '', email: '', role: 'user' })}
      >
        사용자 추가
      </button>
    </div>
  );
}
```

## 6. 에러 처리

### 에러 표시 패턴

```typescript
// 에러 메시지 컴포넌트
function ErrorMessage({ error }: { error?: FieldError }) {
  if (!error) return null;

  return (
    <span className="text-red-500 text-sm">
      {error.message}
    </span>
  );
}

// 사용 예제
function FormWithErrors() {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <div>
      <input
        {...register('email', { required: '필수 입력입니다' })}
        aria-invalid={errors.email ? 'true' : 'false'}
        className={errors.email ? 'border-red-500' : ''}
      />
      <ErrorMessage error={errors.email} />
    </div>
  );
}
```

### 프로그래매틱 에러 설정

```typescript
function FormWithManualErrors() {
  const { setError, clearErrors } = useForm<FormData>();

  const handleAPIError = (apiError: APIError) => {
    // API 에러를 폼 에러로 변환
    if (apiError.field) {
      setError(apiError.field as Path<FormData>, {
        type: 'manual',
        message: apiError.message,
      });
    } else {
      // 전체 폼 에러
      setError('root', {
        type: 'manual',
        message: apiError.message,
      });
    }
  };

  return (
    <form>
      {/* 폼 필드들 */}
    </form>
  );
}
```

## 7. 폼 제출 처리

### 기본 제출 패턴

```typescript
function SubmitExample() {
  const { handleSubmit, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await submitToAPI(data);
      toast.success('제출 완료!');
      reset(); // 폼 초기화
    } catch (error) {
      toast.error('제출 실패');
    }
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => {
    // 검증 에러 처리
    console.error('Validation errors:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* 폼 필드들 */}
      <button type="submit">제출</button>
    </form>
  );
}
```

### 폼 상태 관리

```typescript
function FormStateManagement() {
  const {
    formState: {
      isDirty,
      isValid,
      isSubmitting,
      isSubmitSuccessful,
      submitCount,
      dirtyFields,
      touchedFields,
    },
  } = useForm<FormData>();

  return (
    <div>
      <button
        type="submit"
        disabled={!isDirty || !isValid || isSubmitting}
      >
        {isSubmitting ? '제출 중...' : '제출'}
      </button>

      {isSubmitSuccessful && (
        <p>성공적으로 제출되었습니다!</p>
      )}

      {submitCount > 0 && !isValid && (
        <p>제출 시도: {submitCount}회</p>
      )}
    </div>
  );
}
```

## 8. 폼 값 관리

### setValue와 getValue

```typescript
function ValueManagement() {
  const { setValue, getValue, getValues } = useForm<FormData>();

  // 단일 값 설정
  const handleAutoFill = () => {
    setValue('email', 'user@example.com', {
      shouldValidate: true, // 검증 실행
      shouldDirty: true,    // dirty 상태 변경
      shouldTouch: true,    // touched 상태 변경
    });
  };

  // 여러 값 동시 설정
  const handleBulkUpdate = () => {
    const currentValues = getValues();

    Object.entries(defaultData).forEach(([key, value]) => {
      setValue(key as Path<FormData>, value);
    });
  };

  // 조건부 값 가져오기
  const handleConditionalLogic = () => {
    const role = getValue('role');
    if (role === 'admin') {
      setValue('permissions', ['all']);
    }
  };

  return <>{/* 폼 UI */}</>;
}
```

### watch 사용

```typescript
function WatchExample() {
  const { watch, register } = useForm<FormData>();

  // 전체 폼 구독
  const formValues = watch();

  // 특정 필드 구독
  const watchRole = watch('role');

  // 여러 필드 구독
  const [username, email] = watch(['username', 'email']);

  // 콜백과 함께 사용
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type);
      // name: 변경된 필드명
      // type: 변경 타입
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      {watchRole === 'admin' && <AdminPanel />}
    </div>
  );
}
```

## 9. 재사용 가능한 폼 컴포넌트

### 커스텀 Input 컴포넌트

```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<FormData>;
  label: string;
  rules?: RegisterOptions;
}

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, rules, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<FormData>();

    const error = errors[name];

    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          {...register(name, rules)}
          {...props}
          aria-invalid={!!error}
          className={cn('input', error && 'input-error')}
        />
        {error && (
          <span className="error-message">{error.message}</span>
        )}
      </div>
    );
  }
);
```

### 폼 래퍼 컴포넌트

```typescript
interface FormWrapperProps<TFieldValues extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  schema?: ZodSchema;
}

function FormWrapper<TFieldValues extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  schema,
}: FormWrapperProps<TFieldValues>) {
  const methods = useForm<TFieldValues>({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
```

## 10. 서버 액션 통합 (Next.js)

### Server Actions와 통합

```typescript
// app/actions/user.ts
'use server';

export async function createUser(formData: FormData) {
  const data = Object.fromEntries(formData);

  // 서버에서 검증
  const validated = userSchema.parse(data);

  // DB 저장
  await db.user.create({ data: validated });

  revalidatePath('/users');
  return { success: true };
}

// app/components/user-form.tsx
'use client';

function UserForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await createUser(formData);
      if (result.success) {
        toast.success('사용자 생성 완료');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} disabled={isPending} />
      <input {...register('email')} disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? '처리 중...' : '생성'}
      </button>
    </form>
  );
}
```

## 11. 테스팅

### React Testing Library 사용

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FormComponent', () => {
  it('should display required error when value is invalid', async () => {
    render(<FormComponent />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<FormComponent onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'test@example.com');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });
  });
});
```

## 12. 성능 최적화 팁

### 1. 리렌더링 최소화

```typescript
// ❌ Bad: 전체 폼 watch로 불필요한 리렌더링
const allValues = watch();

// ✅ Good: 필요한 필드만 구독
const specificField = watch('specificField');
const { isDirty } = useFormState({ control });
```

### 2. 메모이제이션 활용

```typescript
const ValidationRules = useMemo(
  () => ({
    required: '필수 입력입니다',
    minLength: { value: 3, message: '최소 3자 이상' },
  }),
  []
);
```

### 3. 지연 검증

```typescript
const { register } = useForm<FormData>({
  mode: 'onBlur', // onChange 대신 onBlur 사용
  reValidateMode: 'onBlur',
});
```

## 참고 자료

- [React Hook Form 공식 문서](https://react-hook-form.com/)
- [TypeScript 지원 가이드](https://react-hook-form.com/ts)
- [성능 최적화 가이드](https://react-hook-form.com/advanced-usage)
- [API 레퍼런스](https://react-hook-form.com/api)
