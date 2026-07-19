import { redirect } from 'next/navigation';

export default function PlanPage() {
  // Redirect to dashboard where the active plan is displayed
  redirect('/dashboard');
}
