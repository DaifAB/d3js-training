import BarChart from '@/src/components/charts/BarChart';

export default function Home() {
  const barChartData = [
    { label: 'AAAAAA', value: 11 },
    { label: 'BBBBBB', value: 27 },
    { label: 'CCCCCC', value: 35 },
    { label: 'DDDDDD', value: 49 },
  ];

  const colors = ['#137B80'];
  return (
    <main className="flex min-h-screen items-center justify-center">
      <BarChart data={barChartData} colors={colors} axisLabel="Axis label" />
    </main>
  );
}
