"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CellAction from "@/components/CellAction";

export type AttendeeColumnType = {
  id: string;
  name: string;
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
