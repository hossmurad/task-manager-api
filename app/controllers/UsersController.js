import UsersModel from "../model/UsersModel.js";
import {TokenEncode} from "../utility/tokenUtility.js";
import usersModel from "../model/UsersModel.js";
import SendEmail from "../utility/EmailUtility.js";



//registation

export const Registration=async(req,res)=>{

    try {
        let reqBody=req.body;
        await UsersModel.create(reqBody)
        return res.json({status:"success","Message":"User registered successfully"})
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }


}



//lig in

export const Login=async(req,res)=>{
    try {
        let reqBody=req.body;
        let data=await UsersModel.findOne(reqBody)

        if(data==null){
            return res.json({status:"fail","Message":"User not found"})
        }
        else{
            // Login Success
            let token=TokenEncode(data['email'],data['_id'])
            return res.json({status:"success","Message":"User login successfully",data:{token:token}})
        }
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}




//profile Details

export const ProfileDetails=async(req,res)=>{
    try {
        let user_id=req.headers['user_id']
        let data=await UsersModel.findOne({"_id":user_id})
        return res.json({status:"success",message:"User profile successfully",data:data})
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}



//profile Update

export const ProfileUpdate = async (req, res) => {

    try {
        let reqBody=req.body;
        let user_id=req.headers['user_id']
        await UsersModel.updateOne({"_id":user_id},reqBody)
        return res.json({status:"success","Message":"User update successfully"})
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}





//email verification send code to email

export const EmailVerify = async (req, res) => {
   try{
       let email = req.params.email;
       let data = await  usersModel.findOne({email:email})
       if (data==null){
           return res.json({status:"fail","Message":"User does not exist"})
       } else {


           let code = Math.floor(100000+ Math.random()*900000)
           let EmailTo = data['email'];
           let EmailText = "Your code is "+ code;
           let EmailSubject = "Task Manager Verivication code From Md. Murad Hossain"

           await  SendEmail(EmailTo, EmailText, EmailSubject)
           await UsersModel.updateOne({email:email},{otp:code})
           return res.json({status:"success","Message":"Email verified successfully,check your email"})
       }
   }
   catch (e) {
       return res.json({status:"fail","Message":e.toString()})
   }
}



//code verification which is send to your email

export const CodeVerify = async (req, res) => {
    try {
        let reqBody=req.body;
        let data=await UsersModel.findOne({email: reqBody['email'],otp:reqBody['otp']})
        if(data==null){
            return res.json({status:"fail","Message":"Wrong Verification Code"})
        }
        else {
            return res.json({status:"success","Message":"Verification successfully"})
        }
    }
    catch (e){
        return res.json({status:"fail","Message":e.toString()})
    }
}



  //Reset Password

export const ResetPassword = async (req, res) => {
    try {
        let reqBody=req.body;
        let data=await UsersModel.findOne({email: reqBody['email'],otp:reqBody['otp']})
        if(data==null){
            return res.json({status:"fail","Message":"Wrong Verification Code"})
        }
        else {

            await UsersModel.updateOne({email: reqBody['email']},{
                otp:"0", password:reqBody['password'],
            })
            return res.json({status:"success",Message:"Password Reset successfully"})
        }
    }
    catch (e){
        return res.json({status:"fail","Message":e.toString()})
    }

}
