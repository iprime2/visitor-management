"use client";

import { format, formatDistanceToNow } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Visitors } from "@prisma/client";
import { cn } from "@/lib/utils";
import SelectAttendee from "./SelectAttendee";
import RemarkWrapper from "./RemarkWrapper";

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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={cn(
          "flex items-center p-2  justify-center text-white rounded-md",
          row.original.status === "closed" && "bg-green-500",
          row.original.status === "open" && "bg-red-500"
        )}
      >
        {row.original.status || "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "remark",
    header: "Remark",
    cell: ({ row }) => (
      <div className="flex w-[200px] h-auto">
        <RemarkWrapper
          visitorId={row.original?.id}
          remark={row.original.remark}
        />
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
          "flex p-2 text-white rounded-md",
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
    header: "Date",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.createdAt ? format(row.original.createdAt, "PP") : "NAN"}
      </div>
    ),
  },
];
