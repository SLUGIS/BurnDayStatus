/**
 * Read values coming from the form
 */
function BurnDayStatusEdit(e) {
  Logger.log("my edit");
  var ss = SpreadsheetApp.getActiveSheet();

  if (ss.getName().equals("Morning Report")) {
    
     var coastalBurnStatusRange = ss.getRange("AC5:AG5");
     var inlandBurnStatusRange = ss.getRange("AC6:AG6");
     var d = new Date();
    
     
     postToCartoDB(coastalBurnStatusRange.getValue(), inlandBurnStatusRange.getValue(), d.toLocaleString());

  }
}


/**
 * Insert color into CartoDB
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
  
  var inlandStatus = inland == "Positive" ? "TRUE" : "FALSE";
  var coastalStatus = coastal == "Positive" ? "TRUE" : "FALSE";
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
