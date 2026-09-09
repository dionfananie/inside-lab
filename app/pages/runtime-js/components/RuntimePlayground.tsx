import type { RuntimeJsModel } from "../useRuntimeJs";
import RuntimeEditorPane from "./RuntimeEditorPane";
import RuntimeOutputPane from "./RuntimeOutputPane";
import RuntimeStatusBar from "./RuntimeStatusBar";
import RuntimeToolbar from "./RuntimeToolbar";

type RuntimePlaygroundProps = {
  runtime: RuntimeJsModel;
};

export default function RuntimePlayground({ runtime }: RuntimePlaygroundProps) {
  return (
    <section className="runtime-playground" aria-label="JavaScript playground">
      <RuntimeToolbar runtime={runtime} />
      <div className="runtime-panes">
        <RuntimeEditorPane runtime={runtime} />
        <RuntimeOutputPane runtime={runtime} />
      </div>
      <RuntimeStatusBar runtime={runtime} />
    </section>
  );
}
