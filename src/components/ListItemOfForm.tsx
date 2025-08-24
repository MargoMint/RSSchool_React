import type { StoredFormData } from './Forms/formTypes';

interface ListItemOfFormProps {
  data: StoredFormData;
  isNew?: boolean;
}

function ListItemOfForm({ data, isNew }: ListItemOfFormProps) {
  return (
    <div
      className={`border-2 border-[var(--primary-dark)] p-4 rounded-lg ${
        isNew ? 'bg-[var(--primary-pink)]' : 'bg-[var(--primary-white)]'
      }`}
    >
      <div className="flex items-center gap-4">
        {
          <img
            src={data.picture}
            alt={`${data.name} img`}
            className="w-25 h-25 object-cover rounded-lg"
          />
        }
        <div>
          <p className="text-[var(--primary-dark)] font-bold text-lg">
            {data.name}
          </p>
          <p className="text-sm">Age: {data.age}</p>
          <p className="text-sm">Email: {data.email}</p>
          <p className="text-sm">Country: {data.country}</p>
          <p className="text-sm">Gender: {data.gender}</p>
        </div>
      </div>
    </div>
  );
}

export default ListItemOfForm;
