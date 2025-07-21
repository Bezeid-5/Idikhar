import { useState } from "react";
import { ArrowLeft, PieChart, Target, Plus, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TransactionCategories from "./TransactionCategories";
import SavingsPlans from "./SavingsPlans";
import CreateSavingsPlan from "./CreateSavingsPlan";

export interface SavingsPlan {
  id: number;
  title: string;
  target: number;
  saved: number;
  status: "active" | "completed" | "paused";
  endDate: string;
  monthlyAmount: number;
  icon: React.ReactNode;
  color: string;
  description?: string;
}

interface IdikharAppProps {
  onBack: () => void;
}

export default function IdikharApp({ onBack }: IdikharAppProps) {
  const [activeTab, setActiveTab] = useState<"categories" | "savings" | "create-plan">("categories");
  const [language, setLanguage] = useState<"fr" | "ar">("fr");
  const [savingsPlans, setSavingsPlans] = useState<SavingsPlan[]>([]);

  const addSavingsPlan = (newPlan: Omit<SavingsPlan, 'id'>) => {
    const plan: SavingsPlan = {
      ...newPlan,
      id: Date.now(), // Simple ID generation
    };
    setSavingsPlans(prev => [...prev, plan]);
  };

  const texts = {
    fr: {
      title: "Idikhar",
      subtitle: "Votre assistant financier intelligent",
      categories: "Catégories",
      savings: "Épargne",
      categoriesTitle: "Catégorisation automatique",
      savingsTitle: "Plans d'épargne",
      balance: "Solde disponible",
      thisMonth: "Ce mois",
      createPlan: "Créer un plan"
    },
    ar: {
      title: "إدخار",
      subtitle: "مساعدك المالي الذكي",
      categories: "الفئات",
      savings: "الادخار",
      categoriesTitle: "التصنيف التلقائي",
      savingsTitle: "خطط الادخار",
      balance: "الرصيد المتاح",
      thisMonth: "هذا الشهر",
      createPlan: "إنشاء خطة"
    }
  };

  const t = texts[language];

  if (activeTab === "create-plan") {
    return (
      <CreateSavingsPlan 
        onBack={() => setActiveTab("savings")} 
        language={language}
        onCreatePlan={addSavingsPlan}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary-dark">
      {/* Header */}
      <div className="flex items-center justify-between p-6 text-primary-foreground">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        
        <div className="text-center">
          <h1 className="text-xl font-bold">{t.title}</h1>
          <p className="text-sm text-primary-foreground/80">{t.subtitle}</p>
        </div>

        <Button
          variant="ghost"
          onClick={() => setLanguage(language === "fr" ? "ar" : "fr")}
          className="text-primary-foreground hover:bg-primary-foreground/20 text-sm"
        >
          {language === "fr" ? "العربية" : "Français"}
        </Button>
      </div>

      {/* Balance Card */}
      <div className="px-6 mb-6">
        <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-primary-foreground">
              <div>
                <p className="text-sm opacity-80">{t.balance}</p>
                <p className="text-2xl font-bold">15,847 MRU</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">{t.thisMonth}</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-success font-semibold">+2,340 MRU</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 mb-6">
        <div className="flex bg-primary-foreground/10 rounded-2xl p-1 backdrop-blur-sm">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("categories")}
            className={`flex-1 rounded-xl font-bold transition-all ${
              activeTab === "categories"
                ? "bg-primary text-white font-bold pointer-events-none"
                : "bg-transparent text-primary-foreground/80 hover:bg-violet-100 hover:text-violet-700"
            }`}
          >
            <PieChart className="w-4 h-4 mr-2" />
            {t.categories}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("savings")}
            className={`flex-1 rounded-xl font-bold transition-all ${
              activeTab === "savings"
                ? "bg-primary text-white font-bold pointer-events-none"
                : "bg-transparent text-primary-foreground/80 hover:bg-violet-100 hover:text-violet-700"
            }`}
          >
            <Target className="w-4 h-4 mr-2" />
            {t.savings}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-background rounded-t-3xl pt-6 px-6 min-h-[60vh]">
        {activeTab === "categories" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{t.categoriesTitle}</h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Automatique
              </Badge>
            </div>
            <TransactionCategories language={language} />
          </div>
        )}

        {activeTab === "savings" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{t.savingsTitle}</h2>
              <Button 
                onClick={() => setActiveTab("create-plan")}
                className="bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.createPlan}
              </Button>
            </div>
            <SavingsPlans language={language} plans={savingsPlans} />
          </div>
        )}
      </div>
    </div>
  );
}