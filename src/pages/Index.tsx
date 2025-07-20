import { useState } from "react";
import WalletHome from "@/components/WalletHome";
import IdikharApp from "@/components/IdikharApp";

const Index = () => {
  const [currentView, setCurrentView] = useState<"wallet" | "idikhar">("wallet");

  return (
    <div className="min-h-screen">
      {currentView === "wallet" ? (
        <WalletHome onServiceSelect={(service) => setCurrentView("idikhar")} />
      ) : (
        <IdikharApp onBack={() => setCurrentView("wallet")} />
      )}
    </div>
  );
};

export default Index;
