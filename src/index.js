import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import router from "./routes/user.routes.js";
dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.use("/api/v1/users",router);
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.error("MongoDB connection failed !!! ",err);
    
});