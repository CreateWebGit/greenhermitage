import { fetchMenuPublished } from "@/lib/actions/menuPublished.action";
import {
  Layout,
  Building2,
  Clock4,
  LandPlot,
  UtensilsCrossed,
  HandPlatter,
} from "lucide-react";
import { RiUserStarLine } from "react-icons/ri";

export const routes = [
  {
    icon: Building2,
    label: "Om oss",
    href: `/dashboard/om-oss`,
  },
  {
    icon: HandPlatter,
    label: "À la certe meny",
    href: `/dashboard/meny`,
  },
  {
    icon: UtensilsCrossed,
    label: "Lunch meny",
    href: `/dashboard/lunch-meny`,
  },
  {
    icon: RiUserStarLine,
    label: "Omdömen",
    href: `/dashboard/recensioner`,
  },
  {
    icon: Clock4,
    label: "Öppettider",
    href: `/dashboard/oppettider`,
  },
  {
    icon: LandPlot,
    label: "Adress",
    href: `/dashboard/kontakt`,
  },
];
