"use client";

import { FC, useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { Trash } from "lucide-react";
import { Edit, MoreHorizontal } from "lucide-react";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modal/AlertModal";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { UserColumnType } from "@/app/(admin)/admin/users/components/columns";
import { AttendeeColumnType } from "@/app/(admin)/admin/attendees/components/columns";
import axiosInstance from "@/lib/axioswrapper";

interface CellActionProps {
  data: UserColumnType | AttendeeColumnType;
  type: string;
}

const CellAction: FC<CellActionProps> = ({ data, type }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      description: `${type} ID Copied to clipboard`,
      variant: "success",
    });
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/${type}/${data.id}`);
      router.refresh();
      toast({
        description: `${type} deleted.`,
        variant: "success",
      });
    } catch (error: any) {
      if (error.response.data) {
        const errMessage = error?.response?.data;
        toast({
          description: errMessage,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          description: "Something went wrong!!",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
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
