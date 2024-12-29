import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./public/temp")
    },
    filename: function (req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix+extension)
    }
})
export const upload = multer({ storage: storage })  //same as {storage} as we are using es6