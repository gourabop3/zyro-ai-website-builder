import { codeChat } from "@/actions/gemini";
import { NextRequest, NextResponse } from "next/server";
import { Sandbox } from "@e2b/code-interpreter";

// Helper function to detect and extract Python code
function extractPythonCode(codeObj: any): string | null {
  // Check if there's a Python file in the generated code
  if (codeObj && typeof codeObj === 'object') {
    for (const [filename, content] of Object.entries(codeObj)) {
      if (filename.endsWith('.py') && typeof content === 'string') {
        return content;
      }
    }
  }
  return null;
}

// Helper function to execute Python code with E2B
async function executeWithE2B(pythonCode: string) {
  if (!process.env.E2B_API_KEY) {
    return null; // Skip execution if E2B is not configured
  }

  try {
    const sandbox = await Sandbox.create();
    
    try {
      const execution = await sandbox.runCode(pythonCode);
      return {
        stdout: execution.logs.stdout.join('\n'),
        stderr: execution.logs.stderr.join('\n'),
        results: execution.results,
        error: execution.error,
        executionTime: execution.executionTime,
      };
    } finally {
      await sandbox.close();
    }
  } catch (error) {
    console.error("E2B execution error:", error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const response = await codeChat(prompt);
    const codeObj = JSON.parse(response as string);
    
    // Check if generated code contains Python and execute it
    const pythonCode = extractPythonCode(codeObj);
    let executionResult = null;
    
    if (pythonCode) {
      executionResult = await executeWithE2B(pythonCode);
    }
    
    return NextResponse.json(
      {
        success: true,
        code: codeObj,
        // Include execution results if Python code was executed
        ...(executionResult && { execution: executionResult }),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
