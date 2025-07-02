import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { sender, message, workspaceId } = await req.json();
  const newMessage = await prisma.chatMessage.create({
    data: {
      sender,
      message,
      workspaceId,
    },
  });

  return NextResponse.json({
    success: true,
    message: "New Message Created Successfully",
    data: newMessage,
  });
}

export async function GET(req: NextRequest) {
  const { workspaceId } = await req.json();
  const messages = await prisma.chatMessage.findMany({
    where: {
      id: workspaceId,
    },
  });
  return NextResponse.json({
    success: true,
    message: "Messages fetched successfully",
    data: messages,
  });
}
