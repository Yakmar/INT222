/*Nicolas Ramkay
 *INT222B
 *September 24th, 2013
 *Prof Tom Aratyn
 *Lab 03
 */
 
var LoggerLevels = {
    DEBUG: 1, 
    LOG: 2,    
    ERROR: 3, 
    FATAL: 4
};

var Logger = Object.create(LoggerLevels);


Logger.setLogLevel = function (logLevel){

    this.logLevel = logLevel;
        
}
        
Logger.log = function (logLevel, message){

    if (this.logLevel && this.logLevel <= logLevel){
            
        console.log(message);
        
    }else if (!(this.logLevel)){
    
        console.log(message);

    }
}

myLogger = Object.create(Logger);

myLogger.setLogLevel(LoggerLevels.LOG);
myLogger.log(myLogger.LOG, 'hello world (log)');
myLogger.log(myLogger.DEBUG, 'hello world (debug)');
myLogger.log(myLogger.ERROR, 'hello world (error)');

/*Two lines only get printed because the value given in the last three lines
*dictates what gets printed. This is essentially the javascript equivalent of
*inheritance. The LOGGERLEVELS object contains 4 values. Those values are inherited
*by the LOGGER object because we used it as a prototype in our Object.Create statement.
*We use the Object.Create again with myLogger and that results in the inheritance of BOTH
*earlier objects. This allows us to say 'myLogger.LOG' still has the value of 2.
*/