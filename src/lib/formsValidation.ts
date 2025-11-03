import { z } from "zod";
export const loginFormSchema = z.object({
  username: z.string().min(2, { message: " required *" }),
  password: z.string().min(4, { message: " required *" }),
});
export type LoginRequest = z.infer<typeof loginFormSchema>;

export const EditCustomerSchema = z.object({
  CardName: z.string(),
  CardForeignName: z.string(),
  Cellular: z.string(),
  Address: z.string(),
  U_img_url: z.string().min(4, { message: "Image is required *" }),
  U_Location: z.string().min(4, { message: "Location is required *" }),
});
export type EditCustomerRequest = z.infer<typeof EditCustomerSchema>;