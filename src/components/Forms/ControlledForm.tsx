import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../Button';
import FormFields from './FormFields';
import formValidationSchema from '../../utils/formValidationSchema';
import type { FormTypes } from './FormTypes';
import handleControlledFormSubmit from '../../utils/handleControlledFormSubmit';
import transformErrors from '../../utils/transformErrors';

interface ControlledFormProps {
  onSubmit: (values: Record<string, unknown>) => void;
  onClose: () => void;
}

function ControlledForm({ onSubmit, onClose }: ControlledFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormTypes>({
    resolver: yupResolver(formValidationSchema) as unknown as Resolver<
      FormTypes,
      undefined
    >,
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined as unknown as number,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      country: '',
      acceptTermsAndCondition: false,
      picture: undefined,
    },
  });

  const reg = (name: string) => {
    if (name === 'age') return register('age', { valueAsNumber: true });
    if (name === 'picture') return register('picture' as keyof FormTypes);
    return register(name as keyof FormTypes);
  };

  const submit = handleSubmit(async (data: FormTypes) => {
    const values = await handleControlledFormSubmit(data);
    onSubmit(values);
    onClose();
  });

  const mappedErrors = transformErrors(errors);

  return (
    <form onSubmit={submit} noValidate>
      <FormFields errors={mappedErrors} register={reg} />
      <div className="flex justify-center gap-3 mt-4">
        <Button variant="secondary" onClick={onClose} title="Close" />
        <Button
          variant="secondary"
          type="submit"
          title="Submit"
          disabled={!isValid || isSubmitting}
        />
      </div>
    </form>
  );
}

export default ControlledForm;
