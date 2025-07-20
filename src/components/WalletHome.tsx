import { Bell, User, Eye, EyeOff, Home, FileText, MapPin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const ServiceCard = ({ icon, title, onClick }: ServiceCardProps) => (
  <div 
    className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-200 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground">{title}</span>
    </div>
  </div>
);

interface WalletHomeProps {
  onServiceSelect: (service: string) => void;
}

export default function WalletHome({ onServiceSelect }: WalletHomeProps) {
  const [balanceVisible, setBalanceVisible] = useState(false);

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm5-18v4h3V3h-3z"/>
        </svg>
      ),
      title: "transfert d'argent"
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      ),
      title: "paiement de factures"
    }
  ];

  const quickServices = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      title: "Recharge téléphonique"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 7h-3V6a4 4 0 00-8 0v1H5a1 1 0 00-1 1v11a3 3 0 003 3h10a3 3 0 003-3V8a1 1 0 00-1-1zM10 6a2 2 0 014 0v1h-4V6zm6 14a1 1 0 01-1 1H7a1 1 0 01-1-1V9h2v1a1 1 0 002 0V9h4v1a1 1 0 002 0V9h2v11z"/>
        </svg>
      ),
      title: "Retrait"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
      ),
      title: "GIMTEL"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 3h20l-2 14H4L2 3z"/>
          <path d="M6 3v14l2-2h8l2 2V3"/>
        </svg>
      ),
      title: "paiement commerçant"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: "Idikhar"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary-dark">
      {/* Status Bar */}
      <div className="flex justify-between items-center text-primary-foreground px-6 pt-2 pb-4 text-sm font-medium">
        <span>1:00 🌙</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-primary-foreground rounded-full"></div>
            <div className="w-1 h-3 bg-primary-foreground rounded-full"></div>
            <div className="w-1 h-3 bg-primary-foreground rounded-full"></div>
            <div className="w-1 h-3 bg-primary-foreground/60 rounded-full"></div>
          </div>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-6 mb-8">
        <Button variant="ghost" size="icon" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
          <User className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
          <Bell className="w-6 h-6" />
        </Button>
      </div>

      {/* User Info */}
      <div className="text-center text-primary-foreground mb-8">
        <h1 className="text-xl font-semibold mb-2">Mama Mohamed Amar Jewda</h1>
        <p className="text-primary-foreground/80 mb-4">Solde actuel</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-lg">** **</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            {balanceVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background rounded-t-3xl pt-8 px-6 min-h-[60vh] overflow-hidden">
        {/* Main Services */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
            />
          ))}
        </div>

        {/* Quick Services */}
        <div className="mb-28">
          <h2 className="text-lg font-semibold text-foreground mb-4">Services rapides</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                onClick={() => service.title === "Idikhar" ? onServiceSelect("idikhar") : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around py-3">
          <div className="flex flex-col items-center space-y-1">
            <Home className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold tracking-wide text-primary">Tableau de bord</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground">Transactions</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground">Localisateur</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Menu className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground">Menu</span>
          </div>
        </div>
        <div className="h-1 bg-foreground rounded-full mx-auto w-32 mt-2"></div>
      </div>
    </div>
  );
}