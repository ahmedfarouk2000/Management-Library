


var express = require('express');
var path = require('path');
var app = express();
const fs=require('fs') ;
const { parse } = require('path');
const { render } = require('ejs');
app.set('views', path.join(__dirname, '../MyApp'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
 res.render('index',{errormsg:""})
});  

app.post('/',function(req,res){
  var flag=false 
  for(i=0 ;users.length>i ;i++){
    if((req.body.username==users[i].user) && (req.body.password==users[i].password)){// so he's in my data base
    var temp =[]
    temp.push(req.body.username)
    fs.writeFileSync("readlist2.json",JSON.stringify(temp))
    
    res.redirect('/home')
    flag=true 
   break
  }
   }
   if(!flag ){// that means the username or passsord is incorrect
     res.render('index',{errormsg:"username or password is incorrect !!"})
   }
    
}) 

   



app.get('/registration',function(req,res){
  res.render('registration',{errormsg:""})
 }); 
 app.post('/registration',function(req,res){
  
  var flag= false 
   for(i=0 ;users.length>i ;i++){
     if(req.body.username==users[i].user){
       flag=true // the user has an account already
       break  
     }
   }
   if(!flag){ //that means the user is not previously regitered in and will create new user and pass
    // console.log(10)
 var temp ={user:(req.body.username) ,password:(req.body.password) }// now I have the obj
 users.push(temp)
 fs.writeFileSync("users.json",JSON.stringify(users)) ;  
 res.redirect('/')
}
else {// will send him a msg that the user name is already taken
//console.log(90) 
 res.render('registration',{errormsg:"This username is already taken!!"})
}
});   



  //will store the users in this array 
if((fs.readFileSync("users.json")).length==0) // now i can define the new array with length 0
var users =[]
else 
var users =JSON.parse(fs.readFileSync("users.json"))
 



 app.post('/register',function(req,res){
  
   var flag= false 
    for(i=0 ;users.length>i ;i++){
      if(req.body.username==users[i].user){
        flag=true // the user has an account already
        break  
      }
    }
    if(!flag){ //that means the user is not previously regitered in and will create new user and pass
  var temp ={user:(req.body.username) ,password:(req.body.password) }// now I have the obj
  users.push(temp)
  fs.writeFileSync("users.json",JSON.stringify(users)) ;  
  res.render('index',{errormsg:"You successfully registered !!"})
 }
 else {// will send him a msg that the user name is already taken
  res.render('registration',{errormsg:"This username is already taken!!"})
 }
 });  

app.get('/home',function(req,res){
  res.render('home')
 });  

//  if((fs.readFileSync("readlist.json")).length==0) // now i can define the new array with length 0
// var readlist =[]
 
