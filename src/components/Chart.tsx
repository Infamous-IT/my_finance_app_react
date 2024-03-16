import {FC} from 'react';
import {IChart, IDataChart} from '../types/types.ts';
import {Cell, Legend, Pie, PieChart, Tooltip} from 'recharts';

const Chart: FC<IChart> = ({totalIncome, totalExpense}) => {
    const COLORS = ['#00a057', '#fd4c4c'];
    const data = new Array<IDataChart>({
            value: totalIncome,
            name: 'Income',
            color: COLORS[0],
        },
        {
            value: totalExpense,
            name: 'Expense',
            color: COLORS[1],
        });

    return (
        <PieChart width={240} height={240}>
            <Pie
                data={data}
                cx={'50%'}
                cy={'50%'}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
            >
                {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend/>
            <Tooltip/>
        </PieChart>
    )
}

export default Chart;