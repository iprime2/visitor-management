"use client";

import { format, formatDistanceToNow } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Visitors } from "@prisma/client";
import { cn } from "@/lib/utils";
import SelectAttendee from "./SelectAttendee";

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
    cell: ({ row }) => (
      <div className="flex">
        {
          <SelectAttendee
            attendeeSelectedValueProps={row.original.attendedBy}
            visitorUniqueId={row.original.id}
          />
        }
      </div>
    ),
  },
  {
    accessorKey: "query",
    header: "Query",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.query ? row.original.query : "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Category",
    cell: ({ row }) => (
      <div className="flex">
        {row.original?.type ? row.original?.type : "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "inTime",
    header: "In Time",
    cell: ({ row }) => (
      <div className="flex">{format(row.original?.inTime, "p")}</div>
    ),
  },
  {
    accessorKey: "outTime",
    header: "Out Time",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.outTime ? format(row.original?.outTime, "p") : "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "Total Time",
    header: "Total Time",
    cell: ({ row }) => (
      <div
        className={cn(
          "flex p-1 text-white",
          row.original.outTime ? "bg-green-500" : "bg-red-500"
        )}
      >
        {row.original.inTime
          ? formatDistanceToNow(row.original.inTime)
          : "not checked out"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date-Time",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.createdAt ? format(row.original.createdAt, "PP") : "NAN"}
      </div>
    ),
  },
];
