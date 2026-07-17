import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { VaultDoor } from "@/components/vault-door";

export const metadata: Metadata = {
  title: "Zaključano. — after-hours entrance",
  description: "This site is not public yet.",
  robots: { index: false, follow: false },
};

export default function VaultPage() {
  return (
    <Providers>
      <VaultDoor />
    </Providers>
  );
}
