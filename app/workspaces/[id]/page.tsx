"use client";

import Lookup from "@/components/Lookup";
import { Skeleton } from "@/components/ui/skeleton";
import WorkSpaceEditor from "@/components/WorkSpaceEditor";
import { useStore, useWorkspaceStore } from "@/lib/zustand";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {};

function page({}: Props) {
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCoding, setIsCoding] = useState(false);
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const { workspace, setWorkspace } = useWorkspaceStore();
  const [isLoading, setIsLoading] = useState(true);

  const { setAction } = useStore();
  const params = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", message: input };
    setChatMessages((prev) => [...prev, userMessage]);
    // Create chatMessage in DB
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: "user",
        message: input,
        workspaceId: workspace.id,
      }),
    });
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `PrevFiles:${JSON.stringify(files)}  input:${input}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setChatMessages((prev) => [
          ...prev,
          { sender: "assistant", message: data.message },
        ]);
        // Create assistant chatMessage in DB
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender: "assistant",
            message: data.message,
            workspaceId: workspace.id,
          }),
        });
        setLoading(false);
        setIsCoding(true);
        const res2 = await fetch("/api/ai-codegen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Present Files: ${JSON.stringify(
              files
            )}, Previous Messages: ${JSON.stringify(
              chatMessages
            )}, ChatMessage: ${data.message}`,
          }),
        });
        const data2 = await res2.json();

        const mergedFiles = {
          ...Lookup.DEFAULT_FILE,
          ...data2.code.files,
        };
        setFiles(mergedFiles as any);
        fetch("/api/files", {
          method: "POST",
          body: JSON.stringify({
            fileString: JSON.stringify(mergedFiles),
            workspaceId: workspace.id,
          }),
        });
        setIsCoding(false);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { sender: "assistant", message: `Error: ${data.message}` },
        ]);
        setLoading(false);
      }
    } catch (error) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          message: "An error occurred. Please try again.",
        },
      ]);
      setLoading(false);
    }
  };

  const handleExport = () => {
    // TODO: Implement export logic (e.g., download files as zip)
    setAction("export");
  };

  const handleDeploy = () => {
    // TODO: Implement deploy logic (e.g., send files to deployment API)
    setAction("deploy");
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/workspace/${params.id}`, {
        method: "GET",
      });
      const result = await res.json();

      if (result.data.filesVersions?.length > 0) {
        setFiles(JSON.parse(result.data.filesVersions[0].files));
      }
      setWorkspace(result.data);
      setChatMessages(result.data.chatMessages);
    } catch (error) {
      console.error("Error loading workspace:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ChatMessageSkeleton = ({ isUser = false }: { isUser?: boolean }) => (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={
          isUser
            ? "bg-background border px-4 py-2 rounded-lg shadow max-w-xs"
            : "bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow max-w-xs"
        }
      >
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className={`h-3 w-8 mt-1 ${isUser ? "mr-1" : "ml-1"}`} />
    </div>
  );

  const WorkspaceEditorSkeleton = () => (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 p-4 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );

  return (
    <div className="w-screen h-screen">
      <header className="w-full bg-background/80 backdrop-blur sticky top-0 z-20">
        <div className=" flex items-center justify-between px-4 py-4">
          {/* Left: Logo and App Name */}
          <Link href="/workspaces" className="flex items-center gap-2 min-w-0">
            <>
              <Image src="/logo.svg" alt="Zyro Logo" width={28} height={28} />
              <span className="font-bold text-lg text-foreground whitespace-nowrap tracking-tight drop-shadow-sm">
                Zyro
              </span>
            </>
          </Link>
          {/* Center: Workspace Name */}
          <div className="flex-1 flex justify-center">
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <span className="font-semibold text-base text-foreground truncate max-w-xs text-center opacity-90">
                {workspace && workspace?.title}
              </span>
            )}
          </div>
          {/* Right: Export and Deploy Buttons */}
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/70 focus:ring-2 focus:ring-primary/30 transition-all text-sm shadow-sm border border-muted-foreground/10"
              onClick={handleExport}
            >
              Export
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/80 focus:ring-2 focus:ring-primary/30 transition-all text-sm shadow-sm border border-primary/20"
              onClick={handleDeploy}
            >
              Deploy
            </button>
          </div>
        </div>
      </header>
      {/* Main content */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-72px)] bg-gradient-to-br from-background via-muted/30 to-background/80">
        {" "}
        {/* Responsive layout */}
        {/* Left: Chat Box (1/3 width on md+, full width on small) */}
        <div className="w-full md:w-1/3 border-r border-muted-foreground/10 flex flex-col min-h-0 bg-background/80 md:rounded-l-xl shadow-inner">
          <div className="flex-1 overflow-y-auto p-6 min-h-0 pb-28 md:pb-0 bg-muted/30 rounded-tl-xl">
            {/* Messages area (from chatMessages state) */}
            <div className="space-y-4">
              {isLoading ? (
                // Show skeleton loading for chat messages
                <>
                  <ChatMessageSkeleton isUser={true} />
                  <ChatMessageSkeleton />
                  <ChatMessageSkeleton isUser={true} />
                  <ChatMessageSkeleton />
                </>
              ) : (
                <>
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={
                          msg.sender === "user"
                            ? "bg-background border px-4 py-2 rounded-lg shadow max-w-xs"
                            : "bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow max-w-xs"
                        }
                      >
                        <ReactMarkdown>{msg.message}</ReactMarkdown>
                      </div>
                      <span
                        className={`text-xs text-muted-foreground mt-1 ${
                          msg.sender === "user" ? "mr-1" : "ml-1"
                        }`}
                      >
                        {msg.sender === "user" ? "You" : "Zyro"}
                      </span>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-start">
                      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow max-w-xs animate-pulse">
                        Zyro is thinking...
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <form
            className="fixed bottom-0 left-0 w-full z-30 p-4  md:static md:w-auto md:p-4 md:rounded-bl-xl flex flex-col gap-2"
            style={{ maxWidth: "100vw" }}
            onSubmit={handleSubmit}
          >
            <textarea
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm shadow-sm resize-none min-h-[40px] max-h-40 mb-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
            />
            <div className="flex gap-2 w-full">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/70 focus:ring-2 focus:ring-primary/30 transition-all text-sm shadow-sm border border-muted-foreground/10"
                style={{ whiteSpace: "nowrap" }}
                // onClick handler to be implemented for enhancing prompt
              >
                Enhance Prompt
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/80 focus:ring-2 focus:ring-primary/30 transition-all text-sm shadow-sm"
              >
                Send
              </button>
            </div>
          </form>
        </div>
        {/* Right: Workspace Editor (2/3 width on md+, hidden on small) */}
        <div className="hidden md:flex w-2/3 h-[calc(100vh-72px)] items-center justify-center bg-background/80 md:rounded-r-xl shadow-inner p-4 relative">
          {isLoading ? (
            <WorkspaceEditorSkeleton />
          ) : (
            <>
              {isCoding && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-background/80">
                  <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              )}
              <WorkSpaceEditor files={files} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
