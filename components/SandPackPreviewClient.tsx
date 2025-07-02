type Props = {};

import { useStore } from "@/lib/zustand";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { useEffect, useRef } from "react";

function SandPackPreviewClient({}: Props) {
  const previewRef = useRef<any>(null);
  const { action } = useStore();
  const { sandpack } = useSandpack();

  const getSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      const result = await client.getCodeSandboxURL();
      if (action === "deploy") {
        window.open(`https://${result?.sandboxId}.csb.app/`);
      } else if (action === "export") {
        window.open(result?.editorUrl);
      }
    }
  };

  useEffect(() => {
    getSandpackClient();
  }, [sandpack && action]);

  return (
    <SandpackPreview
      style={{ height: "70vh", width: "100%" }}
      showNavigator
      ref={previewRef}
    />
  );
}

export default SandPackPreviewClient;
