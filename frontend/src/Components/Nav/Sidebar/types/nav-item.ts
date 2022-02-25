import { IconType } from "react-icons/lib";

type LinkItem = {
  type: 'link' | "header";
  icon?: IconType;
  href?: string;
};

type ItemTypeProps =  LinkItem;

export type NavItem = ItemTypeProps & {
  label: string;
};