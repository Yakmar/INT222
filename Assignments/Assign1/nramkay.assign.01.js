/*Nicolas Ramkay
 *051757078
 *September 24th, 2013
 *INT222B
 *Assignment #1
 *Prof. Tom Aratyn
 */

function UPC(upc_code) {//Validate then assign upc_code to UPC.code

  if(upc_code != "undefined") {	//As long as upc_code is NOT undefined: Proceed.
    if (this.validate(upc_code)) {//Using the validation method in the UPC object
								  //we validate upc_code. If its valid, we add it in.
      this.code = upc_code;            
    }
    else {	//OTHERWISE
      this.code = "";            
    }
  }
  else {    
    this.code = "";       
  }
}

UPC.prototype = {
//VALIDATION METHOD
  validate: function(upc_code) {
	//STEP ONE: We add up the odd numbered digits and multiply them by 3
    var odd = (3 * ((upc_code[0]-0)+(upc_code[2]-0)+(upc_code[4]-0)
	+(upc_code[6]-0)+(upc_code[8]-0)+(upc_code[10]-0)));
	//STEP TWO: We add up the even digits.
    var even = ((upc_code[1]-0)+(upc_code[3]-0)+(upc_code[5]-0)+(upc_code[7]-0)+(upc_code[9]-0));       
    //STEP THREE: Find the SUM from both step one and two, then mod by ten.
	//This gives us the REMAINDER of the division, not the RESULT.
	var remainder = (odd + even)%10;
    
	//STEP FOUR: Take the remainder of STEP THREE and see if it 
	//explicitly matches the check digit of the UPC.
    if ((10-remainder) === (upc_code[11]-0)) {
      return true;
    }
    else {        
      return false;
    }
  },
//CODE SETTER METHOD       
  set_code: function(upc_code, accept_invalid) {        
    if (accept_invalid) {//If 'accept_invalid' is set to true then
						 //automatically set upc_code without validating
      this.code = upc_code;        
    }
    else if (this.validate(upc_code)) {//unless accept_invalid is FALSE
									   //or undefined, then we validate.
      this.code = upc_code;        
    }
    else {//OTHERWISE, set the code to nothing.       
      this.code = "";        
    }
},
//Get_code method that simply returns the code property.       
    get_code:function () {    
            return this.code;    
    }
};

//PRODUCT OBJECT
//This constructor receives 'options' which contains multiple properties.
function Product (options) {
//Name property
//Set the name as long as it exists, otherwise set it to 'TBD'
    if (options.name === undefined) {
        this.name = "TBD";
    }
    else {
        this.name = options.name;
    }
//Price property
//Set the Price if it is greater than 0.
    if (options.price > 0) {
	//Math.round does not round to decimals. As a result it is easier
	//to multiply the price by 100, round it, and divide back down to
	//achieve a number with two decimal places.
        this.price = (Math.round((options.price*100))/100);  
    }
    else {//Otherwise, we set it to zero.
        this.price = 0;
    }
//UPC property
//If the UPC in options is an 'object' then we simply set it.
    if (typeof(options.upc) === "object") {
        this.upc = options.upc;
    }
//If the UPC in options is a 'string' then we need to turn it
//into an object using our UPC constructor (see line 9)
    else if(typeof(options.upc) === "string") {
        this.upc = new UPC(options.upc);
    }
//OTHERWISE: we make an empty U PC object.
    else {
        this.upc = new UPC();
    }
//Image_path property
//Using a regular expression "myRegExp", we can filter out any
//invalid image paths. Since we know that have to start with /
// and end with .jpg, .jpeg, .png, or .gif
    var myRegExp = /^\/.*.[jpg,jpeg,png,gif]$/;
//The .test property of myRegExp will test the validity of options.image_path
//and return true or false.
    if (myRegExp.test(options.image_path)) {
        this.image_path = options.image_path;
    }
    else {
        this.image_path = undefined;
    }
//Create property priceChangeListeners and assign to new Array
    this.priceChangeListeners = new Array();
}

Product.prototype = {
//AddPriceChangeListener method
//using the .push property of an array
//we APPEND the listener to the .priceChangeListeners array.   
    addPriceChangeListener:function(listener) {
        this.priceChangeListeners.push(listener);
    },
//Listener removal method
//We use the .splice property to REMOVE the listener in question
    removePriceChangeListener:function(listener) {
        var index = this.priceChangeListeners.indexOf(listener);
        this.priceChangeListeners = this.priceChangeListeners.splice(index,1);
    },
//SetPrice method
//This was hard for me but really shouldn't have been.
//We call all the priceChangeListeners in our array, if price is more than 0,
//one by one using a FOR loop.
    setPrice:function(new_price) {
        if(new_price>0) {
            this.price = new_price;
            for(var i=0; i<this.priceChangeListeners.length; i++){
                this.priceChangeListeners[i](new_price, this);
            }
        }
    },
//Set Price method
//Simply returns the price property of the current object.
    getPrice:function(){
        return this.price;
    }
};