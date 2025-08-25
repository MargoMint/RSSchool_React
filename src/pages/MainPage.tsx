import { useState } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import UncontrolledForm from '../components/Forms/UncontrolledForm';
import ControlledForm from '../components/Forms/ControlledForm';
import HeroImage from '../components/HeroImage';
import Layout from '../components/Layout';
import handleFormSubmission from '../utils/handleFormSubmission';
import { useAppSelector } from '../store/hooks';
import { selectSubmissions } from '../store/formSelectors';
import ListItemOfForm from '../components/ListItemOfForm';

export const MainPage = () => {
  const [ModalOpen, setModalOpen] = useState<
    'uncontrolled' | 'controlled' | null
  >(null);

  const submissions = useAppSelector(selectSubmissions);

  return (
    <Layout>
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setModalOpen('uncontrolled')}
          title="Open Uncontrolled Form"
          variant="outline"
        />
        <Button
          onClick={() => setModalOpen('controlled')}
          title="Open Controlled Form"
          variant="primary"
        />
      </div>

      {ModalOpen && (
        <Modal
          onClose={() => setModalOpen(null)}
          title={
            ModalOpen === 'uncontrolled'
              ? 'Uncontrolled Form'
              : 'Controlled Form'
          }
        >
          {ModalOpen === 'uncontrolled' ? (
            <UncontrolledForm
              onSubmit={(values) => {
                void handleFormSubmission(values);
              }}
              onClose={() => setModalOpen(null)}
            />
          ) : (
            <ControlledForm
              onSubmit={(values) => {
                void handleFormSubmission(values);
              }}
              onClose={() => setModalOpen(null)}
            />
          )}
        </Modal>
      )}

      <HeroImage />

      <div className="mt-6 grid gap-4">
        {submissions.map((item, index) => (
          <ListItemOfForm key={index} data={item} isNew={index === 0} />
        ))}
      </div>
    </Layout>
  );
};
