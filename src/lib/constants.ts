export const navItems = [
  {
    title: "nav",
    items: [
      {
        navLabel: "Dashboard",
        label: "Dashboard",
        path: "/yanabea/dashboard",
      },
      {
        navLabel: "Users",
        label: "User Management",
        path: "/yanabea/users",
      },
      {
        navLabel: "Customers",
        label: "Customer Management",
        path: "/yanabea/customers",
      },
      {
        navLabel: "Documents",
        label: "Document Management",
        path: "/yanabea/documents",
      },
      {
        navLabel: "Setting",
        label: "Settings",
        path: "/yanabea/settings",
      },
    ],
  },
];
export const filterTypes: Record<string, string> = {
    Sales: "sales",
    Return: "return",
    Withdraw: "withdraw",
    "In stock": "in_stock",
    "Out stock": "out_stock",
  };