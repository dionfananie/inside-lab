interface LessonTextProps {
  text: string;
  highlights: string[];
}

export function LessonText({ text, highlights }: LessonTextProps) {
  const escaped = [...highlights]
    .sort((a, b) => b.length - a.length)
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const highlighted = new Set(highlights);
  const segments = text.split(new RegExp(`(${escaped.join('|')})`, 'g'));

  return segments.map((segment, index) =>
    highlighted.has(segment) ? (
      <code className="lesson-token" key={`${segment}-${index}`}>
        {segment}
      </code>
    ) : (
      segment
    ),
  );
}
