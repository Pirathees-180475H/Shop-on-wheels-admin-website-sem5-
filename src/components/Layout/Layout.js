import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, Link} from '@material-ui/core'


// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Allvendors from "../../pages/allVendors/allVendors";
import AllOrders from "../../pages/allOrders/allOrders";
import Maps from "../../pages/maps";
import AllCustomers from "../../pages/allCustomers/allCustomers";
import Reports from "../../pages/userReports/userReports";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/allVendors" component={Allvendors} />
              <Route path="/app/allCustomers" component={AllCustomers} />
              <Route path="/app/allOrders" component={AllOrders} />

              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/reports" component={Reports} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                <Link
                  color={'primary'}
              
                  target={'_blank'}
                  className={classes.link}
                >
                 @shopOnWheel
                </Link>
                <Link
                  color={'primary'}
                
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div>
              <div>      
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
