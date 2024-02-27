import mongoose, { Schema, type Document, type ObjectId } from 'mongoose'

interface SettingsDocument extends Document{

}

const SettingsSchema = new Schema<SettingsDocument>({

},
{
    timestamps: true
})

const Settings = mongoose.model<SettingsDocument>('settings', SettingsSchema)

export { Settings }