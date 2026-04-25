import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'node';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to mongodb');

  const db = client.db(dbName);
  const collection = db.collection('suzuki');

  // the following code examples can be pasted here...

     // const findResult = await collection.find({type:"hatchback"}).toArray();
     // console.log('Found documents =>', findResult);

  return 'done.';
}

main()
  .then(i=>console.log(i))
  .catch(e=>console.error(e))
  .finally(() => client.close());