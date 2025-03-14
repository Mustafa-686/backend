import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type:String,
            required: true,
            lowercase:true,
            unique:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            required: true,
            lowercase:true,
            unique:true,
            trim:true,
            index:true,
        },
        password:{
            type:String,
            required: true,
           
            
        },
        fullname:{
            type:String,
            required: true,
           
        },
        avatar:{
            type:String,
            required: true,
            
        },
        coverImage:{
            type:String,
            required: true,
           
        },
        refershToken:{
            type:String,
            required: true,
           
        },
        watchHistory:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref:"video"

            }
        ]
    },{timestamps:true}
);

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.GenerateAccessToken = function(){
     return jwt.sign(
        {
        _id: this._id,
        email:  this.email,
        username:  this.username,
        fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
)
}
userSchema.methods.GenerateRefreshToken = function(){
    return jwt.sign(
        {
        _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
)
}


export const User = mongoose.model("User", userSchema);

