import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { Sandbox } from "@e2b/code-interpreter";
import { getTemplateForCode, getTemplate, getE2BConfig } from "@/lib/e2b-templates";

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

    // Get E2B configuration
    const e2bConfig = getE2BConfig();
    
    if (!e2bConfig.apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          message: "E2B API key not configured. Please set E2B_API_KEY in environment variables." 
        },
        { status: 500 }
      );
    }

    // Determine which template to use
    const selectedTemplate = template || getTemplateForCode(filename, code);
    
    try {
      // Create E2B sandbox with your vibegourab template and team configuration
      const sandboxOptions: any = {};
      
      // Add team ID to options if available
      if (e2bConfig.teamId) {
        sandboxOptions.teamId = e2bConfig.teamId;
      }

      const sandbox = await Sandbox.create(selectedTemplate.id, sandboxOptions);

      try {
        // Write the code to a file
        await sandbox.files.write(filename, code);

        // Execute the code
        const execution = await sandbox.runCode(code);

        // Get results
        const result = {
          success: true,
          stdout: execution.stdout,
          stderr: execution.stderr,
          results: execution.results.map((result: any) => ({
            type: result.type,
            data: result.data,
            ...(result.formats && { formats: result.formats })
          })),
          template: selectedTemplate.id,
          filename
        };

        return NextResponse.json(result);

      } finally {
        // Clean up sandbox
        await sandbox.close();
      }

    } catch (sandboxError: any) {
      console.error("E2B sandbox error:", sandboxError);
      
      let errorMessage = "Failed to execute code in sandbox";
      
      if (sandboxError.message?.includes('template')) {
        errorMessage = `Template '${selectedTemplate.id}' not found. Please check your E2B templates and team access.`;
      } else if (sandboxError.message?.includes('team')) {
        errorMessage = "Team access error. Please check your E2B team ID configuration.";
      } else if (sandboxError.message?.includes('authentication')) {
        errorMessage = "Authentication failed. Please check your E2B API key.";
      }

      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage,
          error: sandboxError.message 
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("Execute code error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        error: error.message 
      },
      { status: 500 }
    );
  }
}