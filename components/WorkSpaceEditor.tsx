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
    <div className="relative">
      {hasError && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs z-10">
          Build Error - Check Console
        </div>
      )}
      <SandpackCodeEditor 
        style={{ height: "70vh" }}
        showTabs
        showLineNumbers
        showInlineErrors
        wrapContent
      />
    </div>
  );
}

function WorkSpaceEditor({ files }: Props) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full max-w-4xl bg-background/90 rounded-xl shadow-lg p-4 border border-muted-foreground/10">
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
          }}
        >
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="flex gap-2 bg-muted/40 rounded-lg p-1 mb-4">
              <TabsTrigger
                value="code"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
              >
                Code Editor
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
              >
                Live Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="flex-1">
              <div className="bg-muted/30 rounded-lg p-2 shadow-inner">
                <SandpackLayout>
                  <SandpackFileExplorer style={{ height: "70vh" }} />
                  <EnhancedCodeEditor />
                </SandpackLayout>
              </div>
            </TabsContent>
            <TabsContent value="preview" className="flex-1">
              <div className="bg-muted/30 rounded-lg p-2 shadow-inner">
                <SandpackLayout>
                  <SandPackPreviewClient />
                </SandpackLayout>
              </div>
            </TabsContent>
          </Tabs>
        </SandpackProvider>
      </div>
    </div>
  );
}

export default WorkSpaceEditor;
