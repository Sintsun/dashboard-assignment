export function EmptyState({ children, dashed = false }) {
  if (dashed) {
    return (
      <p className="rounded-lg border border-dashed border-rule bg-card px-4 py-10 text-center text-sm text-muted">
        {children}
      </p>
    );
  }

  return <p className="text-sm text-muted">{children}</p>;
}
