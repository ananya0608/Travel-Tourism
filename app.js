const express=require('express');
const app=express();
const path=require('path');
const ejs =require('ejs');

const bodyPrser=require('body-parser');
require('./db/conn');
const userModel=require('./modals/user');
const bookModel=require('./modals/Booking');
const contactModel=require('./modals/contact');

const static_path=path.join(__dirname,'/views')
console.log(static_path);
app.use(express.static(static_path));
app.set('view engine','ejs');
app.use(bodyPrser.json());
app.use(bodyPrser.urlencoded({extended:true}));
let username="";
app.get('/',(req,res)=>{
  
    res.render('index',{username:username});
})

app.get('/Register',(req,res)=>{
    res.render('Register')
})
app.post('/contact',async(req,res)=>{
  const {Name,email,number,subject,message}=req.body;
  const newContact = new contactModel({
   Name,email,number,subject,message
 });
 await newContact.save() .then(() => {
       console.log('Contact information saved successfully:');
       res.send(`${Name} ,soon we will contact you..`);
     })
     .catch((error) => {
       console.error('Error creating user:', error.message);
       console.error('Error details:', error);
     });;
})
app.post('/login1',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user){
            res.send("invalid creddentials.")
        }
         const result=(password==user.password);
         if(result){
            console.log("user logged in.");
          //  document.getElementsByClassName('login-form-container')[0].innerHTML=user.firstName;
       
           username=user.firstName;
            res.render('index',{username:username});
         }
         else{
            res.send("wrong password.");
         }
         
    }
    catch(error){
        console.log(error);
    }
})
app.post('/submitForm',async(req,res)=>{
    const {firstName,lastName,email,password,phoneNumber}=req.body;
           const newUser = new userModel({
            firstName,lastName,email,password,phoneNumber
          });
          await newUser.save() .then((savedUser) => {
                console.log('User created successfully:', savedUser);
                res.send(`${firstName} ,congratulations you are registered.&#128512; `);
              })
              .catch((error) => {
                console.error('Error creating user:', error.message);
                console.error('Error details:', error);
              });;
      
           
         
   // res.render(<h1>`${name} ,congratulations you are registered.&#128512; ',</h1>);

})
app.post('/booking',async(req,res)=>{
    const {placeName,NumberOfPeople,ArrivalDate,leavingDate}=req.body;
    const newBook = new bookModel({
        placeName,NumberOfPeople,ArrivalDate,leavingDate
      });
      console.log(newBook);
      await newBook.save() .then((savedbook) => {
            console.log('User created successfully:', savedbook);
            res.send(`congratulations for successfully booking.&#128512; `);
          })
          .catch((error) => {
            console.error('Error creating user:', error.message);
            console.error('Error details:', error);
          });;
})
app.listen(8000,'localhost',()=>{
    console.log("server is listening......")
})
