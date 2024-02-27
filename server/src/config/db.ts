import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const connectDB = async () => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const uri = process.env.MONGODB_CONNECTION_URL ?? ''
  try {
    await mongoose.connect(uri)
    console.log('MongoDB Connected')
  } catch (err) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}