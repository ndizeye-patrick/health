import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface BarChartProps {
    data: any[];
    title: string;
    metric: string;
    unit?: string;
}

export function BarChartComponent({ data, title, metric, unit }: BarChartProps) {
    const colors = ['#2563eb', '#dc2626', '#16a34a'];

    return (
        <div className="chart-container">
            <h3>{title}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={metric} fill={colors[0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
