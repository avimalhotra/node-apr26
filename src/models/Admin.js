import mongoose from "mongoose";

const Schema=mongoose.Schema;

const AdminSchema=new Schema({
     _id:mongoose.ObjectId,
     username:{ 
          type:String,
          required:true,
          unique:true,
          trim: true,
          minlength:3,
          maxlength:15
      },
     password:{ 
          type:String,
          required:true,
          trim: true,
          minlength:8,
          maxlength:20,
        
      }
},{collection:"admin"});

export default AdminSchema;