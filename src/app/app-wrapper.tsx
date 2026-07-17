import type { PropsWithChildren } from "react";

import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

export default function AppWrapper({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
