/*
function onEdit(e) {
SpreadsheetApp.getActiveSheet().getRange('A1').setValue(Math.random());
}
*/

function callAPI(website) {
  var response = UrlFetchApp.fetch(website);
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json;
}


/**
This is a function for calling exchange prices
@customFunction
*/

function getEXPrice() {


  var api = callAPI("https://api.coinmarketcap.com/v2/ticker/1/");
  var symbol = api["data"]["quotes"]["USD"]["price"];
  Logger.log(symbol);
  return symbol;
  }




/**
This is a function for calling bitfinex sell price
@customFunction
*/

function getBFXSellPrice(input, coin, random) {
  input *= 1.2;

  var api = callAPI("https://api.bitfinex.com/v2/book/t" + coin + "USD/P0");
  var isBid = true;
  var total = 0;
  var sum = 0;
  var i = 0;
  var price = api[i][0];

  while (api[i][2] > 0){
  if(api[i][2] > 0){
  total = total + 0 + api[i][2];
  i++;
  }
  else{
  break;
   }
  }


  if (input >= total){
  api = callAPI("https://api.bitfinex.com/v2/book/t" + coin + "USD/P1");
  total = 0;
  i = 0;
  while (api[i][2] > 0){
  if(api[i][2] > 0){
  total = total + 0 + api[i][2];
  i++;
  }
  else{
  break;
    }
   }
  }

  if (input >= total){
  api = callAPI("https://api.bitfinex.com/v2/book/t" + coin + "USD/P2");
  total = 0;
  i = 0;
  while (api[i][2] > 0){
  if(api[i][2] > 0){
  total = total + 0 + api[i][2];
  i++;
  }
  else{
  break;
    }
   }
  }


  for( var j = 0; input > sum; j++){
  sum = sum + 0 + api[j][2];
  if (input >= sum){
  price = api[j][0];
  //break;
  }
  }

  Logger.log(price);
  return price;
}


/**
This is a function for calling bitfinex buy price
@customFunction
*/

function getBFXBuyPrice(input, coin, random) {
  input *= 1.2;

  var api = callAPI("https://api.bitfinex.com/v2/book/t" + coin + "USD/P0");
  var isBid = true;
  var total = 0;
  var sum = 0;
  var i = 0;
  var price = api[i][0];
 // input *= -1;


  for (var each in api) {
  if(api[each][2] < 0){
  //Logger.log(api[each][2]);
  total = total + 0 + api[each][2];
  }
}

  //Logger.log(total);


  if (input >= (total*-1)){
  api = callAPI("https://api.bitfinex.com/v2/book/t" + coin + "USD/P1");
  total = 0;
  i = 0;
  while (api[i][2] > 0){
  if(api[i][2] > 0){
  total = total + 0 + api[i][2];
  i++;
  }
  else{
  break;
    }
   }
  }

  if (input >= (total*-1)){
  api = callAPI("https://api.bitfinex.com/v2/book/t" + coin + "USD/P2");
  total = 0;
  i = 0;
  while (api[i][2] > 0){
  if(api[i][2] > 0){
  total = total + 0 + api[i][2];
  i++;
  }
  else{
  break;
    }
   }
  }

  Logger.log(total);

  for( var j = 0; input > (sum*-1); j++){
  if(api[j][2] < 0){
  sum = sum + 0 + api[j][2];
  }
  if (input >= (sum*-1)){
  price = api[j][0];
  //break;
  }
  }
  Logger.log(sum);

  Logger.log(price);
  return price;
}
