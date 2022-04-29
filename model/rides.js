import mongoose from "mongoose";
mongoose.pluralize(null);
const BikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    unique: false,
  },
  latitude: {
    type: String,
    required: false,
    unique: false,
  },
  longitude: {
    type: String,
    required: false,
  },
  dificulty: {
    type: String,
    required: false,
  },
});

const Bike = mongoose.model("Bikingroute", BikeSchema);

export default Bike;
