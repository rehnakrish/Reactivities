import {
  action,
  computed,
  configure,
  makeAutoObservable,
  runInAction,
} from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  activityRegsitry = new Map();
  activities: IActivity[] = [];
  loading = false;
  selectedActivity: IActivity | undefined;
  editMode: boolean = false;
  submitting: boolean = false;
  target = "";

  constructor() {
    makeAutoObservable(this);
  }

  @computed get activitiesByDate() {
    return Array.from(this.activityRegsitry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loading = true;
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegsitry.set(activity.id, activity);
        });
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        console.error(error);
        this.loading = false;
      });
    }
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegsitry.get(id);
    this.editMode = false;
  };

  @action openCreateActivityForm = () => {
    this.selectedActivity = undefined;
    this.editMode = true;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegsitry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      console.error(console.error());
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegsitry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      console.error(console.error());
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegsitry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = "";
      });
      console.error(console.error());
    }
  };

  @action setEditMode = (editMode: boolean) => {
    this.editMode = editMode;
  };

  @action setSelectedActivity = (activity: IActivity | undefined) => {
    this.selectedActivity = activity;
  };
}

export default createContext(new ActivityStore());
