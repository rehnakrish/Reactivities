import React, { SyntheticEvent } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";

interface IProps {
  activities: IActivity[];
  selectActivityMethod: (id: string) => void;
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>,id: string) => void;
  submitting: boolean;
  target: string
}

export const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivityMethod,
  deleteActivity,
  submitting,target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity) => (
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
                  onClick={() => selectActivityMethod(activity.id)}
                  content="View"
                  color="blue"
                ></Button>
                <Button
                  loading={target === activity.id && submitting}
                  name={activity.id}
                  floated="right"
                  onClick={(e) => deleteActivity(e,activity.id)}
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
