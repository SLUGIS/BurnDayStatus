/**
 * Read values coming from the form
 */
function BurnDayStatusEdit(e) {
  Logger.log("my edit");
  var ss = SpreadsheetApp.getActiveSheet();

  if (ss.getName().equals("Morning Report")) {
<<<<<<< HEAD

    // get range of values that contain string from admin report
=======
    
>>>>>>> bac1fe6903aee073640145fdf0aff7144a3cb085
     var coastalBurnStatusRange = ss.getRange("AC5:AG5");
     var inlandBurnStatusRange = ss.getRange("AC6:AG6");
     var d = new Date();
    
<<<<<<< HEAD
     postToCartoDB(coastalBurnStatusRange.getValue(), inlandBurnStatusRange.getValue(), d.toLocaleDateString());
=======
     
     postToCartoDB(coastalBurnStatusRange.getValue(), inlandBurnStatusRange.getValue(), d.toLocaleString());

>>>>>>> bac1fe6903aee073640145fdf0aff7144a3cb085
  }
}


/**
 * Insert color into CartoDB using sql http
 */
function postToCartoDB(coastal, inland, timestamp) {
  Logger.log("posting to CartoDB");
 
  /**
   * Keep your key private!
   */
  var cartodb_host = "slu.cartodb.com";   //Your CartoDB domain
  var cartodb_api_key = "";  //Your CartoDB API KEY
  
  Logger.log("coastal: " + coastal);
  Logger.log("inland: " + inland);
  
  var inlandStatus
  var coastalStatus
  
  if (inland == "PERMISSIVE")
    inlandStatus = "TRUE"
  else if (inland == "NEGATIVE")
    inlandStatus = "FALSE"
  else
    inlandStatus = "UNKNOWN"
    
  if (coastal == "PERMISSIVE")
    coastalStatus = "TRUE"
  else if (coastal == "NEGATIVE")
    coastalStatus = "FALSE"
  else
    coastalStatus = "UNKNOWN"

  var timeStamp = timestamp.replace("'","''");
  
  /**
   * Here is the INSERT statement
   */
  var query = "UPDATE inland SET burn_status='"+inlandStatus+"', burn_status_timestamp='" + timeStamp +"'";
  var query2 = "UPDATE coastal SET burn_status='"+coastalStatus+"', burn_status_timestamp='" + timeStamp +"'";
  
  Logger.log("SQL: "+query);  
  Logger.log("SQL: "+query2); 
  /**
   * Assemble the POST parameters
   */
  var options = {
    "method" : "post",
    "payload" : {q:query,api_key:cartodb_api_key}
  };
  
  var options2 = {
    "method" : "post",
    "payload" : {q:query2,api_key:cartodb_api_key}
  };

  /**
   * Ship It
   */
  var response=UrlFetchApp.fetch("https://"+cartodb_host+"/api/v1/sql", options);
  var respObj=Utilities.jsonParse(response.getContentText());
  Logger.log("CDB call result: "+response.getContentText());
  
  var response2 = UrlFetchApp.fetch("https://"+cartodb_host+"/api/v1/sql", options2);
  var respObj2=Utilities.jsonParse(response2.getContentText());
  Logger.log("CDB call result: "+response2.getContentText());
  
}
