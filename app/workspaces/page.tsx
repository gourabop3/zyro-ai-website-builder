"use client";

import Header from "@/components/Header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WorkspacesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    async function fetchWorkspaces() {
      setFetching(true);
      setError(null);
      try {
        const res = await fetch("/api/workspace");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setWorkspaces(data.data);
        } else {
          setError(data.message || "Failed to fetch workspaces");
        }
      } catch (err) {
        setError("An error occurred while fetching workspaces.");
      } finally {
        setFetching(false);
      }
    }
    fetchWorkspaces();
  }, []);

  async function handleCreateWorkspace() {
    setLoading(true);
    try {
      const res = await fetch("/api/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success && data.data?.id) {
        router.push(`/workspaces/${data.data.id}`);
      } else {
        alert(data.message || "Failed to create workspace");
      }
    } catch (err) {
      alert("An error occurred while creating the workspace.");
    } finally {
      setLoading(false);
    }
  }

  const openEditDialog = (ws: any) => {
    setSelectedWorkspace(ws);
    setEditTitle(ws.title || "");
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (ws: any) => {
    setSelectedWorkspace(ws);
    setDeleteDialogOpen(true);
  };

  async function handleEditWorkspace() {
    if (!selectedWorkspace) return;
    setEditLoading(true);
    try {
      const res = await fetch("/api/workspace", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId: selectedWorkspace.id,
          title: editTitle,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWorkspaces((prev) =>
          prev.map((ws) =>
            ws.id === selectedWorkspace.id ? { ...ws, title: editTitle } : ws
          )
        );
        setEditDialogOpen(false);
      } else {
        alert(data.message || "Failed to update workspace");
      }
    } catch (err) {
      alert("An error occurred while updating the workspace.");
    } finally {
      setEditLoading(false);
    }
  }

  async function handleDeleteWorkspace() {
    if (!selectedWorkspace) return;
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/workspace", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId: selectedWorkspace.id }),
      });
      const data = await res.json();
      if (data.success) {
        setWorkspaces((prev) =>
          prev.filter((ws) => ws.id !== selectedWorkspace.id)
        );
        setDeleteDialogOpen(false);
      } else {
        alert(data.message || "Failed to delete workspace");
      }
    } catch (err) {
      alert("An error occurred while deleting the workspace.");
    } finally {
      setDeleteLoading(false);
    }
  }

  const WorkspaceSkeleton = () => (
    <Card className="relative">
      <div className="absolute top-2 right-2 z-10">
        <Skeleton className="w-8 h-8 rounded" />
      </div>
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
    </Card>
  );

  return (
    <>
      <Header />
      <div className="mx-12 px-4 flex justify-end mt-8">
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded shadow hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50"
          type="button"
          onClick={handleCreateWorkspace}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Workspace"}
        </button>
      </div>
      <div className="md:mx-12 mx-4 py-12 px-4">
        {fetching ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <WorkspaceSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : workspaces.length === 0 ? (
          <div>No workspaces found.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {workspaces.map((ws) => (
              <Card
                key={ws.id}
                className="cursor-pointer hover:shadow-lg transition-shadow relative"
                onClick={() => router.push(`/workspaces/${ws.id}`)}
              >
                <div
                  className="absolute top-2 right-2 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Workspace options"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(ws)}>
                        Edit Workspace Name
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog(ws)}
                        className="text-destructive"
                      >
                        Delete Workspace
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardHeader>
                  <CardTitle>{ws.title || "Untitled Workspace"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {ws.description || "No description."}
                  </CardDescription>
                  <div className="text-xs text-muted-foreground mt-2">
                    {/* Optionally show last updated if available */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Workspace Name</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditWorkspace();
            }}
          >
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Workspace Name"
              disabled={editLoading}
              required
            />
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={editLoading}>
                {editLoading ? "Saving..." : "Save"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={editLoading}>
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Workspace</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this workspace? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteWorkspace}
              disabled={deleteLoading}
              className="bg-destructive text-white"
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
