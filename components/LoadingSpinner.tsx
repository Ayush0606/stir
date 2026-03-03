export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 animate-fade-in">
      <div className="relative w-12 h-12 sm:w-16 sm:h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 font-medium text-center">
        Loading movie insights...
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
        Fetching data and analyzing sentiment
      </p>
    </div>
  );
}
