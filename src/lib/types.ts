export type TUsersList = {
  sales_person_code?: number;
  sales_person_name?: string;
  current_cash?: number;
  current_stock?: number;
  warehouse_person_code?: number;
  warehouse_person_name?: string;
  phone_no?: string;
  finance_person_code?: number;
  finance_person_name?: string;
  status: boolean;
  user_code: string;
};
export type TUserDetails = {
  sales_person_code?: number;
  sales_person_name?: string;
  warehouse_person_code?: number;
  warehouse_person_name?: string;
  finance_person_code?: number;
  finance_person_name?: string;
  account: string;
  abs_entry: number;
  status: boolean;
  user_code: string;
  phone_no: string;
  van: string;
  current_total: number;
};
export type User = {
  sales_person_code: number;
  name: string;
  employee_no: string;
  user_type: string;
  sap_token: string;
  finance_account: string;
  iat: number;
  exp: number;
  abs_entry: number;
};
export type VanCurrentStock = {
  sales_person_code: string;
  sales_person_name: string;
  item_code: string;
  item_name: string;
  piece_quantity: number;
  box_quantity: number;
  price: number;
  onhand: number;
  line_total: number;
  uom_code: string;
};
export type Transaction = {
  code: number;
  doc_time: number;
  doc_date: string;
  doc_type: string;
};
export type TransactionDetails = {
  code: number;
  time: number;
  doc_time: number;
  date: string;
  doc_date: string;
  doc_type: string;
  custployee_code: string;
  custployee_name: string;
  sales_person_code: string;
  sales_person_name: string;
  status: string;
  doc_total: number;
  cash_withdraw_amount: number;
  doc_lines: [
    {
      code: string;
      description: string;
      quantity: number;
      price: number;
      line_total: number;
    }
  ];
};
export type TCustomersList = {
  customer_code: string;
  customer_name: string;
  customer_eng_name: string;
  aproval_status: string;
  status: boolean;
};
export type TCustomerDetails = {
  customer_code: string;
  customer_name: string;
  customer_eng_name: string;
  sales_person_code: number;
  address: string;
  location: string;
  phone_no: string;
  aproval_status: string;
  status: boolean;
  img_url: string;
};
export type AdministrativeData = {
  created_by: string;
  created_on: string;
  edited_by: string;
  edited_on: string;
};
