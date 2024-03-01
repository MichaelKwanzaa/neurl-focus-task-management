import mongoose, { Schema, type Document, type ObjectId } from 'mongoose'

interface TimerDocument extends Document{
    type: string; // Enum for different timer types
    duration: number; // Applicable to "Pomodoro" and "Task-based" (required, positive)
    cycles: number; // Applicable to "Pomodoro" (default 1, min 1)
    isStarted: boolean; // Indicates if the timer is currently running
    isPaused: boolean; // Indicates if the timer is paused    
}

const TimerSchema = new Schema<TimerDocument>({
    type: {
        type: String,
        required: true,
        enum: ['Pomodoro', 'Task-based', 'Infinite'],
      },
      duration: {
        type: Number,
        required: true,
        validate: { validator: (v) => v > 0 } // Ensure positive duration for relevant types
      },
      cycles: { type: Number, min: 1, default: 1 },
      isStarted: { type: Boolean, default: false },
      isPaused: { type: Boolean, default: false },
},
{
    timestamps: true
})

const Timer = mongoose.model<TimerDocument>('timer', TimerSchema)

export { Timer }