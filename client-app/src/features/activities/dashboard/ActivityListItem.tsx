import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item,  Segment } from "semantic-ui-react";

import { IActivity } from "../../../models/activity";

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {  
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
            <Item>
          <Item.Image size="tiny" circular src="/assets/user.png"></Item.Image>
          <Item.Content>
            <Item.Header as="a">{activity.title}</Item.Header>
            <Item.Description>Hosted by Bob</Item.Description>            
          </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock"/>{activity.date}
        <Icon name="marker"/>{activity.venue},{activity.city}
        
      </Segment>
      <Segment secondary>Attendes will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          floated="right"
          as={Link}
          to={`/activities/${activity.id}`}
          content="View"
          color="blue"
        ></Button>
      </Segment>
    </Segment.Group>
  );
};
