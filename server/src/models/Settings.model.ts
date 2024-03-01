import mongoose, { Schema, type Document, type ObjectId } from 'mongoose';

interface SettingsDocument extends Document {
  // Timer settings
  user: ObjectId;
  pomodoroWorkTime: number; // Duration of work intervals in minutes
  pomodoroShortBreakTime: number; // Duration of short breaks in minutes
  pomodoroLongBreakTime: number; // Duration of long breaks (after multiple pomodoros) in minutes
  pomodoroIntervalCount: number; // Number of pomodoro intervals before a long break

  // Other settings (optional examples)
  defaultTimerType: 'pomodoro' | 'infinite' | 'task';
  soundNotifications: boolean;
  theme: 'light' | 'dark';
}

const SettingsSchema = new Schema<SettingsDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  pomodoroWorkTime: {
    type: Number,
    required: true,
    default: 25
  },
  pomodoroShortBreakTime: {
    type: Number,
    required: true,
    default: 5
  },
  pomodoroLongBreakTime: {
    type: Number,
    required: true,
    default: 15
  },
  pomodoroIntervalCount: {
    type: Number,
    required: true,
    default: 4
  },
  defaultTimerType: {
    type: String,
    required: true,
    enum: ['pomodoro', 'infinite', 'task'],
    default: 'pomodoro'
  },
  soundNotifications: {
    type: Boolean,
    required: true,
    default: true
  },
  theme: {
    type: String,
    required: true,
    enum: ['light', 'dark'],
    default: 'light'
  }
}, {
  timestamps: true
});

const Settings = mongoose.model<SettingsDocument>('setting', SettingsSchema);

export { Settings };