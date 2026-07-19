import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { SparklesIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function ReportsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <ChartBarIcon className="w-8 h-8 text-primary" />
          Monthly Insights: June
        </h1>
        <p className="text-neutral">Deep analysis from your Monthly Agent on your past 30 days.</p>
      </div>

      <Card className="border-primary bg-primary/5 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-primary-dark flex items-center gap-2">
            <SparklesIcon className="w-6 h-6" />
            Agent Recommendation for July
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed text-lg font-medium">
            "Your consistency peaks massively before 9 AM, but drops by 70% after 6 PM. For July, I highly recommend moving any cognitively demanding habits to the morning, and strictly limiting evening habits to passive routines like stretching or reading."
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Best Performing Habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded bg-green-50 border border-green-100">
              <span className="font-semibold text-green-900">Morning Jog</span>
              <span className="text-green-700 font-bold">92%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded bg-green-50 border border-green-100">
              <span className="font-semibold text-green-900">Drink 2L Water</span>
              <span className="text-green-700 font-bold">85%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Struggling Habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded bg-red-50 border border-red-100">
              <span className="font-semibold text-red-900">Read 10 pages</span>
              <span className="text-red-700 font-bold">30%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-neutral" />
              Hidden Patterns Detected
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-3 text-foreground">
              <li>You are <span className="font-bold text-primary-dark">2.4x more likely</span> to complete your evening routine on days you complete your morning jog.</li>
              <li>Tuesdays and Thursdays are your lowest energy days based on your check-in notes. (Consider shrinking habit scopes on these days).</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
