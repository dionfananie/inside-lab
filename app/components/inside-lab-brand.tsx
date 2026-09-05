export function InsideLabBrand({ area }: { area: string }) {
  return (
    <a className="inside-brand" href="/" aria-label={`insideLab - ${area}`}>
      <span className="inside-mark" aria-hidden="true">
        i<span>L</span><i>.</i>
      </span>
      <span className="inside-brand-copy">
        <strong>insideLab</strong>
        <span>{area}</span>
      </span>
    </a>
  );
}
