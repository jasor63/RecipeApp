import mongoose from "mongoose";

mongoose.connect("mongodb+srv://jasor:jasor123@auth.ggmeqvc.mongodb.net/RecipeApp?retryWrites=true&w=majority").then(() => {
    console.log("Mongo Connected");
}).catch((err) => {
    console.log(err);
});

const userSchema = new mongoose.Schema ({
    username: {type: String},
    password: {type: String, required: true}
});

export const userModel = mongoose.model('user', userSchema);