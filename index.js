const express=require("express")
const app=express()
const cors=require("cors")
const nodemailer = require("nodemailer");
const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://joseph:123@cluster0.dcbavsw.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  console.log("Database is connected Sucessfully...")
})
.catch(()=>{
  console.log("Database is not connected...")
})
app.use(cors())

app.use(express.json())

//Create Model
const credential=mongoose.model('credential',({
      user:String,
      pass:String
}),"bulkmail")



  app.post('/sendemail',(req,res)=>{
    var msg=req.body.msg
    var emaillist=req.body.emaillist
    credential.find()     
.then((data)=>{
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: data[0].toJSON().user,
      pass: data[0].toJSON().pass,
    },
  });
  new Promise(async(resolve,reject)=>{      //ASYNC - AWAIT
    try{                                    //TRY-CATCH BLOCK
      for(var i=0;i<emaillist.length;i++){
       await transporter.sendMail({
          from: "josesamimmanuel@gmail.com", // sender address
          to: emaillist[i], // list of receivers
          subject: "Hello ✔", // Subject line
          text: msg // plain text body
        },
          )
          console.log("Email sent to"+emaillist[i])
      }
      resolve("Sucess")
    }
    catch(error){
      console.log("Error")
      reject("Failed")
    }
  })
  .then(()=>{
    res.send(true)
  })
  .catch(()=>{
    res.send(false)
  })
})
.catch(()=>{
  console.log("Cannot Retrive")
})



  })

    app.listen(5000,()=>{
        console.log("Server Started...")
    })

