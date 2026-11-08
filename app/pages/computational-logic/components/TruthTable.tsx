const VARIABLE_PATTERN = /^[PQR]$/;

const SUPERSCRIPTS: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

function superscript(value: number): string {
  return String(value)
    .split("")
    .map((digit) => SUPERSCRIPTS[digit] ?? digit)
    .join("");
}

function variableCount(headers: string[]): number {
  return headers.filter((header) => VARIABLE_PATTERN.test(header)).length;
}

type TruthTableProps = {
  caption: string;
  headers: string[];
  rows: string[][];
  description?: string;
};

export default function TruthTable({ caption, headers, rows, description }: TruthTableProps) {
  const count = variableCount(headers);
  const combinations = 2 ** count;
  const variables = headers.filter((header) => VARIABLE_PATTERN.test(header)).join(", ");
  const note =
    count > 0
      ? `${count} variabel (${variables}) → 2${superscript(count)} = ${combinations} kombinasi.`
      : null;

  return (
    <>
      {description && <p className="session-one-truth-description">{description}</p>}
      <div className="session-one-table-wrap">
        <table className="session-one-table">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={`${cell}-${cellIndex}`}>{cell}</td>,
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="session-one-combination-note">{note}</p>}
    </>
  );
}
