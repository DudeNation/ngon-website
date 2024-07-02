import {
  MenuBook,
  MenuBookOutlined,
  Person,
  PersonOutline,
  ShoppingCart,
  ShoppingCartOutlined,
  Store,
  StoreOutlined,
} from "@mui/icons-material";

const NavBar = [
  {
    id: "1",
    title: "Our Brand",
    url: "/our-brand",
    icon: <StoreOutlined />,
    icon2: <Store />,
  },
  {
    id: "2",
    title: "Menu",
    url: "/menu",
    icon: <MenuBookOutlined />,
    icon2: <MenuBook />,
  },
  {
    id: "3",
    title: "My page",
    url: "/my-page",
    icon: <PersonOutline />,
    icon2: <Person />,
  },
  {
    id: "4",
    title: "My cart",
    url: "/my-cart",
    icon: <ShoppingCartOutlined />,
    icon2: <ShoppingCart />,
  },
];

export default NavBar;
