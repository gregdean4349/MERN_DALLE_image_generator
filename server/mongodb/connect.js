import colors from "colors"
import mongoose from "mongoose"

const connectDB = (url) => {
  mongoose.set("strictQuery", true)
  mongoose
    .connect(url)
    .then(() => console.log(colors.bold.italic.green("MongoDB online...")))
    .catch((err) => {
      console.error("Failed to connect with mongo")
      console.error(err)
    })
}
export default connectDB
