interface ErrorMessageProps {
  message?: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="min-h-[1.7em] text-[var(--primary-dark)] text-sm">
      {message || ''}
    </div>
  );
}

export default ErrorMessage;
