import User from "../modal/user.modal.js"
import bcryptjs from "bcryptjs"
export const signup = async(req, res) =>{
    try {
        const {fullname, email, password} = req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User Already Registered"})
        }
        const hashpassword = await bcryptjs.hash(password, 10)
        const createdUser = new User ({
            fullname : fullname,
            email : email,
            password : hashpassword,
        })
      await  createdUser.save()
        res.status(201).json({
            message: "User Created Successfully",
                user:{
                    _id: createdUser._id,
                    fullname: createdUser.fullname,
                    email: createdUser.email
                }
        })
    } catch (error) {
        console.log("Error : " + error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}


export const Login = async (req, res) => {
    try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            const isMatch = await bcryptjs.compare(password, user.password)
                if(!user || !isMatch){
                    return res.status(404).json({message : "Invalid username or password"});
                }else{
                   res.status(200).json({
                    message: "Login successfully",
                    user: {
                        _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                }
            })
                }
    } catch (error) {
        console.log("Error :" + error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}