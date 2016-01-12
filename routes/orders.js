require('./db');
initDB();
db = cloudant.use('medkartordersdb');

exports.createNewOrder = function(req,res) {
	console.log("createNewOrder");
	var itemId = req.body.itemId;
	var itemName = req.body.itemName;
	var count = req.body.count;
	var orderId = '';
	
	
	db.insert({
		'itemId' : itemId,
		'itemName' : itemName,
		'count':count,
		
	}, orderId, function(err, doc) {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		} else
			res.sendStatus(200);
		res.end();
	});
	
}





//list all the database contents.
exports.listOrders = function(req, res) {
	console.log("list orders");
   var docList = [];
	var i = 0;
	db.list(function(err, body) {
		console.log("list");
		if (!err) {
			var len = body.rows.length;
			console.log('total # of docs -> '+len);
			if(len == 0) {
				// push sample data
				// save doc
				
						var responseData = createEmptyResponseData(
							);
						docList.push(responseData);
						res.write(JSON.stringify(docList));
						console.log(JSON.stringify(docList));
						console.log('ending response...');
						res.end();
					}
				
			else {

				body.rows.forEach(function(document) {
					
					db.get(document.id, { revs_info: true }, function(err, doc) {
						if (!err) {
							
								var responseData = createResponseData(
										doc._id,
										doc.itemId,
										doc.itemName,
										doc.count
										);
							
						
							docList.push(responseData);
							i++;
							if(i >= len) {
								res.write(JSON.stringify(docList));
								console.log('ending response...');
								res.end();
							}
						} else {
							var respData={
								"err":err,
								"msg":"Error in retrieving record"
								
								
							}
							console.log(respData);
							res.write(JSON.stringfy(respData));
							//docList.push(responseData);
						}
					});
					
				});
			}
			
		} else {
			var respData={
								"err":err,
								"msg":"Error in retrieving record"
								
								
							}
										console.log(err);
							console.log(respData);
							res.write(JSON.stringfy(respData));

		}
	});
}