//var readlist =JSON.parse(fs.readFileSync("readlist.json"))
if((fs.readFileSync("readlist.json")).length==0){ // now i can define the new array with length 0
var readlist =[] // will store here all the users with their wishlist
}
else 
var readlist =JSON.parse(fs.readFileSync("readlist.json"))
 


 app.get('/novel',function(req,res){
  res.render('novel')
 });  
 app.get('/poetry',function(req,res){
  res.render('poetry')
 });  
 app.get('/fiction',function(req,res){
  res.render('fiction')
 });  
 

 app.get('/flies',function(req,res){
  res.render('flies',{errormsg:''})
 });  

 app.post('/flies',function(req,res){ // read the last person added in readlist2 json to add new data base with its readlist
  // add only to the list if not already exist
  var flag=false // not found the acc before
  var index =0
  var userID=JSON.parse(fs.readFileSync("readlist2.json"))[0]
  for( i =0 ;readlist.length>i ;i++){
     if(readlist[i].name==userID){ // found the user and could have anybook other than leaves
     flag=true 
     index=i 
     break 
     }
  }
  if(!flag) {// first time adding a book so will create an object in readlist.json
  var temp ={name:userID ,readlist:["flies"] }// now I have the obj
  res.render('flies',{errormsg:"Book Successfully Added !!"})
  readlist.push(temp)
  fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;  
  }
  else{//already has an object in readlist.json ---check now if leaves is already with us
    //console.log(index)
    var fliesIshere=false 
    for(i =0 ;readlist[index].readlist.length>i;i++){
    if(readlist[index].readlist[i]=="flies"){
      fliesIshere=true 
      break 
    }
    }
    if(!fliesIshere){ //first time to add this book in my user 
    readlist[index].readlist.push("flies")
    fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;
    res.render('flies',{errormsg:"Book Successfully Added !!"})
  }
  else {// already has this book in my list so i will display an error msg
     res.render('flies',{errormsg:"This book is already in your Reading list !!"})
  }
}
 });  

 app.get('/grapes',function(req,res){
  res.render('grapes',{errormsg:''})
 });  

 app.post('/grapes',function(req,res){ // read the last person added in readlist2 json to add new data base with its readlist
  // add only to the list if not already exist
  var flag=false // not found the acc before
  var index =0
  var userID=JSON.parse(fs.readFileSync("readlist2.json"))[0]
  for( i =0 ;readlist.length>i ;i++){
     if(readlist[i].name==userID){ // found the user and could have anybook other than leaves
     flag=true 
     index=i 
     break 
     }
  }
  if(!flag) {// first time adding a book so will create an object in readlist.json
  var temp ={name:userID ,readlist:["grapes"] }// now I have the obj
  res.render('grapes',{errormsg:"Book Successfully Added !!"})
  readlist.push(temp)
  fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;  
  }
  else{//already has an object in readlist.json ---check now if leaves is already with us
    //console.log(index)
    var grapesIshere=false 
    for(i =0 ;readlist[index].readlist.length>i;i++){
    if(readlist[index].readlist[i]=="grapes"){
      grapesIshere=true 
      break 
    }
    }
    if(!grapesIshere){ //first time to add this book in my user 
    readlist[index].readlist.push("grapes")
    fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;
    res.render('grapes',{errormsg:"Book Successfully Added !!"})
  } // no else since i wont add it again
  else {
    res.render('grapes',{errormsg:"This book is already in your Reading list !!"})
  }
}
 });  

 app.get('/leaves',function(req,res){
  res.render('leaves',{errormsg:''})
 });  

 app.post('/leaves',function(req,res){ // read the last person added in readlist2 json to add new data base with its readlist
  // add only to the list if not already exist
  var flag=false // not found the acc before
  var index =0
  var userID=JSON.parse(fs.readFileSync("readlist2.json"))[0]
  for( i =0 ;readlist.length>i ;i++){
     if(readlist[i].name==userID){ // found the user and could have anybook other than leaves
     flag=true 
     index=i 
     break 
     }
  }
  if(!flag) {// first time adding a book so will create an object in readlist.json
  var temp ={name:userID ,readlist:["leaves"] }// now I have the obj
  res.render('leaves',{errormsg:"Book Successfully Added !!"})
  readlist.push(temp)
  fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;  
  }
  else{//already has an object in readlist.json ---check now if leaves is already with us
    //console.log(index)
    var leavesIshere=false 
    for(i =0 ;readlist[index].readlist.length>i;i++){
    if(readlist[index].readlist[i]=="leaves"){
      leavesIshere=true 
      break 
    }
    }
    if(!leavesIshere){ //first time to add this book in my user 
    readlist[index].readlist.push("leaves")
    fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;
    res.render('leaves',{errormsg:"Book Successfully Added !!"})
  } // no else since i wont add it again
  else {
    res.render('leaves',{errormsg:"This book is already in your Reading list !!"})
  }
}
 });  
 app.get('/sun',function(req,res){
  res.render('sun',{errormsg:''})
 });  

 app.post('/sun',function(req,res){ // read the last person added in readlist2 json to add new data base with its readlist
  // add only to the list if not already exist
  var flag=false // not found the acc before
  var index =0
  var userID=JSON.parse(fs.readFileSync("readlist2.json"))[0]
  for( i =0 ;readlist.length>i ;i++){
     if(readlist[i].name==userID){ // found the user and could have anybook other than leaves
     flag=true 
     index=i 
     break 
     }
  }
  if(!flag) {// first time adding a book so will create an object in readlist.json
  var temp ={name:userID ,readlist:["sun"] }// now I have the obj
  res.render('sun',{errormsg:"Book Successfully Added !!"})
  readlist.push(temp)
  fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;  
  }
  else{//already has an object in readlist.json ---check now if leaves is already with us
    //console.log(index)
    var sunIshere=false 
    for(i =0 ;readlist[index].readlist.length>i;i++){
    if(readlist[index].readlist[i]=="sun"){
      sunIshere=true 
      break 
    }
    }
    if(!sunIshere){ //first time to add this book in my user 
    readlist[index].readlist.push("sun")
    fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;
    res.render('sun',{errormsg:"Book Successfully Added !!"})
  } // no else since i wont add it again
  else {
    res.render('sun',{errormsg:"This book is already in your Reading list !!"})
  }
  
}
 });  


 app.get('/dune',function(req,res){
  res.render('dune',{errormsg:''})
 });  
 app.post('/dune',function(req,res){ // read the last person added in readlist2 json to add new data base with its readlist
  // add only to the list if not already exist
  var flag=false // not found the acc before
  var index =0
  var userID=JSON.parse(fs.readFileSync("readlist2.json"))[0]
  for( i =0 ;readlist.length>i ;i++){
     if(readlist[i].name==userID){ // found the user and could have anybook other than leaves
     flag=true 
     index=i 
     break 
     }
  }
  if(!flag) {// first time adding a book so will create an object in readlist.json
  var temp ={name:userID ,readlist:["dune"] }// now I have the obj
  res.render('dune',{errormsg:"Book Successfully Added !!"})
  readlist.push(temp)
  fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;  
  }
  else{//already has an object in readlist.json ---check now if leaves is already with us
    //console.log(index)
    var dunesIshere=false 
    for(i =0 ;readlist[index].readlist.length>i;i++){
    if(readlist[index].readlist[i]=="dune"){
      dunesIshere=true 
      break 
    }
    }
    if(!dunesIshere){ //first time to add this book in my user 
    readlist[index].readlist.push("dune")
    fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;
    res.render('dune',{errormsg:"Book Successfully Added !!"})
  } // no else since i wont add it again
  else {
    res.render('dune',{errormsg:"This book is already in your Reading list !!"})
  }
}
 });  
 app.get('/mockingbird',function(req,res){
  res.render('mockingbird',{errormsg:''})
 });  

 app.post('/mockingbird',function(req,res){ // read the last person added in readlist2 json to add new data base with its readlist
  // add only to the list if not already exist
  var flag=false // not found the acc before
  var index =0
  var userID=JSON.parse(fs.readFileSync("readlist2.json"))[0]
  for( i =0 ;readlist.length>i ;i++){
     if(readlist[i].name==userID){ // found the user and could have anybook other than leaves
     flag=true 
     index=i 
     break 
     }
  }
  if(!flag) {// first time adding a book so will create an object in readlist.json
  var temp ={name:userID ,readlist:["mockingbird"] }// now I have the obj
  res.render('mockingbird',{errormsg:"Book Successfully Added !!"})
  readlist.push(temp)
  fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;  
  }
  else{//already has an object in readlist.json ---check now if leaves is already with us
    //console.log(index)
    var mockingbirdIshere=false 
    for(i =0 ;readlist[index].readlist.length>i;i++){
    if(readlist[index].readlist[i]=="mockingbird"){
      mockingbirdIshere=true 
      break 
    }
    }
    if(!mockingbirdIshere){ //first time to add this book in my user 
    readlist[index].readlist.push("mockingbird")
    fs.writeFileSync("readlist.json",JSON.stringify(readlist)) ;
    res.render('mockingbird',{errormsg:"Book Successfully Added !!"})
  } // no else since i wont add it again
  else {
    res.render('mockingbird',{errormsg:"This book is already in your Reading list !!"})
  }
}
 });  

 app.get('/readlist',function(req,res){
  
  var userID=JSON.parse(fs.readFileSync("readlist2.json"))[0]
  var flag=false 
  for( i =0 ;readlist.length>i ;i++){
    
    if(readlist[i].name==userID){ // found the user and could have anybook other than leaves
      flag=true // has at least 1 book 
      index=i 
    break 
    }
 }
 if(flag)
  res.render('readlist',{read:[readlist[index].readlist]})
  else 
  res.render('readlist',{read:""})
 });  

 app.post('/search',function(req,res){
   var str=req.body.Search.trim() //the String i want to search for(must be uppercase Search)
   var sresult=[]
   var base0="The Sun and Her Flowers" //longest String in my books 23
   var flag0=false   //to not repeat any result more than once 
   var base1="To Kill a Mockingbird" //21
   var flag1=false 
   var base2="The Grapes of Wrath"; //15
   var flag2=false 
   var base3="Leaves of Grass" //15
   var flag3=false 
   var base4="Lord of the Flies" //13
   var flag4=false 
   var base5="Dune" //shortest 4
   var flag5=false 
  // console.log("ahmed".substring(10,11))
  if(str.length!=0) //dont print all results if the search box is empty
  for(i=0 ;base0.length-str.length+1>i;i++){
   if(str.localeCompare(base0.substring(i,str.length+i))==0  && flag0==false){
    flag0=true
    sresult.push("sun")
    //console.log(base0)
   }
     
   if(str.localeCompare(base1.substring(i,str.length+i))==0 && flag1==false ){
     flag1=true
     sresult.push("mockingbird")
    // console.log(base1)
   }
    
     if(str.localeCompare(base2.substring(i,str.length+i))==0  && flag2==false){
      flag2=true 
      sresult.push("grapes")
     //console.log(base2)
     }
     if(str.localeCompare(base3.substring(i,str.length+i))==0 && flag3==false ){
      flag3=true
      sresult.push("leaves")
     //console.log(base3)
     }
     if(str.localeCompare(base4.substring(i,str.length+i))==0  &&flag4==false){
      flag4=true
      sresult.push("flies")
      //console.log(base4)
     }
    
     if(str.localeCompare(base5.substring(i,str.length+i))==0 &&flag5==false ){
      flag5=true
      sresult.push("dune")
     //console.log(base5)
     }
  }
  if(sresult.length!=0) // there is atleast one result
   res.render('searchresults',{read:sresult , wrongmsg:""}) // will send all of the result
  else // no result so i will send him the word he wrote wrong
  res.render('searchresults',{read:sresult , wrongmsg:str}) 
 });

 app.get('/searchresults',function(req,res){
  res.render('searchresults')
   });

  


   

 


 
   if(process.env.PORT){
    app.listen(process.env.PORT,function(){console.log('Server started')}); 
   } 
   else { 
   app.listen(3000,function() {console.log('Server started on port 3000')}); 
   } 
  //var x2=JSON.stringify(x1)  // turn the obejct into big String 
  // var x10=JSON.stringify(x3)  // turn the obejct into big String
  //fs.writeFileSync("users.json",x2)// will write it only once 
  // fs.writeFileSync("users.json",x10)// will write it only once 
  // // var x5=JSON.stringify(x3)  // turn the obejct into big String 
  // // fs.writeFileSync("users.json",x5)// will write it only once 

  
  
  
  // var z=JSON.parse(fs.readFileSync("users.json"))
  // console.log(z)
  //var temp ={user:"ahmead" ,password:1232 }// now I have the obj
  //fs.writeFileSync("users.json",JSON.stringify(temp)) ;
 // fs.appendFileSync("users.json",JSON.stringify(temp)) ;
  //var z=JSON.parse(fs.readFileSync("users.json"))
  //console.log(z)

  // var temp ={user:("ahned") ,password:("123") }
  // var temp2 =[] 
  // temp2[0]=temp 
  // console.log(temp2[0].user)
 



 


 
 