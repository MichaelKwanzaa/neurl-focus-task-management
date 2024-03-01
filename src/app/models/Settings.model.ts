export interface Settings {
    // Timer settings
    pomodoroWorkTime: number; // Duration of work intervals in minutes
    pomodoroShortBreakTime: number; // Duration of short breaks in minutes
    pomodoroLongBreakTime: number; // Duration of long breaks (after multiple pomodoros) in minutes
    pomodoroIntervalCount: number; // Number of pomodoro intervals before a long break
  
    // Other settings (optional examples)
    defaultTimerType: 'pomodoro' | 'infinite' | 'task';
    soundNotifications: boolean;
    theme: 'light' | 'dark';
  }