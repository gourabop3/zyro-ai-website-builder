"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";
import Lookup from "./Lookup";
import SandPackPreviewClient from "./SandPackPreviewClient";
import { useStore } from "@/lib/zustand";
import { Code, Smartphone, Monitor, Eye, FileText } from "lucide-react";

type Props = {
  files: any;
};

// Enhanced Code Editor Component
function EnhancedCodeEditor() {
  const { sandpack } = useSandpack();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Listen for sandpack errors
    if (sandpack.status === "error") {
      setHasError(true);
      console.error("Sandpack error:", sandpack.error);
    } else {
      setHasError(false);
    }
  }, [sandpack.status, sandpack.error]);

  return (
    <div className="relative h-full">
      {hasError && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs z-10">
          Build Error - Check Console
        </div>
      )}
      <SandpackCodeEditor 
        style={{ 
          height: "100%",
          minHeight: "60vh",
        }}
        showTabs
        showLineNumbers
        showInlineErrors
        wrapContent
        closableTabs
      />
    </div>
  );
}

// Mobile-optimized File Explorer
function MobileFileExplorer() {
  const { sandpack } = useSandpack();
  const [showExplorer, setShowExplorer] = useState(false);

  return (
    <>
      {/* Mobile File Explorer Toggle */}
      <div className="lg:hidden mb-2">
        <button
          onClick={() => setShowExplorer(!showExplorer)}
          className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          <FileText size={16} />
          Files ({Object.keys(sandpack.files).length})
        </button>
        
        {showExplorer && (
          <div className="mt-2 bg-background border rounded-lg max-h-48 overflow-y-auto">
            <SandpackFileExplorer style={{ height: "auto", minHeight: "150px" }} />
          </div>
        )}
      </div>

      {/* Desktop File Explorer */}
      <div className="hidden lg:block">
        <SandpackFileExplorer style={{ height: "60vh" }} />
      </div>
    </>
  );
}

function WorkSpaceEditor({ files }: Props) {
  const [activeView, setActiveView] = useState<"code" | "preview">("code");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center p-2 md:p-4">
      <div className="w-full max-w-7xl bg-background/95 backdrop-blur rounded-xl shadow-lg border border-muted-foreground/10 overflow-hidden">
        <SandpackProvider
          template="react"
          files={files}
          customSetup={{
            dependencies: {
              ...Lookup.DEPENDANCY,
            },
          }}
          options={{
            externalResources: [
              "https://cdn.tailwindcss.com/",
              "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            ],
            bundlerURL: "https://bundler.codesandbox.io",
            startRoute: "/",
            skipEval: false,
            recompileMode: "delayed",
            recompileDelay: 300,
            autorun: true,
            autoReload: true,
          }}
        >
          {/* Mobile Layout */}
          <div className="md:hidden">
            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "code" | "preview")} className="w-full">
              {/* Mobile Tab Header */}
              <div className="bg-muted/30 border-b p-2">
                <TabsList className="grid w-full grid-cols-2 bg-muted/60 rounded-lg p-1">
                  <TabsTrigger
                    value="code"
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all text-sm font-medium"
                  >
                    <Code size={16} />
                    Code
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all text-sm font-medium"
                  >
                    <Eye size={16} />
                    Preview
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Mobile Tab Content */}
              <TabsContent value="code" className="m-0 h-[calc(100vh-200px)] min-h-[500px]">
                <div className="p-2 h-full">
                  <MobileFileExplorer />
                  <div className="h-full bg-muted/20 rounded-lg overflow-hidden">
                    <EnhancedCodeEditor />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="m-0 h-[calc(100vh-200px)] min-h-[500px]">
                <div className="p-2 h-full">
                  <div className="h-full bg-muted/20 rounded-lg overflow-hidden">
                    <SandPackPreviewClient />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <Tabs defaultValue="split" className="w-full h-full">
              {/* Desktop Tab Header */}
              <div className="bg-muted/30 border-b p-3">
                <TabsList className="bg-muted/60 rounded-lg p-1">
                  <TabsTrigger
                    value="code"
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all px-4 py-2"
                  >
                    <Code size={18} />
                    Code Only
                  </TabsTrigger>
                  <TabsTrigger
                    value="split"
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all px-4 py-2"
                  >
                    <Monitor size={18} />
                    Split View
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all px-4 py-2"
                  >
                    <Eye size={18} />
                    Preview Only
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Desktop Tab Content */}
              <TabsContent value="code" className="m-0 h-[calc(100vh-200px)] min-h-[600px]">
                <div className="p-4 h-full">
                  <div className="bg-muted/20 rounded-lg h-full overflow-hidden">
                    <SandpackLayout>
                      <SandpackFileExplorer style={{ height: "100%", minHeight: "600px" }} />
                      <EnhancedCodeEditor />
                    </SandpackLayout>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="split" className="m-0 h-[calc(100vh-200px)] min-h-[600px]">
                <div className="p-4 h-full">
                  <div className="bg-muted/20 rounded-lg h-full overflow-hidden">
                    <SandpackLayout>
                      <div className="flex flex-col lg:flex-row h-full gap-2">
                        {/* Left Panel - File Explorer & Code */}
                        <div className="flex-1 min-h-0">
                          <div className="h-full flex">
                            <div className="w-64 bg-background/50 border-r">
                              <SandpackFileExplorer style={{ height: "100%" }} />
                            </div>
                            <div className="flex-1">
                              <EnhancedCodeEditor />
                            </div>
                          </div>
                        </div>
                        
                        {/* Right Panel - Preview */}
                        <div className="flex-1 min-h-0">
                          <SandPackPreviewClient />
                        </div>
                      </div>
                    </SandpackLayout>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="m-0 h-[calc(100vh-200px)] min-h-[600px]">
                <div className="p-4 h-full">
                  <div className="bg-muted/20 rounded-lg h-full overflow-hidden">
                    <SandPackPreviewClient />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SandpackProvider>
      </div>
    </div>
  );
}

export default WorkSpaceEditor;
