"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CellAction from "@/components/CellAction";

export type AttendeeColumnType = {
  id: string;
  name: string;
  sequence: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns:
  | ColumnDef<AttendeeColumnType>[]
  | ColumnDef<AttendeeColumnType> = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
    cell: ({ row }) => <div className="flex pl-6">{row.original.sequence}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.createdAt ? format(row.original.createdAt, "PP") : "NAN"}
      </div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} type={"attendees"} />,
  },
];
