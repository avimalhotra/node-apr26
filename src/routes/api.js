import express from "express";
const router=express.Router();

import mongoose from '../config/dao.js';
import CarsSchema from '../models/Suzuki.js';
const Cars=mongoose.model("Cars",CarsSchema);

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,                            // 1hour
  max: 100,                                     // limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later."
});

router.use(limiter);

router.get("/",(req,res)=>{
     Cars.find({}).select('name type price -_id').then(i=>{
          res.status(200).json(i);
      }).catch(e=>{
          res.status(200).json(e);
     })
});


export default router;