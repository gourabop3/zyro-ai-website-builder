import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { Sandbox } from "@e2b/code-interpreter";
import { getTemplateForCode, getTemplate } from "@/lib/e2b-templates";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { code, workspaceId, filename = "main.py", template } = await req.json();

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

    // Use the vibegourab template
    const selectedTemplate = template || getTemplateForCode(filename, code);
    const templateConfig = getTemplate(selectedTemplate);

    console.log(`Using E2B template: ${selectedTemplate} for file: ${filename}`);

    try {
      // Create E2B sandbox with your vibegourab template
      // Correct syntax: Sandbox.create(template, options)
      const sandbox = await Sandbox.create(selectedTemplate);

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
            template: selectedTemplate,
            templateInfo: templateConfig,
          }
        };

        return NextResponse.json(response);
      } finally {
        // Always terminate the sandbox
        await sandbox.kill();
      }
    } catch (sandboxError) {
      console.error("Sandbox creation/execution error:", sandboxError);
      
      // Fallback to default code interpreter if template-specific sandbox fails
      try {
        const basicSandbox = await Sandbox.create();
        try {
          const execution = await basicSandbox.runCode(code);
          return NextResponse.json({
            success: true,
            data: {
              stdout: execution.logs.stdout.join('\n'),
              stderr: execution.logs.stderr.join('\n'),
              results: execution.results,
              error: execution.error,
              template: 'default-fallback',
              warning: 'Used fallback template due to vibegourab template error'
            }
          });
        } finally {
          await basicSandbox.kill();
        }
      } catch (fallbackError) {
        throw sandboxError; // Throw original error if fallback also fails
      }
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