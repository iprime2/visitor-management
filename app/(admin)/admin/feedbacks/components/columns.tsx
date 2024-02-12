"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { FrownIcon, MehIcon, SmileIcon } from "lucide-react";

export type FeedbacksColumnType = {
  id: string;
  message: string;
  rating: string;
  createdAt: Date;
  visitor: {
    visitorPrn: string;
    visitorName: string;
  };
};

export const columns: ColumnDef<FeedbacksColumnType>[] = [
  {
    accessorKey: "visitorPrn",
    header: "Visitor PRN",
    cell: ({ row }) => (
      <div className="flex">{row?.original?.visitor?.visitorPrn || "NAN"}</div>
    ),
  },
  {
    accessorKey: "visitorName",
    header: "Visitor Name",
    cell: ({ row }) => (
      <div className="flex">{row?.original?.visitor?.visitorName || "NAN"}</div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex w-[40px] items-center justify-center">
        {row.original.rating === "Bad" ? (
          <FrownIcon className="text-red-500" />
        ) : row.original.rating === "Good" ? (
          <MehIcon className="text-yellow-500" />
        ) : row.original.rating === "Excellent" ? (
          <SmileIcon className="text-green-500" />
        ) : (
          "NAN"
        )}
      </div>
    ),
  },
  {
    accessorKey: "message",
    header: "Feedback",
    cell: ({ row }) => (
      <div className="flex">{row?.original?.message || "NAN"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => (
      <div className="flex">{format(row.original.createdAt, "PP")}</div>
    ),
  },
];
