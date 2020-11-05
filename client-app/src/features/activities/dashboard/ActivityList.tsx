import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activitystore";

export const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate,
    selectActivity,
    deleteActivity,
    submitting,
    target,
  } = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  onClick={() => selectActivity(activity.id)}
                  content="View"
                  color="blue"
                ></Button>
                <Button
                  loading={target === activity.id && submitting}
                  name={activity.id}
                  floated="right"
                  onClick={(e) => deleteActivity(e, activity.id)}
                  content="Delete"
                  color="red"
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
