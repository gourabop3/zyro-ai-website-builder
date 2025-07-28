import { codeChat } from "@/actions/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const response = await codeChat(prompt);
    const codeObj = JSON.parse(response as string);
    
    return NextResponse.json(
      {
        success: true,
        code: codeObj,
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
