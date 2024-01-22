import mongoose from "mongoose";

export default mongoose.connect("mongodb://localhost:27017/discordauth", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
