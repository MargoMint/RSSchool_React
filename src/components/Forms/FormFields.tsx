import Input from '../Input';
import ErrorMessage from '../ErrorMessage';

const FORM_FIELD_WRAPPER = 'flex flex-col';
const FORM_LABEL = 'font-bold text-[var(--primary-pink)] mb-1';
const FORM_CONTROL_BASE =
  'appearance-none rounded-lg border-2 p-2 w-full bg-[var(--primary-white)] text-[var(--primary-green)] border-[var(--primary-pink)]';

interface FormFieldsProps {
  errors: Record<string, string | undefined>;
  register?: (name: string) => Record<string, unknown>;
}

function FormFields({ errors, register }: FormFieldsProps) {
  const reg = (name: string) => (register ? register(name) : { name });

  return (
    <>
      <div className="flex gap-3">
        <div className={`${FORM_FIELD_WRAPPER} flex-[2]`}>
          <label htmlFor="name" className={FORM_LABEL}>
            Name
          </label>
          <Input
            id="name"
            {...reg('name')}
            type="text"
            placeholder="Enter your name"
            variant={errors.name ? 'error' : 'base'}
          />
          <ErrorMessage message={errors.name} />
        </div>
        <div className={`${FORM_FIELD_WRAPPER} flex-[1]`}>
          <label htmlFor="age" className={FORM_LABEL}>
            Age
          </label>
          <Input
            id="age"
            {...reg('age')}
            type="number"
            placeholder="Enter your age"
            variant={errors.age ? 'error' : 'base'}
          />
          <ErrorMessage message={errors.age} />
        </div>
      </div>

      <div className={FORM_FIELD_WRAPPER}>
        <label htmlFor="email" className={FORM_LABEL}>
          Email
        </label>
        <Input
          id="email"
          {...reg('email')}
          type="email"
          placeholder="Enter your email"
          variant={errors.email ? 'error' : 'base'}
        />
        <ErrorMessage message={errors.email} />
      </div>

      <div className="flex gap-3">
        <div className={`${FORM_FIELD_WRAPPER} flex-[1]`}>
          <label htmlFor="password" className={FORM_LABEL}>
            Password
          </label>
          <Input
            id="password"
            {...reg('password')}
            type="password"
            placeholder="Enter your password"
            variant={errors.password ? 'error' : 'base'}
          />
          <ErrorMessage message={errors.password} />
        </div>
        <div className={`${FORM_FIELD_WRAPPER} flex-[1]`}>
          <label htmlFor="confirmPassword" className={FORM_LABEL}>
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            {...reg('confirmPassword')}
            type="password"
            placeholder="Confirm your password"
            variant={errors.confirmPassword ? 'error' : 'base'}
          />
          <ErrorMessage message={errors.confirmPassword} />
        </div>
      </div>

      <div className="flex gap-3">
        <div className={`${FORM_FIELD_WRAPPER} flex-[1]`}>
          <label htmlFor="gender" className={FORM_LABEL}>
            Gender
          </label>
          <select
            id="gender"
            {...reg('gender')}
            className={FORM_CONTROL_BASE}
            defaultValue=""
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <ErrorMessage message={errors.gender} />
        </div>
        <div className={`${FORM_FIELD_WRAPPER} flex-[2]`}>
          <label htmlFor="country" className={FORM_LABEL}>
            Country
          </label>
          <Input
            id="country"
            {...reg('country')}
            type="text"
            placeholder="Enter country"
            variant={errors.country ? 'error' : 'base'}
          />
          <ErrorMessage message={errors.country} />
        </div>
      </div>

      <div className={FORM_FIELD_WRAPPER}>
        <label htmlFor="picture" className={FORM_LABEL}>
          Picture
        </label>
        <Input
          id="picture"
          {...reg('picture')}
          type="file"
          accept="image/png,image/jpeg"
          variant={errors.picture ? 'error' : 'base'}
        />
        <ErrorMessage message={errors.picture} />
      </div>

      <div className="flex items-center mb-2">
        <input
          id="acceptTermsAndCondition"
          type="checkbox"
          className="mr-1"
          {...reg('acceptTermsAndCondition')}
        />
        <label htmlFor="acceptTermsAndCondition" className={FORM_LABEL}>
          Accept Terms &amp; Conditions
        </label>
        <ErrorMessage message={errors.acceptTermsAndCondition} />
      </div>
    </>
  );
}

export default FormFields;
