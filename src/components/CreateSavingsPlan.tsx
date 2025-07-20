import { useState } from "react";
import { ArrowLeft, Target, Calendar, DollarSign, CheckCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SavingsPlan } from "./IdikharApp";

interface CreateSavingsPlanProps {
  onBack: () => void;
  language: "fr" | "ar";
  onCreatePlan: (plan: Omit<SavingsPlan, 'id'>) => void;
}

export default function CreateSavingsPlan({ onBack, language, onCreatePlan }: CreateSavingsPlanProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    duration: "",
    durationType: "months",
    category: "",
    priority: "medium"
  });
  
  const { toast } = useToast();

  const texts = {
    fr: {
      title: "Créer un nouveau plan",
      step: "Étape",
      of: "sur",
      goalDetails: "Détails de l'objectif",
      planTitle: "Nom du plan",
      titlePlaceholder: "Ex: Vacances d'été, Nouvelle voiture...",
      description: "Description (optionnel)",
      descriptionPlaceholder: "Décrivez votre objectif...",
      targetAmount: "Montant objectif",
      amountPlaceholder: "Ex: 15000",
      duration: "Durée",
      durationPlaceholder: "Ex: 12",
      months: "Mois",
      years: "Années",
      category: "Catégorie",
      categories: {
        vacation: "Vacances",
        emergency: "Urgence",
        house: "Logement",
        car: "Transport",
        education: "Éducation",
        other: "Autre"
      },
      priority: "Priorité",
      priorities: {
        low: "Faible",
        medium: "Moyenne",
        high: "Élevée"
      },
      next: "Suivant",
      back: "Retour",
      planSummary: "Résumé du plan",
      monthlyAmount: "Versement mensuel suggéré",
      totalDuration: "Durée totale",
      createPlan: "Créer le plan",
      planCreated: "Plan d'épargne créé avec succès!",
      fillRequired: "Veuillez remplir tous les champs obligatoires"
    },
    ar: {
      title: "إنشاء خطة جديدة",
      step: "الخطوة",
      of: "من",
      goalDetails: "تفاصيل الهدف",
      planTitle: "اسم الخطة",
      titlePlaceholder: "مثال: عطلة الصيف، سيارة جديدة...",
      description: "الوصف (اختياري)",
      descriptionPlaceholder: "اوصف هدفك...",
      targetAmount: "المبلغ المطلوب",
      amountPlaceholder: "مثال: 15000",
      duration: "المدة",
      durationPlaceholder: "مثال: 12",
      months: "شهر",
      years: "سنة",
      category: "الفئة",
      categories: {
        vacation: "عطلة",
        emergency: "طوارئ",
        house: "سكن",
        car: "مواصلات",
        education: "تعليم",
        other: "أخرى"
      },
      priority: "الأولوية",
      priorities: {
        low: "منخفضة",
        medium: "متوسطة",
        high: "عالية"
      },
      next: "التالي",
      back: "العودة",
      planSummary: "ملخص الخطة",
      monthlyAmount: "المبلغ الشهري المقترح",
      totalDuration: "المدة الإجمالية",
      createPlan: "إنشاء الخطة",
      planCreated: "تم إنشاء خطة الادخار بنجاح!",
      fillRequired: "يرجى ملء جميع الحقول المطلوبة"
    }
  };

  const t = texts[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateMonthlyAmount = () => {
    const amount = parseFloat(formData.targetAmount);
    const duration = parseInt(formData.duration);
    const multiplier = formData.durationType === "years" ? 12 : 1;
    
    if (amount && duration) {
      return Math.ceil(amount / (duration * multiplier));
    }
    return 0;
  };

  const handleNext = () => {
    if (!formData.title || !formData.targetAmount || !formData.duration || !formData.category) {
      toast({
        title: "Erreur",
        description: t.fillRequired,
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "vacation": return <Target className="w-5 h-5" />;
      case "emergency": return <TrendingUp className="w-5 h-5" />;
      case "house": return <Target className="w-5 h-5" />;
      case "car": return <Target className="w-5 h-5" />;
      case "education": return <Target className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "vacation": return "bg-blue-500";
      case "emergency": return "bg-green-500";
      case "house": return "bg-purple-500";
      case "car": return "bg-orange-500";
      case "education": return "bg-indigo-500";
      default: return "bg-gray-500";
    }
  };

  const handleCreatePlan = () => {
    const duration = parseInt(formData.duration);
    const multiplier = formData.durationType === "years" ? 12 : 1;
    const totalMonths = duration * multiplier;
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + totalMonths);

    const newPlan: Omit<SavingsPlan, 'id'> = {
      title: formData.title,
      target: parseInt(formData.targetAmount),
      saved: 0,
      status: "active",
      endDate: endDate.toISOString().split('T')[0],
      monthlyAmount: calculateMonthlyAmount(),
      icon: getCategoryIcon(formData.category),
      color: getCategoryColor(formData.category),
      description: formData.description
    };

    onCreatePlan(newPlan);
    
    toast({
      title: "Succès",
      description: t.planCreated,
    });
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary-dark">
      {/* Header */}
      <div className="flex items-center justify-between p-6 text-primary-foreground">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={step === 1 ? onBack : () => setStep(1)}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        
        <div className="text-center">
          <h1 className="text-xl font-bold">{t.title}</h1>
          <p className="text-sm text-primary-foreground/80">
            {t.step} {step} {t.of} 2
          </p>
        </div>

        <div className="w-10" />
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-6">
        <div className="w-full bg-primary-foreground/20 rounded-full h-2">
          <div 
            className="bg-primary-foreground h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-background rounded-t-3xl pt-6 px-6 min-h-[70vh]">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{t.goalDetails}</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-foreground font-medium">
                  {t.planTitle} *
                </Label>
                <Input
                  id="title"
                  placeholder={t.titlePlaceholder}
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-foreground font-medium">
                  {t.description}
                </Label>
                <Textarea
                  id="description"
                  placeholder={t.descriptionPlaceholder}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="targetAmount" className="text-foreground font-medium">
                  {t.targetAmount} (MRU) *
                </Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder={t.amountPlaceholder}
                  value={formData.targetAmount}
                  onChange={(e) => handleInputChange("targetAmount", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration" className="text-foreground font-medium">
                    {t.duration} *
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder={t.durationPlaceholder}
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-foreground font-medium">Type</Label>
                  <Select 
                    value={formData.durationType} 
                    onValueChange={(value) => handleInputChange("durationType", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="months">{t.months}</SelectItem>
                      <SelectItem value="years">{t.years}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-foreground font-medium">{t.category} *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">{t.categories.vacation}</SelectItem>
                    <SelectItem value="emergency">{t.categories.emergency}</SelectItem>
                    <SelectItem value="house">{t.categories.house}</SelectItem>
                    <SelectItem value="car">{t.categories.car}</SelectItem>
                    <SelectItem value="education">{t.categories.education}</SelectItem>
                    <SelectItem value="other">{t.categories.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-foreground font-medium">{t.priority}</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value) => handleInputChange("priority", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t.priorities.low}</SelectItem>
                    <SelectItem value="medium">{t.priorities.medium}</SelectItem>
                    <SelectItem value="high">{t.priorities.high}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleNext}
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
              size="lg"
            >
              {t.next}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{t.planSummary}</h2>
            </div>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>{formData.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.description && (
                  <p className="text-muted-foreground">{formData.description}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{t.targetAmount}</span>
                    </div>
                    <p className="text-lg font-semibold">{parseInt(formData.targetAmount).toLocaleString()} MRU</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{t.totalDuration}</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {formData.duration} {formData.durationType === "months" ? t.months : t.years}
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">{t.monthlyAmount}</h4>
                  <p className="text-2xl font-bold text-primary">
                    {calculateMonthlyAmount().toLocaleString()} MRU
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="flex-1"
              >
                {t.back}
              </Button>
              <Button 
                onClick={handleCreatePlan}
                className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                {t.createPlan}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}