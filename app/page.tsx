import BarChart from '@/src/components/charts/BarChart';
import BubbleChart from '@/src/components/charts/BubbleChart';
import HierarchicalEdgeBundling from '@/src/components/charts/HierarchicalEdgeBundling';
import LineChart from '@/src/components/charts/LineChart';
import Map from '@/src/components/charts/Map';
import PieChart from '@/src/components/charts/PieChart';
import { BubbleChartData } from '@/src/types/chartsDataTypes';

const generateDummyData = (): BubbleChartData[] => {
  const generateRandomDate = (startDate: Date, endDate: Date): Date => {
    return new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
  };

  const startDate = new Date('2022-01-01');
  const endDate = new Date('2023-12-31');
  const dummyData: BubbleChartData[] = Array.from({ length: 50 }, () => {
    const xValue = generateRandomDate(startDate, endDate);
    // const xValue = Math.floor(Math.random() * 100);
    const yValue = Math.floor(Math.random() * 5000);
    const zValue = Math.floor(Math.random() * 100);
    return { xValue, yValue, zValue };
  });
  return dummyData;
};

function generateRandomPointInBrazil(): [number, number] {
  // Bounding box for Brazil's latitude and longitude
  const minLat = -33.75; // Southernmost point
  const maxLat = 5.25; // Northernmost point
  const minLon = -74.0; // Westernmost point
  const maxLon = -34.8; // Easternmost point

  const randomLat = minLat + Math.random() * (maxLat - minLat);
  const randomLon = minLon + Math.random() * (maxLon - minLon);

  return [randomLon, randomLat];
}

function generateRandomPointsInBrazil(numPoints: number): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < numPoints; i++) {
    points.push(generateRandomPointInBrazil());
  }
  return points;
}

export default function Home() {
  const barChartData = [
    { label: 'AAAAAA', value: 11 },
    { label: 'BBBBBB', value: 27 },
    { label: 'CCCCCC', value: 35 },
    { label: 'DDDDDD', value: 49 },
  ];

  const lineChartData = [
    { xValue: new Date('2023-01-01'), yValue: 100 },
    { xValue: new Date('2023-01-02'), yValue: 0 },
    { xValue: new Date('2023-01-03'), yValue: 95 },
    { xValue: new Date('2023-01-04'), yValue: 120 },
    { xValue: new Date('2023-01-05'), yValue: 115 },
    { xValue: new Date('2023-01-06'), yValue: 50 },
    { xValue: new Date('2023-01-07'), yValue: 100 },
    { xValue: new Date('2023-01-08'), yValue: 110 },
    { xValue: new Date('2023-01-09'), yValue: 95 },
    { xValue: new Date('2023-01-10'), yValue: 120 },
    { xValue: new Date('2023-01-11'), yValue: 115 },
    { xValue: new Date('2023-01-12'), yValue: 90 },
    { xValue: new Date('2023-01-13'), yValue: 100 },
    { xValue: new Date('2023-01-14'), yValue: 10 },
    { xValue: new Date('2023-01-15'), yValue: 95 },
    { xValue: new Date('2023-01-16'), yValue: 120 },
    { xValue: new Date('2023-01-17'), yValue: 115 },
    { xValue: new Date('2023-01-18'), yValue: 90 },
    { xValue: new Date('2023-01-19'), yValue: 12 },
    { xValue: new Date('2023-01-20'), yValue: 110 },
    { xValue: new Date('2023-01-21'), yValue: 95 },
    { xValue: new Date('2023-01-22'), yValue: 70 },
    { xValue: new Date('2023-01-23'), yValue: 115 },
    { xValue: new Date('2023-01-24'), yValue: 90 },
    { xValue: new Date('2023-01-25'), yValue: 50 },
    { xValue: new Date('2023-01-26'), yValue: 110 },
    { xValue: new Date('2023-01-27'), yValue: 95 },
  ];

  // const lineChartData = [
  //   { xValue: 0, yValue: 100 },
  //   { xValue: 10, yValue: 0 },
  //   { xValue: 20, yValue: 95 },
  //   { xValue: 30, yValue: 120 },
  //   { xValue: 40, yValue: 115 },
  //   { xValue: 50, yValue: 50 },
  //   { xValue: 60, yValue: 100 },
  //   { xValue: 70, yValue: 110 },
  //   { xValue: 80, yValue: 95 },
  //   { xValue: 90, yValue: 120 },
  //   { xValue: 100, yValue: 115 },
  //   { xValue: 110, yValue: 90 },
  //   { xValue: 120, yValue: 100 },
  //   { xValue: 130, yValue: 10 },
  //   { xValue: 140, yValue: 95 },
  //   { xValue: 150, yValue: 120 },
  //   { xValue: 160, yValue: 115 },
  //   { xValue: 170, yValue: 90 },
  //   { xValue: 180, yValue: 12 },
  //   { xValue: 190, yValue: 110 },
  //   { xValue: 200, yValue: 95 },
  // ];

  const pieChartData = [
    { label: 'A', value: 30 },
    { label: 'B', value: 45 },
    { label: 'C', value: 25 },
  ];

  const bubbleChartData = generateDummyData();

  const colors = ['#137B80', '#8E6C8A', '#E3BA22', ' #005D6E'];

  const cities = [
    {
      id: 'CityA',
      purchases: ['CityB', 'CityC', 'CityD'],
      x: 50,
      y: 200,
    },
    {
      id: 'CityB',
      purchases: ['CityA', 'CityC', 'CityE'],
      x: 200,
      y: 50,
    },
    {
      id: 'CityC',
      purchases: ['CityA', 'CityB', 'CityD', 'CityE'],
      x: 350,
      y: 200,
    },
    {
      id: 'CityD',
      purchases: ['CityA', 'CityC'],
      x: 200,
      y: 350,
    },
    {
      id: 'CityE',
      purchases: ['CityB', 'CityC'],
      x: 500,
      y: 200,
    },
  ];

  const data: [number, number][] = generateRandomPointsInBrazil(10);

  return (
    <main className="flex min-h-screen items-center justify-center flex-col gap-10">
      <Map
        data={[
          [-52, -15],
          [-35, -7],
          [-71, -9],
          [-46.63929204800168, -23.54562128115268],
          [-43.17405884636481, -22.90247241249798],
          [-51.17998743, -0.039598369],
          [-60.6199797, -3.289580873],
        ]}
      />
      <BarChart data={barChartData} xAxisLabel="Category" yAxisLabel="Sales" />
      <LineChart
        data={lineChartData}
        yAxisLabel="YAxis label"
        color={colors[0]}
      />
      <div className="flex gap-10">
        <PieChart data={pieChartData} colors={colors} type="pie" />
        <PieChart data={pieChartData} colors={colors} type="donut" />
      </div>
      <BubbleChart
        data={bubbleChartData}
        xAxisLabel="Date"
        yAxisLabel="Sales"
        zAxisLabel="Average Order Value"
      />
      <HierarchicalEdgeBundling cities={cities} />
    </main>
  );
}
