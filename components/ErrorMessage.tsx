interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-red-900 mb-1">
            Something went wrong
          </h3>
          <p className="text-sm sm:text-base text-red-700 break-words">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 sm:mt-4 px-4 py-2 bg-red-600 text-white text-sm sm:text-base rounded-lg hover:bg-red-700 active:scale-95 transition-all w-full sm:w-auto"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
