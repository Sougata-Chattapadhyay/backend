import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userScheme = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique: true,
            lowercase:true,
            trim : true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique: true,
            lowercase:true,
            trim : true,
        },
        fullname:{
            type:String,
            required:true,
            trim : true,
            index: true            
        },
        avatar:{
            type:String, //cloudinary
            required:true
        },
        coverImage:{
            type:String, //cloudinary  
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:'Video'
            }
        ],
        password:{
            type:String,
            required:[true,'Password is required']
        },
        refreshToken:{
            type: String
        }
    },
    {
        timestamps:true
    }
)
userScheme.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

userScheme.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
userScheme.methods.generateAccessToken = async function(){
    return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userScheme.methods.generateRefreshToken = async function(){
    return  jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userScheme);