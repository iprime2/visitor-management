import * as z from "zod";

export const visitorFormSchema = z.object({
  name: z.string().min(1, { message: "Name must not be empty" }),
});

export type VisitorsFormValues = z.infer<typeof visitorFormSchema>;

export const inoutFormSchema = z.object({
  prn: z.string().min(1, { message: "Name must not be empty" }),
});

export type inoutFormValues = z.infer<typeof inoutFormSchema>;
