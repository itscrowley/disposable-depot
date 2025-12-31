import SmartMenuPlanner from '@/components/SmartMenuPlanner';

export const metadata = {
  title: 'Smart Menu Planner | The Disposable Depot',
  description: 'Calculate disposable plates and cups for your catering menu.',
};

export default function PlannerPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <SmartMenuPlanner />
    </main>
  );
}
