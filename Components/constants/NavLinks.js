import {
  HomeIcon,
  LucideShoppingBasket,
  LucideShoppingCart,
  Plus,
  ShoppingBasket,
  Users,
} from "lucide-react";

export const NavLinks = [
  {
    title: "Overview",
    href: "/admin",
    icon: <HomeIcon />,
  },
  {
    title: "Admins",
    href: "/admin/manage-admins",
    icon: <Users />,
  },
  {
    title: "Sales",
    href: "/admin/sales",
    icon: <ShoppingBasket />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <LucideShoppingCart />,
  },
];

export const ProductLinks = [
  {
    title: "Products",
    href: "/admin/products",
    icon: <Plus className="size-4" />,
  },
  {
    title: "Add new Product",
    href: "/admin/new-product",
    icon: <Plus className="size-4" />,
  },
];

export const NavigationLinks = [
  {
    title: "Overview",
    href: "/admin",
    icon: <HomeIcon />,
  },
  {
    title: "Admins",
    href: "/admin/manage-admins",
  },
  {
    title: "Sales",
    href: "/admin/sales",
  },
  {
    title: "Orders",
    href: "/admin/orders",
  },
  {
    title: "Products",
    href: "/admin/products",
  },
];
