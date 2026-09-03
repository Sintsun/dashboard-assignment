import { WIDGET_CATALOG } from '../hooks/useDashboardLayout';

export function LayoutPicker({ layout, onToggle, onReset }) {
  return (
    <details className="relative">
      <summary className="cursor-pointer list-none rounded border border-rule bg-card px-3 py-1.5 text-sm font-medium marker:content-none">
        Customise board
      </summary>
      <div className="absolute right-0 z-20 mt-2 w-72 rounded-lg border border-rule bg-card p-3 shadow-lg">
        <p className="mb-2 text-xs text-muted">
          Show or hide widgets. Drag a widget header to change order. Layout is saved on this
          browser.
        </p>
        <ul className="space-y-1">
          {WIDGET_CATALOG.map((widget) => {
            const checked = !layout.hidden.includes(widget.id);
            return (
              <li key={widget.id}>
                <label className="flex items-start gap-2 rounded px-1 py-1.5 text-sm hover:bg-paper">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={checked}
                    onChange={() => onToggle(widget.id)}
                  />
                  <span>
                    <span className="block font-medium">{widget.title}</span>
                    <span className="block text-xs text-muted">{widget.hint}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 w-full rounded border border-rule py-1.5 text-sm"
        >
          Reset layout
        </button>
      </div>
    </details>
  );
}
