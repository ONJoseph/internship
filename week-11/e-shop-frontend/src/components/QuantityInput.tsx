export default function QuantityInput({
  value,
  onChange
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="rounded border px-2 py-1"
        aria-label="decrease"
      >
        −
      </button>
      <input
        value={value}
        onChange={(e) => onChange(Math.max(1, Number(e.target.value) || 1))}
        className="w-14 rounded border px-2 py-1 text-center"
        inputMode="numeric"
      />
      <button type="button" onClick={() => onChange(value + 1)} className="rounded border px-2 py-1" aria-label="increase">
        +
      </button>
    </div>
  );
}
