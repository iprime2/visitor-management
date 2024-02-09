"use client";

import { FC, useState } from "react";
import { Copy } from "lucide-react";
import { Trash } from "lucide-react";
import { Edit, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { UserColumnType } from "@/app/(routes)/admin/users/components/columns";
import AlertModal from "./modal/AlertModal";

interface CellActionProps {
  data: UserColumnType;
  type: string;
}

const CellAction: FC<CellActionProps> = ({ data, type }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${type} ID Copied to clipboard`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${type}/${data.id}`);
      router.refresh();
      toast.success("Department deleted.");
    } catch (error: any) {
      toast.error("Something went wrong!!.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/${type}/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
