import React from 'react'
import { Button, ButtonGroup, Card,  Image } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'

interface IProps{

  activity:IActivity;
  setEditMode: (editMode:boolean) => void;
  setSelectedActivity : (selectedActivity: IActivity| null) => void;
}

export const ActivityDetails:React.FC<IProps> = ({activity,setEditMode,setSelectedActivity}) => {
    return (
        <Card fluid>
    <Image src={`assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span>{activity.date}</span>
      </Card.Meta>
      <Card.Description>
      {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <ButtonGroup widths={2}>
          <Button basic onClick={() => setEditMode(true)} content='Edit' color='blue'></Button>
          <Button basic onClick={() => setSelectedActivity(null)} content='Cancel' color='grey'></Button>
      </ButtonGroup>
    </Card.Content>
  </Card>
    )
}