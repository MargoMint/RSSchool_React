import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import Modal from '../components/Modal/Modal';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  let portalRoot: HTMLElement;

  beforeAll(() => {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
  });

  afterAll(() => {
    document.body.removeChild(portalRoot);
  });

  test('should render the modal and close on backdrop click', async () => {
    const userAction = userEvent.setup();
    const onCloseMock = vi.fn();
    render(
      <Modal onClose={onCloseMock} title="Test Title">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    const backdrop = screen.getByRole('dialog').querySelector('.absolute');
    if (backdrop) {
      await userAction.click(backdrop);
    }
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('should close the modal when the ESC key is pressed', async () => {
    const userAction = userEvent.setup();
    const onCloseMock = vi.fn();
    render(
      <Modal onClose={onCloseMock} title="Test Title">
        <div>Modal Content</div>
      </Modal>
    );
    await userAction.keyboard('{Escape}');
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('should render the modal content inside the portal element', () => {
    const onCloseMock = vi.fn();
    render(
      <Modal onClose={onCloseMock} title="Test Title">
        <div>Modal Content</div>
      </Modal>
    );
    expect(portalRoot.firstChild).toBeInTheDocument();
  });
});
