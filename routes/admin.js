var express = require('express');
var router = express.Router();
var pool=require('./pool.js')

/* GET home page. */
router.get('/adminlogin', function(req, res, next) {
  res.render('adminlogin', { msg: '' });
});

router.post('/checkadminlogin', function(req, res, next) {
    pool.query('select * from admin where adminid=? and password=?',[req.body.adminid,req.body.password],function(error,result){
     if(error)
     {res.render('adminlogin',{msg:'Server Error'})}
     else{
        if(result.length==0)
        res.render('adminlogin', { msg: 'Invalid AdminId/Password' });
        else
        res.render('dashboard', { data:result[0] });
 

     }


    })
     });



module.exports = router;