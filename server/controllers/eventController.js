const mysql=require('mysql')
const qr= require('qrcode')
const bp=require('body-parser')
const express =require('express')
const app =express()
//connection pool
const pool=mysql.createPool({
    host      : process.env.DB_HOST,
    user      :process.env.DB_USER,
    password  :process.env.DB_PASS,
    database  :process.env.DB_NAME
})
//connect to db
pool.getConnection((err,connection)=>{
    if(err) throw err;//could not connect
    console.log('Connected as ID'+connection.threadId);

})

//view events
exports.view=(req,res)=>{

pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('connected as ID'+ connection.threadID);

    //all event
    connection.query('SELECT * FROM event',(err,rows)=>{
      //when done release 
      connection.release();
      if(!err){

        
        res.render('home',{rows})
      }else{
        console.log("there is an error with the mysql");
      }

      console.log(`The data from event Table:\n`,rows);
    })
})

};
// find event by search
exports.find=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as ID'+ connection.threadID);
    
    let searchEvent=req.body.search;

        connection.query('SELECT * FROM event WHERE event_name LIKE ? OR id LIKE ?',['%'+searchEvent+'%','%'+searchEvent+'%'],(err,rows)=>{
          //when done release 
          connection.release();
          if(!err){
            res.render('home',{rows})
          }else{
            console.log("there is an error with the mysql");
          }
    
          console.log(`The data from event Table:\n`,rows);
        })


    })

   




}

exports.form=(req,res)=>{
    res.render('add-event')
}


// adding a new event
exports.create=(req,res)=>{
 const {event_name,date,description}= req.body

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as ID'+ connection.threadID);
    
    let searchEvent=req.body.search;

        connection.query('INSERT INTO event SET event_name =?,date=?,description=?',[event_name, date,description],(err,rows)=>{
          //when done release 
          connection.release();
          if(!err){
            res.render('add-event',{alert:'Event added successfully!'})
          }else{
            console.log(err);
          }
    
          console.log(`The data from event Table:\n`,rows);
        })


    })


}

//edit event


exports.edit=(req,res)=>{

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as ID'+ connection.threadID);
    
        //all event

        connection.query('SELECT * FROM event WHERE id=?',[req.params.id],(err,rows)=>{
          //when done release 
          connection.release();
          if(!err){
            res.render('edit-event',{rows})
          }else{
            console.log("there is an error with the mysql");
          }
    
          console.log(`The data from event Table:\n`,rows);
        })
    })


}



//update event

exports.update=(req,res)=>{
    const {event_name,date,description}= req.body



    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as ID'+ connection.threadID);
    
        //all event

        connection.query('UPDATE event SET event_name=?,date=?,description=? WHERE id=?',[event_name,date,description,req.params.id],(err,rows)=>{
          //when done release 
          connection.release();
          if(!err){
           




            pool.getConnection((err,connection)=>{
                if(err) throw err;
                console.log('connected as ID'+ connection.threadID);
            
                //all event
        
                connection.query('SELECT * FROM event WHERE id=?',[req.params.id],(err,rows)=>{
                  //when done release 
                  connection.release();
                  if(!err){
                    res.render('edit-event',{rows, alert:`${event_name} has been Updated` })
                  }else{
                    console.log("there is an error with the mysql");
                  }
            
                  console.log(`The data from event Table:\n`,rows);
                })
            })





          }else{
            console.log("there is an error with the mysql");
          }
    
          console.log(`The data from event Table:\n`,rows);
        })
    })


}


//edit event


exports.delete=(req,res)=>{

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as ID'+ connection.threadID);
    
        //all event

        connection.query('DELETE  FROM event WHERE id=?',[req.params.id],(err,rows)=>{
          //when done release 
          connection.release();
          if(!err){

            
          res.redirect('/');
          }else{
            console.log("there is an error with the mysql");
          }
    
          console.log(`The data from event Table:\n`,rows);
        })
    })


}

//share events

// exports.share=(req,res)=>{

//   pool.getConnection((err,connection)=>{
//       if(err) throw err;
//       console.log('connected as ID'+ connection.threadID);
  
      
//       connection.query('SELECT * FROM event WHERE id=?',[req.params.id],(err,rows)=>{
//         //when done release 
//         connection.release();
//         if(!err){
//           res.render('share-event')
//         }else{
//           console.log("there is an error with the mysql");
//         }
  
//         console.log(`The data from event Table:\n`,rows);
//       })
//   })


// }

//share events 2(alt)


