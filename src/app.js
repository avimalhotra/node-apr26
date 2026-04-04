import express from 'express';
import path from 'path';
import nunjucks from "nunjucks";

const app = express();
const port=process.env.PORT || 3000;

app.use(express.static(path.resolve("src/public")));
app.use(express.static(path.resolve("node_modules/bootstrap/dist")));


// configure
nunjucks.configure(path.resolve('src/public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

app.get("/",(req,res)=>{
     res.status(200).render("index.html",{title:"Tech Altum", age: new Date().getFullYear()-2012 });
});

app.get("/about",(req,res)=>{
     res.status(200).render("about.html",{title:"About Us"});
});

app.get("/contact",(req,res)=>{
     res.status(200).render("contact.html",{title:"Contact Us"});
});


/* wild card */
app.get('/*splat',(req,res)=>{
    res.status(404).render(`error.html`,{title:"Page not found", status:404});
}); 


app.listen(port,()=>{
     console.log(`App running at http://127.0.0.1:${port}`);
})