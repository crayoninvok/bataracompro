// lib/constants.ts
import {
  Globe,
  Leaf,
  TrendingUp,
  Briefcase,
  Truck,
  User,
} from "lucide-react";

export interface CategoryInfo {
  name: string;
  icon: any;
  count: number;
}

export const categoryIcons: Record<string, any> = {
  All: Globe,
  Sustainability: Leaf,
  Technology: TrendingUp,
  Operations: Briefcase,
  Mining: Truck,
  Environment: Leaf,
  Production: Briefcase,
  Procurement: Truck,
  HRGA: User,
  Finance: TrendingUp,
  Plant: Briefcase,
  IT: TrendingUp,
  HSE: Leaf,
};