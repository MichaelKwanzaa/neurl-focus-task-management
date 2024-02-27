import mongoose, { Schema, type Document, type ObjectId } from 'mongoose'

interface UserDocument extends Document{
    name: string
    userId: string
    email: string
    password: string
    role: 'user' | 'admin'
    subscriptions: ObjectId[]
    tasks: ObjectId[]
    notifications: ObjectId[]
}

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true, index: true, trim: true, lowercase: true },
    userId: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    subscriptions: [{
        type: Schema.Types.ObjectId,
        ref: 'subscription'
    }],
    tasks: [{ 
        type: Schema.Types.ObjectId,
        ref: 'task'
    }],
    notifications: [{
        type: {type: String, required: true},
        read: {type: Boolean, default: false}
    }]
},
{
    timestamps: true
})

const User = mongoose.model<UserDocument>('user', UserSchema)

export { User }