import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const workspaces = await prisma.workspace.findMany({
      where: {
        clerkId: user?.id as string,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Workspace Fetched Successfully",
      data: workspaces,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching the workspace.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const newWorkspace = await prisma.workspace.create({
      data: {
        clerkId: user?.id as string,
        title: "Untitled Workspace",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Workspace Created Successfully",
      data: newWorkspace,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while creating the workspace.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { workspaceId } = await req.json();

    await prisma.workspace.delete({
      where: {
        clerkId: user?.id,
        id: workspaceId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Workspace deleted Successfully",
      data: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while deleting the workspace.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const { workspaceId, title } = await req.json();
  const updatedWorkspace = await prisma.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      title,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Workspace updated Successfully",
    data: updatedWorkspace,
  });
}
