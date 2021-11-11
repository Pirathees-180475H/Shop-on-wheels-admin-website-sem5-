import React from 'react'
import { useTheme } from "@material-ui/styles";
import useStyles from "../styles";
import {ResponsiveContainer,PieChart,Pie,Cell,} from "recharts";
//componets
import {Grid,} from "@material-ui/core";
import Widget from "../../../components/Widget";
import { Typography } from "../../../components/Wrappers";
import Dot from "../../../components/Sidebar/components/Dot";

function TotalUsersBarChart({userCount,vendorsCount}) {
    var classes = useStyles();
    var theme = useTheme();
    let PieChartData = [
        { name: "Customers", value:userCount, color: "primary" },
        { name: "Vendors  ", value:vendorsCount, color: "secondary" },
        
      ];
    
    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
        <Widget title="Total Users" upperTitle className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ResponsiveContainer width="100%" height={144}>
                <PieChart>
                  <Pie
                    data={PieChartData}
                    innerRadius={30}
                    outerRadius={40}
                    dataKey="value"
                  >
                    {PieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={theme.palette[entry.color].main}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.pieChartLegendWrapper}>
                {PieChartData.map(({ name, value, color }, index) => (
                  <div key={color} className={classes.legendItemContainer}>
                    <Dot color={color} />
                    <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                      &nbsp;{name}&nbsp;
                    </Typography>
                    <Typography color="text" colorBrightness="secondary">
                      &nbsp;{value}
                    </Typography>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Widget>
      </Grid>

    )
}

export default TotalUsersBarChart
