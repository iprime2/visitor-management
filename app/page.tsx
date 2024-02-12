"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import Heading from "@/components/Heading";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(4),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // if (!mounted) {
  //   return null;
  // }

  if (session) {
    router.push("/admin/dashboard");
    return null;
  }

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const { email, password } = data;
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      router.push("/admin/dashboard");
      toast({
        title: "Signed In!",
        description: "Redirecting to dashboard!",
        variant: "success",
      });
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data) {
        toast({
          title: error.code,
          description: error.response.data,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          description: "Something went wrong!!",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-black/80 h-screen p-5">
      <div className="flex w-full md:w-[80%] lg:w-[50%] my-20 h-auto flex-col border rounded-md items-center px-6 py-6 md:p-10 gap-2 bg-white">
        <div className="flex w-full">
          <Heading
            title={"Sign In"}
            description={"Enter the email and password."}
          />
        </div>
        <Separator />
        <div className="flex items-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Password"
                        type="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={loading}
                className="w-full ml-auto"
                type="submit"
              >
                {loading ? (
                  <>
                    <ClipLoader color="white" size="20" />
                    &nbsp;&nbsp;&nbsp;
                    <span>Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
