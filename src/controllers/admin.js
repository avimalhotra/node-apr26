function Admin(req,res){
     
     const {id,password}=req.body;
          
     if(id=="admin" && password=="123456"){
          res.status(200).send("hello admin");
     }
     else{
          res.status(403).send("not authorized");
     }
}

export default Admin;