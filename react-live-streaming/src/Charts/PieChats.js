import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Label
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#907AD8', '#FF3CB371', '#BFA554'];

const Bullet = ({ backgroundColor, size }) => {
  return (
    <div
      className="CirecleBullet"
      style={{
        display: "flex",
        backgroundColor,
        width: size,
        height: size,
        marginBottom: "-11px",
      }}
    ></div>
  );
};

const CustomizedLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="LegendList" 
    style={{ marginBottom: "5rem", marginLeft: "1.5rem"}}>
      {payload.map((entry, index) => (
        
        <li key={`item-${index}`} style={{
          display: "flex",
          marginLeft: index % 2 === 0 ? "" : "10rem",
          marginTop: index % 2 === 0 ? "" : "-0.5rem"
        }}>
          <div className="BulletLabel">
            <Bullet backgroundColor={entry.payload.fill} size="10px" />
            <div className="BulletLabelText" style={{ marginLeft: "1.5rem", fontSize: "13px"}}>{entry.value}</div>
          </div>
          <div style={{ display: "flex", marginLeft: "3px", fontSize: "13px"}}>: {entry.payload.value}</div>
        </li>
      ))}
    </ul>
  );
};

const CustomLabel = ({ viewBox, labelText, value }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fontSize="15"
      >
        {labelText}
      </text>
      <text
        x={cx}
        y={cy + 20}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fill="#0088FE"
        fontSize="26"
        fontWeight="600"
      >
        {value}
      </text>
    </g>
  );
};

const PieChats = (props) => {
  return (
    <div style={{ width: "100%", height: 420 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={props.data}
            dataKey="value"
            cx={200}
            cy={120}
            innerRadius={80}
            outerRadius={100}
          >
            {props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              content={<CustomLabel labelText="Emotion" value={7} />}
              position="center"
            />
          </Pie>
          <Legend content={<CustomizedLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChats;