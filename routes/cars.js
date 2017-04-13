/**
 * New node file
 */
var request = require('request');
var querystring=require('querystring');
var http=require('http');
var myJSONObject=
{
		"input":"",
		"sdatetime":"",
		"edatetime":""
};

exports.search=function(req,res)
{
	console.log("Inside Search");
	var pickuplocation = req.param('pickuplocation');
	console.log("pickuplocation----->"+pickuplocation);
	var pickupdate = req.param('pickupdate');
	var pickupdate =  (req.param('pickupdate')) ? req.param('pickupdate') : '';
	var pickuptime = req.param('pickuptime');
	var days = req.param('days');
	var dropoffdate = (req.param('dropoffdate')) ? req.param('dropoffdate') : '';
	var dropofftime = req.param('dropofftime');
	console.log("dropoffdate----->"+dropoffdate);
	var details={};
	var cars=[];
	var resp={
    		"statusCode":"",
			"cars":""
	};
	
	myJSONObject.input=pickuplocation;
	myJSONObject.sdatetime=pickupdate;
	myJSONObject.edatetime=dropoffdate;
	console.log("myJSONObject----->"+JSON.stringify(myJSONObject));
	
	request({
	    url: "https://homerest.herokuapp.com/req/car",
	    method: "POST",
	    json: true,   // <--Very important!!!
	    body: myJSONObject
	}, function (error, response, body){
		if (!error && response.statusCode === 200) {
            console.log("response----->"+JSON.stringify(response));
            console.log("body----->"+JSON.stringify(body));
            //res.send(response);
            if(response!= null){
	            console.log(response.body.carinfo.length);
	            var i;
	            for(i=0;i<response.body.carinfo.length;i++)
	            {
	            	details={};
	            	details.totalprice=response.body.carinfo[i].totalprice;
	            	details.dailyrate=response.body.carinfo[i].dailyrate;
	            	details.mileagedescription=response.body.carinfo[i].mileagedescription;
	            	details.features=response.body.carinfo[i].features;
	            	details.model=response.body.carinfo[i].model;
	            	details.typicalseating=response.body.carinfo[i].typicalseating;
	            	details.locationdescription=response.body.carinfo[i].locationdescription;
	            	details.typename=response.body.carinfo[i].typename;
	            	cars.push(details);
	            }
	            console.log("cars "+JSON.stringify(cars));
	        	console.log("details "+JSON.stringify(details));
	            resp.statusCode=200;
	            resp.cars=cars;
	            res.send(resp);
            }
        }
		else
		{
			console.log(response.statusCode);
			resp.statusCode=500;
			res.send(resp);
		}
	});
};