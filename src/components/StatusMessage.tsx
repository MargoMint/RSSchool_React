interface StatusMessageProps {
  isLoading: boolean;
  error: string | null;
}

function StatusMessage({ isLoading, error }: StatusMessageProps) {
  if (isLoading) {
    return <p className="text-center text-red-300">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-300">{error}</p>;
  }

  return null;
}

export default StatusMessage;
