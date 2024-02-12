"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type FeedbacksColumnType = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<FeedbacksColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => (
      <div className="flex">{format(row.original.createdAt, "PP")}</div>
    ),
  },
];
