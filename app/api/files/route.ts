import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { fileString, workspaceId } = await req.json();

  const newFileVersion = await prisma.filesVersion.create({
    data: {
      workspaceId,
      files: fileString,
    },
  });
  return NextResponse.json({
    success: true,
    message: "New File Version created",
    data: newFileVersion,
  });
}

