import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
import {v4 as uuid} from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
}) => {
  const initialiseForm = () => {
    if (initialFormState) return initialFormState;
    else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initialiseForm);
  const handleSubmit = () => {
    console.log(activity);
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // console.log(event.target.value);
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          name="title"
          onChange={handleInputChange}
          value={activity.title}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          onChange={handleInputChange}
          value={activity.description}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          onChange={handleInputChange}
          value={activity.category}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          name="date"
          onChange={handleInputChange}
          value={activity.date}
        />
        <Form.Input
          placeholder="City"
          name="city"
          onChange={handleInputChange}
          value={activity.city}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          onChange={handleInputChange}
          value={activity.venue}
        />
        <Button
          type="submit"
          positive
          floated="right"
          content="Submit"
        ></Button>
        <Button
          onClick={() => setEditMode(false)}
          type="button"
          floated="right"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};
