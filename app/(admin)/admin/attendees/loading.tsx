"use client";

import { Loader } from "@/components/ui/loader";
import { useEffect, useState } from "react";

const Loading = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return <Loader />;
};

export default Loading;
