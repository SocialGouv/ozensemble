import dayjs from "dayjs";
import { atom } from "recoil";
import { storage } from "../services/storage";
import { getInitValueFromStorage } from "./utils";

export const reminderGainsHasBeenSetState = atom({
  key: "reminderGainsHasBeenSetState",
  default: getInitValueFromStorage("@GainsReminder-setup", false),
  effects: [({ onSet }) => onSet((newValue) => storage.set("@GainsReminder-setup", newValue))],
});

export const reminderGain = atom({
  key: "reminderGain",
  default: getInitValueFromStorage(
    "@GainsReminder",
    dayjs().set("hours", 20).set("minutes", 0).toISOString()
  ),
  effects: [
    ({ onSet }) => onSet((newValue) => storage.set("@GainsReminder", JSON.stringify(newValue))),
  ],
});

export const reminderGainMode = atom({
  key: "reminderGainMode",
  default: getInitValueFromStorage("@GainsReminder-mode", "day"),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => storage.set("@GainsReminder-mode", JSON.stringify(newValue))),
  ],
});

export const reminderGainWeekDay = atom({
  key: "reminderGainWeekDay",
  default: getInitValueFromStorage("@GainsReminder-weekDay", 0),
  effects: [
    ({ onSet }) => onSet((newValue) => storage.set("@GainsReminder-weekDay", newValue || 0)),
  ],
});
