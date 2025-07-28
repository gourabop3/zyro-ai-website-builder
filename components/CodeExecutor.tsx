"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayIcon, Loader2Icon, TerminalIcon } from "lucide-react";

interface CodeExecutorProps {
  code: string;
  workspaceId?: string;
}

interface ExecutionResult {
  stdout: string;
  stderr: string;
  results: any[];
  error: any;
  executionTime: number;
}

export default function CodeExecutor({ code, workspaceId }: CodeExecutorProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executeCode = async () => {
    if (!code.trim()) return;

    setIsExecuting(true);
    setError(null);
    setResult(null);

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

      if (!data.success) {
        setError(data.message || "Failed to execute code");
        return;
      }

      setResult(data.data);
    } catch (err) {
      setError("An error occurred while executing code");
      console.error("Code execution error:", err);
    } finally {
      setIsExecuting(false);
    }
  };

  const renderResults = () => {
    if (!result) return null;

    return (
      <div className="space-y-4">
        {/* Execution Time */}
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            Executed in {result.executionTime}ms
          </Badge>
        </div>

        {/* Stdout */}
        {result.stdout && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TerminalIcon className="h-4 w-4" />
                Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                {result.stdout}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Results (charts, plots, etc.) */}
        {result.results && result.results.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Visual Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.results.map((resultItem, index) => (
                  <div key={index} className="border rounded p-2">
                    {resultItem.type === "image" ? (
                      <img
                        src={`data:image/png;base64,${resultItem.base64}`}
                        alt={`Result ${index + 1}`}
                        className="max-w-full h-auto"
                      />
                    ) : resultItem.type === "html" ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: resultItem.html }}
                      />
                    ) : (
                      <pre className="text-sm">{JSON.stringify(resultItem, null, 2)}</pre>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stderr */}
        {result.stderr && (
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-600 dark:text-red-400">
                Errors/Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-x-auto">
                {result.stderr}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Execution Error */}
        {result.error && (
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-600 dark:text-red-400">
                Execution Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-x-auto">
                {JSON.stringify(result.error, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Execute Button */}
      <div className="flex items-center gap-2">
        <Button
          onClick={executeCode}
          disabled={isExecuting || !code.trim()}
          className="flex items-center gap-2"
        >
          {isExecuting ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
          {isExecuting ? "Executing..." : "Run Code"}
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 dark:border-red-800">
          <CardContent className="pt-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {renderResults()}
    </div>
  );
}