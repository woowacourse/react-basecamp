interface ErrorFallbackProps {
  error: Error;
}

<<<<<<< HEAD
const ErrorFallback = ({ error }: ErrorFallbackProps) => {
=======
function ErrorFallback({ error }: ErrorFallbackProps) {
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  return (
    <div>
      <p>Something went wrong: {error.message}</p>
    </div>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export default ErrorFallback;
