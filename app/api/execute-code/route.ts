import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { Sandbox } from "@e2b/code-interpreter";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { code, workspaceId } = await req.json();

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Code is required" },
        { status: 400 }
      );
    }

    // Check if E2B API key is configured
    if (!process.env.E2B_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          message: "E2B API key not configured. Please set E2B_API_KEY environment variable." 
        },
        { status: 500 }
      );
    }

    // Create E2B sandbox
    const sandbox = await Sandbox.create();

    try {
      // Execute the code
      const execution = await sandbox.runCode(code);

      // Format the response
      const response = {
        success: true,
        data: {
          stdout: execution.logs.stdout.join('\n'),
          stderr: execution.logs.stderr.join('\n'),
          results: execution.results,
          error: execution.error,
          executionTime: execution.executionTime,
        }
      };

      return NextResponse.json(response);
    } finally {
      // Always close the sandbox
      await sandbox.close();
    }

  } catch (error) {
    console.error("Code execution error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while executing code.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}