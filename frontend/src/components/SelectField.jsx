export const FIELD_CLASS =
  'h-9 rounded border border-rule bg-paper px-2.5 text-sm text-ink outline-none focus:border-ink';

export function SelectField({ label, value, onChange, options, allLabel, getLabel }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-muted">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className={FIELD_CLASS}>
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {getLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
