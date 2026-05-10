import mongoose from "mongoose";

async function main() {
     await mongoose.connect('mongodb://127.0.0.1:27017/node');
     
     //  await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test'); //if authentication 

     // await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@avi.j3vc0.mongodb.net/?appName=avi`);

     console.log("Database Connected Successfully");
}

main().catch(err => console.log(err));

export default mongoose;