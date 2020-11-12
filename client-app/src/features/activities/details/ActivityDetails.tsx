import React, { useContext, useEffect } from "react";
import {Grid} from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activitystore";
import { observer } from "mobx-react-lite";
import {  RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../layout/LoadingComponent";

import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";
import { ActivityDetailedHeader } from "./ActivityDetailedHeader";

interface DetailsParams {
  id: string;
}

export const ActivityDetails: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loading } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);
  if (loading )
    return <LoadingComponent content="Loading activity..."></LoadingComponent>;
  
  if (!activity)
    return <h2>Not Found</h2>

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
