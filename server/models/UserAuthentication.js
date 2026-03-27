import Mongoose from 'mongoose';


const Users = Mongoose.Schema({
    username: {type: String, required: true},
    email:{type: String, unique: true, required:true},
    password:{type:String, required:true, minlength:6}
});

export default Mongoose.model("UserAuth", Users, "User Authentication");