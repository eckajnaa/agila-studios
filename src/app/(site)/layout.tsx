// Shared chrome for every page except the landing page ("/"), which is
// still blank while Person A builds it out. Once the landing page has its
// own Navbar/Footer usage sorted, this group can be folded back into the
// root layout — heads-up to the other two before doing that.
//
// Note: portfolio moved out to its own (portfolio) route group since it
// needs a different Navbar/Footer — see src/app/(portfolio)/layout.tsx.

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
