"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const LogoutPage = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ callbackUrl: "/" });
    };

    handleSignOut();
  }, []);

  if (!mounted) {
    return null;
  }

  if (typeof window !== "undefined") {
    return <h1>Logging Out!</h1>;
  }

  return null;
};

export default LogoutPage;
