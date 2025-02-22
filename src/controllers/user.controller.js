import { response } from "express"
import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async(requestAnimationFrame, res)=>{
    response.status(200).json({
        message:"ok"
    })
})

export {registerUser}