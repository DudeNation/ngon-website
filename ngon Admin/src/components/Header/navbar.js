import {
  MenuBook,
  MenuBookOutlined,
  Person,
  PersonOutline,
  ShoppingCart,
  ShoppingCartOutlined,
  Store,
  StoreOutlined,
  Discount,
  DiscountOutlined,
  Assessment,
  AssessmentOutlined,
  AccountBox,
  AccountBoxOutlined,
} from "@mui/icons-material";

const NavBar = [
  {
    id: "1",
    title: "Coupon",
    url: "/coupon",
    icon: <DiscountOutlined />,
    icon2: <Discount />,
  },
  {
    id: "2",
    title: "Customer",
    url: "/customer-list",
    icon: <PersonOutline />,
    icon2: <Person />,
  },
  {
    id: "3",
    title: "Order List",
    url: "/order-list",
    icon: <ShoppingCartOutlined />,
    icon2: <ShoppingCart />,
  },
  {
    id: "4",
    title: "Menu",
    url: "/menu",
    icon: <StoreOutlined />,
    icon2: <Store />,
  },
  {
    id: "5",
    title: "Account",
    url: "/my-page",
    icon: <AccountBoxOutlined />,
    icon2: <AccountBox />,
  },
  {
    id: "6",
    title: "Dashboard",
    url: "/dashboard",
    icon: <AssessmentOutlined />,
    icon2: <Assessment />,
  }
];

export default NavBar;
