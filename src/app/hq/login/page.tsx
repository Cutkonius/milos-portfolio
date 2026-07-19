import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "HQ — sign in",
  robots: { index: false, follow: false },
};

export default function HqLoginPage() {
  return <LoginForm />;
}
