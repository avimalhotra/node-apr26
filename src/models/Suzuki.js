import mongoose from "mongoose";

const Schema=mongoose.Schema;

const CarsSchema=new Schema({
     _id:mongoose.ObjectId,
     name:{ 
          type:String,
          required:true,
          unique:true,
          trim: true,
          minlength:3,
          maxlength:15
      },
     type:{ 
          type:String,
          required:true,
          trim: true,
          minlength:3,
          maxlength:20,
          enum: ['sedan', 'suv', 'hatchback', 'mpv']
      },
     price:{
          type:Number,
          required:true,
          min:0,
          max:10000000,
     }
},{collection:"suzuki"});


export default CarsSchema;