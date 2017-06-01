'use strict';
var mongoose = require('mongoose');
//var access  = require('./access');
var redisClient = require('redis').createClient;
//var redis = redisClient(6379, 'localhost');
var config = require('./config');
var jwt = require('express-jwt');
var auth  = jwt({ secret : config.secret , userProperty: 'payload'});
var passport = require('./passport');
//var cache = require('express-redis-cache')();
//var cache = require('express-redis-cache')({ prefix: 'llabsApp' });
var user    = require('./server/service/user'); 
var strength    = require('./server/service/strengths');
var weak    = require('./server/service/weak');
var opport  = require('./server/service/opport');
var threat  = require('./server/service/threat');
var biz     = require('./server/service/biz');
var objs    = require('./server/service/objs');
var strategy    = require('./server/service/strategy'); 
var target    = require('./server/service/target');
var org    = require('./server/service/org'); 
var bens    = require('./server/service/bens'); 
var cust    = require('./server/service/cust');
var compe    = require('./server/service/compe');
var caps    = require('./server/service/caps');
var procs    = require('./server/service/procs');
var poly    = require('./server/service/poly');
var inno    = require('./server/service/inno');
var task    = require('./server/service/tasks');
var rpt    = require('./server/service/report');
var avatar    = require('./server/service/avatar');
var story    = require('./server/service/story');

