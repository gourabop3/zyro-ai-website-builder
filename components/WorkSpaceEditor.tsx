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

// E2B Code Execution Hook
function useE2BExecution() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResults, setExecutionResults] = useState<any>(null);

  const executeCode = async (code: string, workspaceId?: string) => {
    setIsExecuting(true);
    try {
      const response = await fetch("/api/execute-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code.trim(),
          workspaceId,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setExecutionResults(data.data);
        return data.data;
      } else {
        console.error("E2B execution failed:", data.message);
        return null;
      }
    } catch (error) {
      console.error("E2B execution error:", error);
      return null;
    } finally {
      setIsExecuting(false);
    }
  };

  return { executeCode, isExecuting, executionResults };
}

// Enhanced Code Editor with E2B
function EnhancedCodeEditor() {
  const { sandpack } = useSandpack();
  const { executeCode } = useE2BExecution();

  useEffect(() => {
    // Listen for code changes and auto-execute Python code if detected
    const checkAndExecutePython = async () => {
      const activeFile = sandpack.files[sandpack.activeFile];
      if (activeFile && sandpack.activeFile.endsWith('.py')) {
        // Auto-execute Python files with E2B
        await executeCode(activeFile.code);
      }
    };

    // Debounce the execution
    const timeoutId = setTimeout(checkAndExecutePython, 1000);
    return () => clearTimeout(timeoutId);
  }, [sandpack.files, sandpack.activeFile]);

  return <SandpackCodeEditor style={{ height: "70vh" }} />;
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
            externalResources: ["https://cdn.tailwindcss.com/"],
          }}
        >
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="flex gap-2 bg-muted/40 rounded-lg p-1 mb-4">
              <TabsTrigger
                value="code"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
              >
                Code
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
              >
                Preview
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
