export interface FoodItem {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  price: number;
  image: string;
  category: "Dim Sum" | "Szechuan" | "Noodles" | "Soups" | "Dessert";
  tags: string[];
  ratings: number;
  availability: boolean;
  spiceLevel: number;
}

export interface SelectedOptions {
  spiceLevel: "Mild" | "Medium" | "Szechuan Insane";
  addOns: string[];
}
