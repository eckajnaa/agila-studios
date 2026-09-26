// Portfolio-only chrome — the portfolio page uses its own nav categories
// (Builds/Models/Development/Editing/Scripts/Animation) and footer content,
// so it lives in its own route group instead of sharing (site)'s Navbar/Footer.

import PortfolioNavbar from "@/components/layout/PortfolioNavbar";
import PortfolioFooter from "@/components/layout/PortfolioFooter";
import ScrollProgress from "@/components/layout/ScrollProgress";
import { PortfolioCategoryProvider } from "@/components/layout/PortfolioCategoryContext";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioCategoryProvider>
      <ScrollProgress />
      <PortfolioNavbar />
      <main className="flex-1">{children}</main>
      <PortfolioFooter />
    </PortfolioCategoryProvider>
  );
}
