import React, {
  useEffect,
  Fragment,

  useContext,
} from "react";
import { Container } from "semantic-ui-react";
import "./style.css";
import  NavBar  from "../features/nav/NavBar";
import  ActivityDashboard  from "../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "../layout/LoadingComponent";
import ActivityStore from "./stores/activitystore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);
 
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loading)
    return (
      <LoadingComponent content="Loading activities..."></LoadingComponent>
    );
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard/>
      </Container>
    </Fragment>
  );
};

export default observer(App);
