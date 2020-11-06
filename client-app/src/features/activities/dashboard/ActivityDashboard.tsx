import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import  ActivityList  from "./ActivityList";
import ActivityStore from "../../../app/stores/activitystore";
import { LoadingComponent } from "../../../layout/LoadingComponent";



export const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loading)
    return (
      <LoadingComponent content="Loading activities..."></LoadingComponent>
    );
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />            
      </Grid.Column>
      <Grid.Column width={6}>
      Activity Filters here
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);
