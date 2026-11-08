export default function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="session-one-code">
      <code>{children}</code>
    </pre>
  );
}
