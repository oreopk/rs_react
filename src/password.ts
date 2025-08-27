export default function passwordRecommendation(p: string): string | null {
  if (!/[A-Z]/.test(p)) return "Recommendation: add an uppercase letter";
  if (!/[a-z]/.test(p)) return "Recommendation: add a lowercase letter";
  if (!/\d/.test(p)) return "Recommendation: add a number";
  if (!/[^A-Za-z0-9]/.test(p)) return "Recommendation: add a special symbol";

  return "Strong password";
}
