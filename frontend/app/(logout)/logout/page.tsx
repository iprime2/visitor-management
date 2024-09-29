"use client";

import { toast } from '@/components/ui/use-toast';
import useUserStore from '@/stores/useUserStore';
import { Loader } from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

const LogoutButton = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true); // Start the animation
    setTimeout(() => {
      clearUser();
      router.push('/login'); // Redirect to login page after logout

      toast({
        title: "Logged Out!",
        description: "You have been logged out successfully.",
        variant: "success",
      });
    }, 2000); // Delay to allow animation to complete
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div
      className={`pt-10 flex flex-col items-center justify-center gap-4 w-full h-screen ${
        isLoggingOut ? "fade-out" : ""
      }`}
    >
      <h1 className='font-bold text-2xl'>
        Logging out...
      </h1>
      <Loader />
    </div>
  );
};

export default LogoutButton;
