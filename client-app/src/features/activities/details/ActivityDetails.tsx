import React, { useContext, useEffect } from "react";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activitystore";
import { observer } from "mobx-react-lite";
import { Link, RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../layout/LoadingComponent";

interface DetailsParams {
  id: string;
}

export const ActivityDetails: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity,
    loadActivity,
    loading,
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity,match.params.id]);
  if (loading || !activity)
    return <LoadingComponent content="Loading activity..."></LoadingComponent>;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button
            basic
            as={Link} to={`/manage/${activity.id}`}
            content="Edit"
            color="blue"
          ></Button>
          <Button
            basic
            onClick={() => history.push('/activities')}
            content="Cancel"
            color="grey"
          ></Button>
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
