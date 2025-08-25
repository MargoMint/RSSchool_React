import { useState, type FormEvent } from 'react';
import Button from '../Button';
import FormFields from './FormFields';
import type { FormErrors } from '../../utils/validateFormData';
import handleUncontrolledFormSubmit from '../../utils/handleUncontrolledFormSubmit';

interface UncontrolledFormProps {
  onSubmit: (values: Record<string, unknown>) => void;
  onClose: () => void;
}

function UncontrolledForm({ onSubmit, onClose }: UncontrolledFormProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const { values, errors } = await handleUncontrolledFormSubmit(formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSubmit(values);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormFields errors={errors} />
      <div className="flex justify-center gap-3 mt-4">
        <Button variant="secondary" onClick={onClose} title="Close" />
        <Button variant="secondary" type="submit" title="Submit" />
      </div>
    </form>
  );
}

export default UncontrolledForm;
