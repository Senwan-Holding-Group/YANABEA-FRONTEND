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
export const CreateWithdrawSchema = z.object({
  current_cash_amount: z
    .number()
    .min(1, { message: "Amount must be greater than 0" }),
  code: z.number({ message: "Employee must be selected" }),
});
export type CreateWithdrawRequest = z.infer<typeof CreateWithdrawSchema>;

const WarehouseEnum = z.enum(["VANS", "DC"]);
const BinActionTypeEnum = z.enum(["batFromWarehouse", "batToWarehouse"]);
const TransferTypeEnum = z.enum(["inStock", "outStock"]);

export const CreateTransferSchema = z.object({
  TransferType:TransferTypeEnum,
  SalesPersonCode: z.number().min(1,{ message: "Employee must be selected" }),
  StockTransferLines: z.array(
    z.object({
      ItemCode: z.string(),
      ItemDescription: z.string(),
      Quantity: z.number(),
      WarehouseCode: WarehouseEnum,
      FromWarehouseCode: WarehouseEnum,
      UnitPrice: z.number(),
      UoMEntry: z.number(),
      UoMCode: z.string(),
      StockTransferLinesBinAllocations: z.array(z.object({
        BinAbsEntry: z.number(),
        Quantity: z.number(),
        BinActionType: BinActionTypeEnum
      }))
    })
  ),
});

export type CreateTransferRequest = z.infer<typeof CreateTransferSchema>;

