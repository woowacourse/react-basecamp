interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  return (
    <div>
      <p>Something went wrong: {error.message}</p>
    </div>
  );
};

export default ErrorFallback;
