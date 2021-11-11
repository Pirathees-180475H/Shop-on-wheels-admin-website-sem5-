import React from 'react'
import { useTheme } from "@material-ui/styles";
import useStyles from "../styles";
import {LineChart,Line} from "recharts";
import {Grid,} from "@material-ui/core";
import Widget from "../../../components/Widget";
import { Typography } from "../../../components/Wrappers";

export default function TotalOrderLineChart({totalOrdersLength,deliveredOrderslength,pendingOrderslength}) {
    var classes = useStyles();
    var theme = useTheme();
    return (
        <Grid item lg={3} md={4} sm={6} xs={12} >
          <Widget
            title="Total Orders"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap  title="Total Orders2">
                  {totalOrdersLength}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <LineChart
                    width={100}
                    height={30}
                    data={[{ value: 10 },{ value: 20 },{ value: 10 },{ value: 17 },{ value: 18 },]}
                  >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Delivered
                </Typography>
                <Typography size="md">{deliveredOrderslength}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                 Pending
                </Typography>
                <Typography size="md">{pendingOrderslength}</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
    )
}


