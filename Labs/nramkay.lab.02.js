/*
 * Nicolas Ramkay
 * 051-757-078
 * INT222AB
 * September 16th, 2013
 * Lab 2
 */

function User(username, registrationDate)
{
    this.get_username=function ()
    {
        return this.username;
    }
    this.set_username = function(newUsername)
    {
        this.username = newUsername;
        console.log('New username is: ' + newUsername);
    }
    this.get_registrateDate = function()
    {
        return registrationDate;
    }
    this.set_registration_date = function()
    {
        newDate = prompt('Enter a new registration date: ');
        if (typeof(newDate) === 'String')
            this.registrationDate = new Date(newDate);
        else
        this.registrationDate = newDate;
        console.log('New registration date is: ' + newDate);
    }
    
    this.username = username;
    
    if (typeof(registrationDate)==='String')
    {
        this.registrationDate = new Date(registrationDate);
    }
    else
        this.registrationDate = registrationDate;
    
    this.get_original_username = this.get_username();
    
    
}


var user1=new User('Saul','09-16-13');

user1.set_username('Paul');

user1.set_username(user1.get_original_username);

/* the get_original_username closure is essentially a stored value
*  that finds the original username used to instantiate the object.
*  What does that mean? It means when get_original_username is called,
*  it refers to a function that immediately returns 'username' which was
*  the FIRST username ever given to create the object.
*  get_original_username is NOT a function. It is a variable that CALLS a
*  function and gives get_original_username a value.
*/