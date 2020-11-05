import React, { useContext } from "react";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activitystore";
import { observer } from "mobx-react-lite";



export const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity:activity,setEditMode,setSelectedActivity } = activityStore;
  return (
    <Card fluid>
      <Image
        src={`assets/categoryImages/${activity!.category}.jpg`}
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
            onClick={() => setEditMode(true)}
            content="Edit"
            color="blue"
          ></Button>
          <Button
            basic
            onClick={() => setSelectedActivity(undefined)}
            content="Cancel"
            color="grey"
          ></Button>
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails)
