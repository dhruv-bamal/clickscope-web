import type { Metadata } from "next";
import { LoginForm } from "@/components/patterns/LoginForm";

export const metadata: Metadata = { title: "Sign in — Click Scope" };

export default function LoginPage() {
  return <LoginForm />;
}
