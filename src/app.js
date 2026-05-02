import express from 'express';
import path from 'path';
import nunjucks from "nunjucks";

/* db */
import mongoose from './config/dao.js';
import CarsSchema from './models/Suzuki.js';
import AdminSchema from './models/Admin.js';
const Cars=mongoose.model("Cars",CarsSchema);
const Admins=mongoose.model("Admins",AdminSchema);


const app = express();
const port=process.env.PORT || 3000;

app.use(express.static(path.resolve("src/public")));
app.use(express.static(path.resolve("node_modules/bootstrap/dist")));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import Admin from './controllers/admin.js';

/* APi Routes */
import router from './routes/api.js';

app.use("/api",router);

// configure
nunjucks.configure(path.resolve('src/public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

app.get("/",(req,res)=>{
          res.status(200).render("index.njk",{
          title:"tech altum", 
          age: new Date().getFullYear()-2012, 
          car:{name:"swift",power:82,torque:112,price:800000},
          city:"noida"
     });
     
});

app.get("/about",(req,res)=>{
     res.status(200).render("about.html",{title:"About Us"});
});

app.get("/login",(req,res)=>{
     res.status(200).render("login.html",{title:"Login"});
});

app.get("/cars",(req,res)=>{
      Cars.find({}).select('name type price -_id').then(i=>{
          res.status(200).render("cars.njk",{title:"All Cars", cars:i});
      }).catch(e=>{
          console.warn(e);
     })
});

app.get("/cars/:car",(req,res)=>{
     const car=req.params.car.replaceAll("-"," ");

      Cars.find({name:car}).select("-_id").then(i=>{
          if(i.length){
               res.status(200).render("car.njk",{title:car, car:i});
          }
          else{
               res.status(200).render("car.njk",{title:"No Car Found"});
          }
      });
     
});



app.get("/addcars",(req,res)=>{

     const {car,price,type}=req.query;

     const newCar=new Cars({
          _id: new mongoose.Types.ObjectId(),
          name:car,
          type:type,
          price:price
     });

     newCar.save().then(i=>res.status(200).send(`${i} saved successfully`)).catch(err=>res.status(400).send(`Error while saving data : ${err}`));

});

app.post("/admin",Admin);

app.get("/contact",(req,res)=>{
     res.status(200).render("contact.html",{title:"Contact Us"});
});

/* wild card */
app.get('/*splat',(req,res)=>{
    res.status(404).render(`error.html`,{title:"Page not found", status:404});
}); 

app.listen(port,()=>{
     console.log(`App running at http://127.0.0.1:${port}`);
});