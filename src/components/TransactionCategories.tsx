import { ShoppingCart, Car, Home, Coffee, Gamepad2, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TransactionCategoriesProps {
  language: "fr" | "ar";
}

export default function TransactionCategories({ language }: TransactionCategoriesProps) {
  const texts = {
    fr: {
      food: "Alimentation",
      transport: "Transport",
      housing: "Logement",
      entertainment: "Loisirs",
      shopping: "Shopping",
      health: "Santé",
      spent: "dépensé",
      of: "sur",
      thisMonth: "ce mois"
    },
    ar: {
      food: "الطعام",
      transport: "المواصلات",
      housing: "السكن",
      entertainment: "الترفيه",
      shopping: "التسوق",
      health: "الصحة",
      spent: "مُنفق",
      of: "من",
      thisMonth: "هذا الشهر"
    }
  };

  const t = texts[language];

  const categories = [
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      name: t.food,
      spent: 2850,
      budget: 4000,
      color: "bg-orange-500",
      percentage: 71
    },
    {
      icon: <Car className="w-6 h-6" />,
      name: t.transport,
      spent: 1200,
      budget: 2000,
      color: "bg-blue-500",
      percentage: 60
    },
    {
      icon: <Home className="w-6 h-6" />,
      name: t.housing,
      spent: 3500,
      budget: 4000,
      color: "bg-green-500",
      percentage: 87
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      name: t.entertainment,
      spent: 450,
      budget: 800,
      color: "bg-purple-500",
      percentage: 56
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      name: t.shopping,
      spent: 890,
      budget: 1500,
      color: "bg-pink-500",
      percentage: 59
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      name: t.health,
      spent: 320,
      budget: 1000,
      color: "bg-red-500",
      percentage: 32
    }
  ];

  return (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <Card key={index} className="border border-border hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}>
                {category.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {category.spent} {t.of} {category.budget} MRU
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={category.percentage} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{category.percentage}% {t.spent} {t.thisMonth}</span>
                    <span>{category.budget - category.spent} MRU restant</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}