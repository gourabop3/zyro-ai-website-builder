import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  {params}: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const workspaceId = (await params).id;
    const workspaces = await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
        clerkId: user?.id,
      },
      select: {
        chatMessages: true,
        filesVersions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        title: true,
        id: true,
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
