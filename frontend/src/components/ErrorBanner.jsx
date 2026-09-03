export function ErrorBanner({ message, retryLabel, onRetry, retrying = false }) {
  return (
    <div
      className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900"
      role="alert"
    >
      <p>{message}</p>
      <button
        type="button"
        onClick={onRetry}
        disabled={retrying}
        className="mt-2 rounded border border-rose-300 bg-white px-3 py-1.5 text-sm font-medium text-rose-900 disabled:opacity-50"
      >
        {retryLabel}
      </button>
    </div>
  );
}
