var express = require('express');
var router = express.Router();
var pool = require('./pool.js')
var upload=require('./multer.js')
/* GET home page. */
router.get('/supplierinterface', function(req, res, next) {
  res.render('supplier',{msg:''});
});
      
router.get('/displayall', function(req, res, next) {
  pool.query('select G.*,(select ST.stype from statetype ST where ST.sid=G.sstate)as statename ,(select CT.stypename from listofcities CT where CT.stypeid=G.scity)as cityname from good G' ,function(error,result){
  if(error)
  { console.log(error)
     res.render('displayall',{data:'Server Error'})}
  else
  {  res.render('displayall',{data:result})}
})
});

router.get('/displaybyid', function(req, res, next) {
  pool.query('select G.*,(select ST.stype from statetype ST where ST.sid=G.sstate)as statename ,(select CT.stypename from listofcities CT where CT.stypeid=G.scity)as cityname from good G where G.sid=?',[req.query.pid],function(error,result){
 if(error)
 { console.log(error)
  res.render({data:'Server Error'})
}
 else
 { if(result.length==0)

   res.render({data:'Record Not Found'})
  else
  //return res.status(200).json(result)
  res.render('displaybyid',{data:result[0]})
  
  }
  })
 });


 router.get('/suppliereditdelete', function(req, res, next) {
  if(req.query.btn=='Edit')
  {
  pool.query('update good set sname=?,sstate=?,scity=?,smobile=?,saddress=?,sgender=? where sid=?',[req.query.sname,req.query.sstate,req.query.scity,req.query.smobile,req.query.saddress,req.query.sgender,req.query.sid],function(error,result){

/* pool.query('insert into good (sname,sgender,sdob,saddress,sstate,scity,smobile,spicture) values(?,?,?,?,?,?,?,?)',
  [req.body.sname,req.body.sgender,req.body.sdob,req.body.saddress,req.body.sstate,req.body.scity,
  req.body.smobile,req.file.originalname],function(error,result){ */
  
   if(error)
 { console.log(error)
  return res.redirect('/services/displayall')}
 else
 { return res.redirect('/services/displayall')}
  })
  }
  else
  {  
   pool.query('delete from  good  where sid=?',[req.query.sid],function(error,result){
  
     if(error)
   { console.log(error)
    return res.redirect('/services/displayall')}
   else
   { return res.redirect('/services/displayall')}
    })
   
  }
 
 }); 
 
 router.post('/editpicture',upload.single('spicture'), function(req, res, next) {
   console.log(req.body)
   console.log(req.file)
  pool.query('update good set spicture=? where sid=?',[req.file.originalname,req.body.sid],function(error,result){
  
   if(error)
   { console.log(error)
    return res.redirect('/services/displayall')}
   else
   { return res.redirect('/services/displayall')}
    })
   })
 


 
router.post('/suppliedproducts',upload.single('spicture'),function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  
  pool.query('insert into good (sname,sgender,sdob,saddress,sstate,scity,smobile,spicture) values(?,?,?,?,?,?,?,?)',
  [req.body.sname,req.body.sgender,req.body.sdob,req.body.saddress,req.body.sstate,req.body.scity,
  req.body.smobile,req.file.originalname],function(error,result){
    
    if(error)
   { console.log(error)
    res.render('supplier',{msg:"Fail to submit"}); }
  else
  { res.render('supplier',{msg:"Record submitted"}); }
  
   })

  });

  router.get('/fetchstatetype',function(req,res,next){
    pool.query('select * from statetype',function(error,result){
      if(error)
      { console.log(error)
         return res.status(500).json([])
      }
      else
      {  return res.status(200).json(result) }
    })
  });
  
  router.get('/fetchcitytype',function(req,res,next){
    pool.query('select * from listofcities where typeid=?',[req.query.stateid],function(error,result){
      if(error)
      {  console.log(error)
         return res.status(500).json([])
      }
      else
      {  return res.status(200).json(result) }
    })
  });


module.exports = router;
