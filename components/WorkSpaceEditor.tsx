"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import Lookup from "./Lookup";
import SandPackPreviewClient from "./SandPackPreviewClient";
import { useStore } from "@/lib/zustand";


type Props = {
  files: any;
};

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
                  <SandpackCodeEditor style={{ height: "70vh" }} />
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
