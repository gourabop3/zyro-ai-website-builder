type Props = {};

import { useStore } from "@/lib/zustand";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, RotateCcw, Smartphone, Monitor } from "lucide-react";

function SandPackPreviewClient({}: Props) {
  const previewRef = useRef<any>(null);
  const { action } = useStore();
  const { sandpack } = useSandpack();
  const [isMobile, setIsMobile] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      try {
        const result = await client.getCodeSandboxURL();
        if (action === "deploy") {
          window.open(`https://${result?.sandboxId}.csb.app/`, '_blank');
        } else if (action === "export") {
          window.open(result?.editorUrl, '_blank');
        }
      } catch (error) {
        console.error("Error getting CodeSandbox URL:", error);
      }
    }
  };

  const refreshPreview = () => {
    const client = previewRef.current?.getClient();
    if (client) {
      client.updatePreview({
        clear: true
      });
    }
  };

  useEffect(() => {
    if (action && (action === "deploy" || action === "export")) {
      getSandpackClient();
    }
  }, [action]);

  const previewStyle = {
    height: isMobile ? "calc(100vh - 300px)" : "100%",
    width: "100%",
    minHeight: isMobile ? "400px" : "500px",
    maxWidth: previewMode === "mobile" && !isMobile ? "375px" : "100%",
    margin: previewMode === "mobile" && !isMobile ? "0 auto" : "0",
    border: previewMode === "mobile" && !isMobile ? "1px solid #e5e5e5" : "none",
    borderRadius: previewMode === "mobile" && !isMobile ? "20px" : "0",
    overflow: "hidden"
  };

  // Check for loading/error states using available statuses
  const isLoading = sandpack.status === "initial";
  const hasError = sandpack.status === "timeout";
  const isReady = sandpack.status === "done" || sandpack.status === "idle";

  return (
    <div className="h-full w-full flex flex-col">
      {/* Preview Controls - Only show on desktop */}
      {!isMobile && (
        <div className="flex items-center justify-between p-2 bg-muted/20 border-b">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                previewMode === "desktop" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              }`}
            >
              <Monitor size={14} />
              Desktop
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                previewMode === "mobile" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              }`}
            >
              <Smartphone size={14} />
              Mobile
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={refreshPreview}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium hover:bg-muted transition-colors"
              title="Refresh Preview"
            >
              <RotateCcw size={14} />
              Refresh
            </button>
            <button
              onClick={getSandpackClient}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium hover:bg-muted transition-colors"
              title="Open in New Tab"
            >
              <ExternalLink size={14} />
              Open
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="spinner"></div>
            <span className="text-sm">Initializing...</span>
          </div>
        </div>
      )}

      {/* Error/Timeout State */}
      {hasError && (
        <div className="flex items-center justify-center h-32 bg-red-50 text-red-700 rounded-lg m-2">
          <div className="text-center">
            <div className="text-sm font-medium">Build Timeout</div>
            <div className="text-xs mt-1">Try refreshing the preview</div>
          </div>
        </div>
      )}

      {/* Preview */}
      <div className="flex-1 flex justify-center p-2">
        <div style={previewStyle} className="relative">
          {previewMode === "mobile" && !isMobile && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
              Mobile Preview (375px)
            </div>
          )}
          <SandpackPreview
            style={{ 
              height: "100%", 
              width: "100%",
              border: "none",
              borderRadius: previewMode === "mobile" && !isMobile ? "20px" : "0"
            }}
            showNavigator={!isMobile}
            showRefreshButton={false}
            showOpenInCodeSandbox={false}
            ref={previewRef}
            actionsChildren={null}
          />
        </div>
      </div>

      {/* Mobile Quick Actions */}
      {isMobile && (
        <div className="flex items-center justify-center gap-4 p-2 bg-muted/20 border-t">
          <button
            onClick={refreshPreview}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-background hover:bg-muted transition-colors"
          >
            <RotateCcw size={14} />
            Refresh
          </button>
          <button
            onClick={getSandpackClient}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-background hover:bg-muted transition-colors"
          >
            <ExternalLink size={14} />
            Open
          </button>
        </div>
      )}
    </div>
  );
}

export default SandPackPreviewClient;
