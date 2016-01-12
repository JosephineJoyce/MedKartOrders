cloudant = require('cloudant')(cloudantService.credentials.url);

//Initiate the database.
initDB = function() {
    cloudant.db.create('medkartordersdb', function(err, body){
    if(!err){
        
        console.log('Successfully created database medkartordersdb!');
    }
    else{
		console.log("err in creation",err);
		console.log("err in creation",body);
        //console.log("Database already exists.");
    }
    });
}

createResponseData=function(id, itemId, itemName, count) {

	var responseData = {
		"id" : id,
		"itemId" : itemId,
		"itemName" : itemName,
		"count":count
		
	};
	
	 
	
	return responseData;
}
createEmptyResponseData=function() {

	var responseData = {
		"code" : "EMPTY",
		"MSG" : "There are no records",
		
		
	};
	
	 
	return responseData;
}
