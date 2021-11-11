import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import ApartmentSharpIcon from "@material-ui/icons/ApartmentSharp";
import { Box, Typography } from "@material-ui/core";
import ContactCard from "./ContactCard";
const useStyles = makeStyles((theme) => ({
    avatar: {
        fontSize: "40px !important"
    },
    grey: {
        background: "#8f9779"
    },
}));
export default function DashboardCards({ variant, name, number }) {
    const classes = useStyles();
    return (React.createElement(Card, { className: classes[variant], style: { minWidth: 280 } },
        React.createElement(CardHeader, { avatar: React.createElement(ApartmentSharpIcon, { "aria-label": "recipe", className: classes.avatar }), action: React.createElement(Typography, { variant: "subtitle1", gutterBottom: true },
                React.createElement(Box, null,
                    React.createElement(ContactCard, { contact: { name, number } }))) }),
        React.createElement("hr", null),
        React.createElement(CardActions, { disableSpacing: true })));
}