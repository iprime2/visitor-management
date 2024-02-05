"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Visitors } from "@prisma/client";

export const visitorColumns: ColumnDef<Visitors>[] = [
  {
    accessorKey: "visitorId",
    header: "S.No",
  },
  {
    accessorKey: "visitorPrn",
    header: "PRN",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.visitorPrn
          ? row.original.visitorPrn
          : `VCS${row.original.visitorId}`}
      </div>
    ),
  },
  {
    accessorKey: "visitorName",
    header: "Name",
  },
  {
    accessorKey: "mobile",
    header: "Contact No.",
  },
  {
    accessorKey: "attendedBy",
    header: "Attended By",
  },
  {
    accessorKey: "type",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date-Time",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.createdAt ? format(row.original.createdAt, "PPp") : "NAN"}
      </div>
    ),
  },
];
