"use client";

import { FC } from "react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface TooltipProps {
  children: any;
}

export const Tooltip: FC<TooltipProps> = ({ children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