module.exports = function(app , passport)
{

    app.delete('/strength/:id'  , auth ,  strength.remove);
    app.post('/strength'  , auth , strength.create);
    app.put('/strength' , auth ,strength.update);
    app.get('/strength' , auth , strength.read);

    app.delete('/opport/:id'  , auth ,  opport.remove);
    app.post('/opport'  , auth , opport.create);
    app.put('/opport' , auth , opport.update);
    app.get('/opport' , auth , opport.read);

    app.delete('/threat/:id'  , auth ,  threat.remove);
    app.post('/threat'  , auth ,threat.create);
    app.put('/threat' , auth , threat.update);
    app.get('/threat' , auth , threat.read);

    app.delete('/caps/:id'  , auth ,  caps.remove);
    app.post('/caps'  , auth , caps.create);
    app.put('/caps' , auth ,caps.update);
    app.get('/caps' , auth ,caps.read);

    app.delete('/weak/:id'  , auth ,  weak.remove);
    app.post('/weak'  , auth , weak.create);
    app.put('/weak' , auth ,weak.update);
    app.get('/weak' , auth ,weak.read);

    app.delete('/task/:id'  , auth , task.remove);
    app.post('/task'  , auth , task.create);
    app.put('/task' , auth , task.update);
    app.put('/task/done/' , auth , task.done);
    app.get('/task' , auth , task.read);

    app.delete('/story/:id'  , auth , story.remove);
    app.post('/story'  , auth ,story.create);
    app.get('/story'  , auth ,story.read);
    app.put('/story' , auth ,story.update);

    app.get('/biz' , auth , biz.read);

    app.delete('/objs/:id' , auth ,  objs.remove);
    app.post('/objs' ,  auth,  objs.create);
    app.put('/objs' , auth , objs.update);
    app.get('/objs' ,auth ,  objs.read);
    app.get('/objs/:id' , auth ,  objs.single);

    app.delete('/bens/:id' , auth ,  bens.remove);
    app.post('/bens' , auth ,  bens.create);
    app.put('/bens' , auth , bens.update);
    app.get('/bens' , auth ,  bens.read);
    app.get('/bens/:id' , auth ,  bens.single);

    app.delete('/avatar/:id' , auth ,  avatar.remove);
    app.post('/avatar'       , auth ,  avatar.create);
    app.put('/avatar'        , auth ,  avatar.update);
    app.get('/avatar'        , auth , avatar.read);
    app.get('/avatar/:id'    , auth , avatar.single);

    app.delete('/report/:id' , auth ,  rpt.remove);
    app.post('/report'       , auth , rpt.create);
    app.put('/report'        , auth , rpt.update);
    app.get('/report'        , auth , rpt.read);
    app.get('/report/owner/:id' , auth , rpt.latest);
    app.get('/report/prog/:id'  , auth , rpt.prog);
    app.get('/report/:id'       , auth , rpt.single);
    app.get('/report/targ/:id'  , auth , rpt.owner);

    app.delete('/compe/:id' , auth ,  compe.remove);
    app.post('/compe'       , auth ,  compe.create);
    app.put('/compe/del/str', auth ,  compe.rem_str);
    app.put('/compe/del/weak', auth ,  compe.rem_weak);
    app.put('/compe' , auth ,  compe.update);
    app.put('/compe/strength' , auth , compe.strength);
    app.put('/compe/weak' , auth ,  compe.weak);
    app.get('/compe' , auth ,  compe.read);
    app.get('/compe/:id' , auth ,  compe.single);

    app.delete('/cust/:id' , auth ,  cust.remove);
    app.put('/cust/ben' , auth ,  cust.single_remove);
    app.post('/cust' , auth , cust.create);
    app.put('/cust' , auth , cust.update);
    app.get('/cust' , auth ,  cust.read);
    app.get('/cust/:id' , auth ,  cust.single);

    app.delete('/inno/:id' , auth ,  inno.remove);
    app.put('/inno/ben' , auth ,  inno.single_remove);
    app.post('/inno' ,  auth ,  inno.create);
    app.put('/inno/eval' , auth ,  inno.eval);
    app.put('/inno' , auth ,  inno.update);
    app.get('/inno' , auth ,  inno.read);
    app.get('/inno/:id' ,auth ,  inno.single);

    app.delete('/procs/:id' , auth ,  procs.remove);
    app.put('/procs/rem' , auth ,  procs.single_remove);
    app.post('/procs' , auth ,  procs.create);
    app.put('/procs' , auth , procs.update);
    app.get('/procs' , auth ,  procs.read);


    app.delete('/poly/:id' , auth , poly.remove);
    app.put('/poly/rem' , auth , poly.rem);
    app.put('/poly/pols' , auth ,  poly.pols);
    app.post('/poly' , auth , poly.create);
    //app.put('/poly' ,  poly.update);
    app.get('/poly' , auth ,  poly.read);
    //app.get('/procs/:id' ,  procs.single);

    app.delete('/strategy/:id' , auth ,  strategy.remove);
    app.post('/strategy' , auth ,  strategy.create);
    app.put('/strategy', auth , strategy.update);
    app.get('/strategy',  auth , strategy.read);
    app.get('/strategies', auth , strategy.all);
    app.get('/strategy/single/:id',auth ,  strategy.single);

    app.delete('/target/:id' , auth ,  target.remove);
    app.post('/target'  , auth , target.create);
    app.put('/target', auth , target.update);
    app.put('/target/pery', auth , target.pery);
    app.put('/target/pery/del', auth, target.pery_del);
    app.get('/target' , auth , target.read);
    app.get('/target/:id' , auth , target.single);
    app.get('/targets/:id' ,  auth, target.multiple);
    app.get('/targets/strategy/:id' , auth,  target.strats);

    app.delete('/org/:id'  , auth ,  org.remove);
    app.put('/org/rem/'  , auth , org.rem);
    app.put('/org/remk/'  , auth,  org.remk);
    app.post('/org'  , auth , org.create);
    app.put('/org' , auth , org.update);
    app.put('/org/resp' , auth , org.add_r);
    app.put('/org/kpis' , auth , org.add_kpis);
    app.get('/org' , auth , org.read);



    app.post('/session/create' ,  user.create);
    app.post('/session/avas'   , auth , user.avas);
    app.post('/login' ,  user.login);
    app.put('/settings', auth , user.upsett);
    app.get('/settings', auth , user.readProfile);
    app.delete('/settings/:id' , auth ,  user.remove);
    //fb routes
    app.post('/auth/facebook/token', passport.authenticate('facebook-token'),
   function (req, res) {
    // do something with req.user 
    res.send(req.user? 200 : 401);
  }
);
    app.get('/oauth/facebook' , passport.authenticate('facebook' , {scope :  [ 'email' ] }));
   app.get('/oauth/facebook/callback' , passport.authenticate('facebook',{
        successRedirect : '/home',
        failureRedirect  : '/'
    }));
    app.get('/auth/twitter' , passport.authenticate('twitter'));
    app.get('/auth/twitter/callback' , passport.authenticate('twitter',{
    	successRedirect : '/home',
    	failureRedirect  : '/'
    }));

    app.get('/logout' , function(req , res){
    	req.logout();
    	res.redirect('/');
    }); 
  
    app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})
};
