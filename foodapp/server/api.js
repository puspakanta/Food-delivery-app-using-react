var express=require("express");
var mongoClient=require("mongodb").MongoClient;
var cors=require("cors");
 
var app=express();
app.use(cors());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());
var bcrypt=require("bcryptjs");

var constr="mongodb://127.0.0.1:27017";
app.get("/fooditems", (req, res) => {
    mongoClient.connect(constr)
      .then(clientObject => {
        const database = clientObject.db("gofood");
        return Promise.all([ // Use Promise.all to handle both queries concurrently
          database.collection("food_items").find({}).toArray(),
          database.collection("foodCategory").find({}).toArray()
        ]);
      })
      .then(data => {
        const [foodItems, foodCategories] = data; // Destructure the results
        res.send([foodItems, foodCategories]); // Send both arrays in one response
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data"); // Handle errors gracefully
      });
  });
  
// app.get("/foodcategory",(req,res)=>{
//     mongoClient.connect(constr).then(clientObject=>{
//         var database=clientObject.db("gofood");
//         database.collection("foodCategory").find({}).toArray().then(document=>{
//             res.send(document);
//             res.end();
//         })
//     })
// });

app.post("/createuser", async (req, res) => {
    try {
        const clientObject = await mongoClient.connect(constr);
        const database = clientObject.db("gofood");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: hashedPassword,
            date: new Date(req.body.date)
        };
        await database.collection("users").insertOne(user);
        console.log("User Registered...");
        res.end();
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

app.get("/loginuser",(req,res)=>{
    mongoClient.connect(constr).then(clientObject=>{
        var database=clientObject.db("gofood");
        database.collection("users").find({}).toArray().then(document=>{
            res.send(document);
            res.end();
        })
    })
});

const { MongoClient } = require('mongodb');

app.post('/orderData', async (req, res) => {
  try {
      // Create a MongoClient instance and connect to the MongoDB server
      const client = new MongoClient(constr);
      await client.connect();

      // Get the database instance
      const database = client.db('gofood');

      // Check if req.body.order_data exists and is an array
      if (!Array.isArray(req.body.order_data)) {
          throw new Error("Invalid or missing 'order_data' property in request body");
      }

      // Extract order_data from request body
      let data = req.body.order_data;

      // Add Order_date field at the beginning of the array
      data.unshift({ Order_date: req.body.order_date });


      // Check if there is an order with the provided email in the database
      let eId = await database.collection("orders").findOne({ 'email': req.body.email });

      // If email doesn't exist in the database, create a new order
      if (eId === null) {
          // Create a new order document with email and order_data
          await database.collection("orders").insertOne({
              email: req.body.email,
              order_data: [data]
          });
          // Send success response
          res.json({ success: true });
      } else {
          // Push new order data into the existing order_data array
          await database.collection("orders").findOneAndUpdate(
              { email: req.body.email },
              { $push: { order_data: data } }
          );
          // Send success response
          res.json({ success: true });
      }

      // Close the MongoDB connection
      client.close();
  } catch (error) {
      // Log and send server error in case of failure
      console.log("Error handling order:", error.message);
      res.status(500).send("Error handling order: " + error.message);
  }
});
app.post("/myorderData",(req,res)=>{
    mongoClient.connect(constr).then(clientObject=>{
        var database=clientObject.db("gofood");
        database.collection("orders").findOne({"email":req.body.email}).then(document=>{
            res.send(document);
            res.end();
        })
    })
});

app.listen(5000);
console.log("server started");