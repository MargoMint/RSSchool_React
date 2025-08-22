import { useState } from 'react';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';

export const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsModalOpen(true)}
        title="Open Modal"
        variant="primary"
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p className="text-xl font-semibold mb-4">Modal</p>
        </Modal>
      )}
    </div>
  );
};
