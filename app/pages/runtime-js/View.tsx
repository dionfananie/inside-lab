import type { CSSProperties } from "react";

import RuntimeHeader from "./components/RuntimeHeader";
import RuntimeIntro from "./components/RuntimeIntro";
import RuntimePageFooter from "./components/RuntimePageFooter";
import RuntimePlayground from "./components/RuntimePlayground";
import useRuntimeJs from "./hook";

export default function RuntimeJsPage() {
  const runtime = useRuntimeJs();
  const { themeName, fullscreen, theme, fontSize } = runtime;

  return (
    <main
      className={`runtime-workspace ${themeName === "Vercel Light" ? "runtime-light" : "dark"}${
        fullscreen ? " runtime-fullscreen" : ""
      }`}
      style={
        {
          "--runtime-editor-bg": theme.background,
          "--runtime-font-size": `${fontSize}px`,
        } as CSSProperties
      }
    >
      <RuntimeHeader />
      <RuntimeIntro />
      <RuntimePlayground runtime={runtime} />
      <RuntimePageFooter />
    </main>
  );
}
