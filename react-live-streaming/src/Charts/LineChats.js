import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const LineChats = (props) => {
    return(
        <LineChart
            width={890}
            height={300}
            data={props.data}
            margin={{
                top: 40,
                right: 30,
                left: 20,
                bottom: -30
            }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
            type="monotone"
            dataKey="positive"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="neutrality" stroke="#82ca9d" />
        <Line type="monotone" dataKey="negative" stroke="#fcac8d" />
        
        </LineChart>
    );
}

export default LineChats;