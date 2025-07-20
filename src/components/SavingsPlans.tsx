import { Target, Calendar, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SavingsPlan } from "./IdikharApp";

interface SavingsPlansProps {
  language: "fr" | "ar";
  plans: SavingsPlan[];
}

export default function SavingsPlans({ language, plans }: SavingsPlansProps) {
  const texts = {
    fr: {
      activePlans: "Plans actifs",
      completed: "Terminés",
      inProgress: "En cours",
      paused: "En pause",
      target: "Objectif",
      saved: "Épargné",
      remaining: "Restant",
      monthsLeft: "mois restants",
      daysLeft: "jours restants",
      nextPayment: "Prochain versement",
      vacation: "Vacances d'été",
      emergency: "Fonds d'urgence",
      house: "Achat maison",
      car: "Nouvelle voiture"
    },
    ar: {
      activePlans: "الخطط النشطة",
      completed: "مكتملة",
      inProgress: "قيد التنفيذ",
      paused: "متوقفة",
      target: "الهدف",
      saved: "مُدخر",
      remaining: "المتبقي",
      monthsLeft: "شهر متبقي",
      daysLeft: "يوم متبقي",
      nextPayment: "الدفعة التالية",
      vacation: "عطلة الصيف",
      emergency: "صندوق الطوارئ",
      house: "شراء منزل",
      car: "سيارة جديدة"
    }
  };

  const t = texts[language];

  const defaultPlans: SavingsPlan[] = [
    {
      id: 1,
      title: t.vacation,
      target: 15000,
      saved: 8500,
      status: "active",
      endDate: "2024-06-15",
      monthlyAmount: 1500,
      icon: <Target className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: t.emergency,
      target: 25000,
      saved: 18750,
      status: "active",
      endDate: "2024-12-31",
      monthlyAmount: 2000,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-green-500"
    },
    {
      id: 3,
      title: t.house,
      target: 100000,
      saved: 45000,
      status: "active",
      endDate: "2026-03-15",
      monthlyAmount: 3000,
      icon: <Target className="w-5 h-5" />,
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: t.car,
      target: 12000,
      saved: 12000,
      status: "completed",
      endDate: "2024-01-15",
      monthlyAmount: 1200,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "bg-success"
    }
  ];

  const allPlans = [...defaultPlans, ...plans];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary">{t.inProgress}</Badge>;
      case "completed":
        return <Badge className="bg-success/10 text-success">{t.completed}</Badge>;
      case "paused":
        return <Badge variant="secondary">{t.paused}</Badge>;
      default:
        return null;
    }
  };

  const calculateProgress = (saved: number, target: number) => {
    return (saved / target) * 100;
  };

  const calculateRemainingTime = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMonths > 0) {
      return `${diffMonths} ${t.monthsLeft}`;
    } else if (diffDays > 0) {
      return `${diffDays} ${t.daysLeft}`;
    } else {
      return t.completed;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="text-lg font-semibold text-foreground">{t.activePlans}</h3>
        <Badge variant="outline">{allPlans.filter(p => p.status === "active").length}</Badge>
      </div>

      {allPlans.map((plan) => (
        <Card key={plan.id} className="border border-border hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`${plan.color} w-10 h-10 rounded-full flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{plan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t.target}: {plan.target.toLocaleString()} MRU
                  </p>
                </div>
              </div>
              {getStatusBadge(plan.status)}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.saved}</span>
                <span className="font-semibold">{plan.saved.toLocaleString()} MRU</span>
              </div>
              <Progress 
                value={calculateProgress(plan.saved, plan.target)} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{calculateProgress(plan.saved, plan.target).toFixed(1)}%</span>
                <span>{(plan.target - plan.saved).toLocaleString()} MRU {t.remaining}</span>
              </div>
            </div>

            {plan.status === "active" && (
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {calculateRemainingTime(plan.endDate)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{t.nextPayment}</p>
                  <p className="text-sm font-semibold">{plan.monthlyAmount} MRU</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}