"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ callbackUrl: "/" });
    };

    handleSignOut();
  }, []);

  if (typeof window !== "undefined") {
    return <h1>Logging Out!</h1>;
  }

  return null;
};

export default LogoutPage;
