import type { Metadata } from "next";
import { SignupForm } from "@/components/patterns/SignupForm";

export const metadata: Metadata = {
  title: "Create account — Click Scope",
};

export default function SignupPage() {
  return <SignupForm />;
}
