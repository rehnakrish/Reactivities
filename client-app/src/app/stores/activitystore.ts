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
  activityRegistry = new Map();
  loading = false;
  activity: IActivity | null = null;
  submitting: boolean = false;
  target = "";

  constructor() {
    makeAutoObservable(this);
  }

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
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
          this.activityRegistry.set(activity.id, activity);
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

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) this.activity = activity
    else {
      this.loading = true;
      try {
        activity = await agent.Activities.details(id)
        runInAction(() => {
          this.activity = activity
          this.loading = false
        })
      } catch (error) {
        console.error(error)
        runInAction(() => {
          this.loading = false
        })
      }
    }

  };

  @action clearActivity = () => {
    this.activity = null;
  }

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
  };

 
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
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
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
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
        this.activityRegistry.delete(id);
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


  @action setSelectedActivity = (activity: IActivity | null) => {
    this.activity = activity;
  };
}

export default createContext(new ActivityStore());
