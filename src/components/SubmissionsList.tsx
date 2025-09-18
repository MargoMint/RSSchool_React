import ListItemOfForm from './ListItemOfForm';
import type { StoredFormData } from './Forms/FormTypes';

interface SubmissionsListProps {
  submissions: StoredFormData[];
}

function SubmissionsList({ submissions }: SubmissionsListProps) {
  return (
    <div className="mt-6 grid gap-4">
      {submissions.map((item, index) => (
        <ListItemOfForm key={index} data={item} isNew={index === 0} />
      ))}
    </div>
  );
}

export default SubmissionsList;
