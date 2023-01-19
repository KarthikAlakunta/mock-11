const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        required: true,
        index: { unique: true }
    },
    password:{
        type:String,
        required: true
    }
},
{
    versionKey:false,
    timestamps:true
}
)

const User = mongoose.model("user",UserSchema);
module.exports = User;