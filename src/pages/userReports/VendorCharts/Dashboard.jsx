import React, { useState } from "react";
import DashboardCards from "./DashboardCards";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { Box, Grid } from "@material-ui/core";
import "./styles.css";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';


function Dashboard({totalTransaction,totalOrderCount,vendor,setChartShow}) {
    const [darkMode, setDarkMode] = useState(false);
    let TotalTransaction = 0;
    let TotalOrderCount = 0;
    const clickHandler =()=>{
        setChartShow(false)
    }
    if(totalOrderCount && totalTransaction){TotalOrderCount=totalOrderCount;TotalTransaction=totalTransaction}
    return (
            React.createElement("div", { className: "App" },
                React.createElement("div", { className: darkMode ? "dark-mode" : "light-mode" },
                   
                    React.createElement(Box, null,
                        React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                            React.createElement(DashboardCards, { name: "Total Transaction", number: TotalTransaction, variant: "grey" }),

                            React.createElement("div", { className: "container" },
                                React.createElement("span", { style: { color: darkMode ? "grey" : "yellow" } }, "\u2600\uFE0E"),
                                React.createElement("div", { className: "switch-checkbox" },
                                    React.createElement("label", { className: "switch" },
                                        React.createElement("input", { type: "checkbox", onChange: () => setDarkMode(!darkMode) }),
                                        React.createElement("span", { className: "slider round" }, " "))),
                                React.createElement("span", { style: { color: darkMode ? "#c96dfd" : "grey" } }, "\u263D")),
                                <div style={{marginTop:'65px'}}><ArrowBackRoundedIcon onClick={clickHandler}/></div>,                                
                                
                            React.createElement(DashboardCards, { name: "Total Orders", number: TotalOrderCount, variant: "grey" })),

                        React.createElement(Box, { width: "100%", margin: "100px" }),
                        React.createElement(Box, null,
                            React.createElement(Grid, { container: true },
                                React.createElement(Grid, { item: true, xs: 8 },
                                    React.createElement(BarChart, {id:vendor.id})),
                                React.createElement(Grid, { item: true, xs: 4 },
                                    React.createElement(PieChart, {id:vendor.id}))))
                                    
                                    ))));
}
export default Dashboard;
