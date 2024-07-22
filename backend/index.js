const port = 4000; // PORT DEFINITION 
import express from "express";
const app = express();//creating the app
import mongoose from "mongoose";//mongoose library initialization to use mongodb
import jwt from 'jsonwebtoken'; // to generate and verify token
import multer from "multer"; // for creating the image storage system
import path from "path";//to get access to our backend directory in our express app
import cors from "cors"; //to provide access to react project
import { fileURLToPath } from 'url';
app.use(express.json()); //whatever request we get, it would automatically be passed through json
app.use(cors()) 
//reactjs project will connect to express app on port 4000
//helps connect the frontend to the backend

const __filename = fileURLToPath(import.meta.url); // Getting the current file path
const __dirname = path.dirname(__filename); // Getting the directory name
app.use(express.static(path.join(__dirname, '..', 'admin', 'dist')));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'admin', 'dist', 'index.html'));
  });

//Database Connection With MONGODB
mongoose.connect("mongodb+srv://aradhya:passwordecom11@cluster0.sx6s1ue.mongodb.net/ecommerce");


//API creation

app.get("/", (req,res)=>{
   res.send("Express app is running")
})
//multiple endpoints on the same api can be created

//Image storage engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      return  cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});//configuring disk storage, Configures how and where files should be stored on the disk when they are uploaded.

const upload = multer({ storage: storage });//creating instance of multer


//creating upload endpoint for images

app.use('/images', express.static('upload/images'));//static endpoint --> used to access the images in /images
//this endpoint is to upload any image, You set up Express to serve files from the upload/images directory
// when requested via the /images route.

app.post("/upload", upload.single('product'), (req, res) => {//Defines a route in your Express 
    //app where clients can send files to be uploaded.
    res.json({
        success: 1, 
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
}); //post will upload the image using this endpoint at the sametime , our middleware i.e. multer disk storage will
//rename the file and save it in the images folder, in request we will get the name of the uploaded file using 
// this name, we will generate one response, using which the user can access that image in json form.
//.diskStorage is about defining how files are stored, while the file upload endpoint is 
//about handling the HTTP request to upload files and returning an appropriate response.




//Schema for creating products

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now, //take from the system's current date
    },
    available:{
        type:Boolean,
        default:true,
    },
});

app.post('/addproduct', async (req,res) => {
    let products = await Product.find({}); //getting all products in one array which can be accessed using products array
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1); //get the last(latest product)
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id=1;
    }
        const product = new Product({
            id:id,
            name:req.body.name, // these reqs will be sent using thunder client
            image:req.body.image,
            category:req.body.category,
            new_price: req.body.new_price,
            old_price:req.body.old_price,
        });
        console.log(product);
        await product.save(); //will save the product in mongodb
        console.log("saved")
        res.json({
            success:true,
            name: req.body.name,
        })
});

//Creating API for deleting products
app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        name: req.body.name,
    })
});


//Creating API for getting all products
app.get('/allproducts', async (req,res) => {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})


// Schema for user model 

const Users = mongoose.model('Users', {
    name :{
        type : String,
    },
    email :{
        type : String, 
        unique : true,
    },
    password:{
        type: String,
    },
    cartData:{
        type : Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// Creating endpoint for registering the user

app.post('/signup', async (req,res) => {
    
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({
            success:false,
            error:"an account already exists with this email"
        })
    }
    let cart = {};
    for(let i = 0; i < 300; i++){
        cart[i] = 0; 
    } //empty cart object with keys from 1 to 300

    const user = new Users({
        name: req.body.username, 
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save(); // user has been created and saved in the database using the save method

    const data = {
        user : {
            id : user.id //used for creating token
        }
    }

    const token = jwt.sign(data, 'secret_ecom');  //token creation = JSON webtoken
    // secret_ecom here is called salt which is used for encrypting data/token by one layer
    res.json({
        success:true, //successful creation of account
        token
    })

})

// creating endpoint for user login
app.post('/login', async (req,res)=>{
    let user = await Users.findOne({email: req.body.email});
    if(user){
        const passCompare = req.body.password === user.password
        if(passCompare){
            const data = {
                user:{
                    id: user.id //user object
                }
            }
            const token = jwt.sign(data, 'secret_ecom') //token generation
            res.json({success:true, token})
        }
        else{
            res.json({
                success: false,
                error:"wrong password"
            })
        }
    }
    else{
        res.json({success:false,error:"wrong email"})
    }

})


//creating api for new collection data

app.get('/newcollections', async (req,res)=>{
 let products = await Product.find({});
 let newcollection = products.slice(1).slice(-8);//recently added 8 products
 console.log('New collections added');
 res.send(newcollection);
})

app.get('/popularinwomen', async(req,res)=>{
    let popular = await Product.find({category:"women"});
    let popular_in_women = popular.slice(0,4);
    res.send(popular_in_women);
})

//creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error:"Please authenticate using valid token"})
}
else{
    try{
        const data = jwt.verify(token,'secret_ecom'); //decoding token
        req.user = data.user; //passing the data of the user like userid in the body of our request
        next();
    }
    catch (error){
            res.status(401).send({error:"Please authenticate using a valid token"})
    }
}
}

//creating api to store the cartdata in database
app.post('/addtocart', fetchUser, async (req,res)=>{//req here would include the user info fetched in middleware fetchUser
    console.log("added", req.body.itemId)
let userData = await Users.findOne({_id:req.user.id});
userData.cartData[req.body.itemId]+=1;
await Users.findOneAndUpdate({_id:req.user.id}, {cartData: userData.cartData})
res.send("Added")
})


//creating endpoint to remove product from cartdata

app.post("/removefromcart", fetchUser, async(req,res)=>{
    console.log("removed", req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id}); 
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed")
})

//creating endpoint to get cart data

app.post('/getcart',fetchUser, async(req,res)=>{
    console.log("Getcart")
let userData = await Users.findOne({_id:req.user.id}) //the id we'll get through middleware which will fetch user info from token
res.json(userData?.cartData);
})

        
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'admin', 'dist', 'index.html'));
});


app.listen(port, (error)=> {
if(!error){
    console.log("Server running on port " +port);
}
else{
    console.log("Error : " +error);
}
})
