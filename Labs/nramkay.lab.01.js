/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */

function User(username, registrationDate)
{
    function get_username()
    {
        return username;
    }
    function set_username()
    {
        newUsername = prompt('Enter a new username: ');
        this.username = newUsername;
        console.log('New username is: ' + newUsername);
    }
    function get_registrationDate()
    {
        return registrationDate;
    }
    function set_registration_date()
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
    
    this.get_original_username = get_username();
    
    
}


var user1=new User('Saul','09-16-13');
console.log(user1.username);
console.log(user1.registrationDate);
user1.set_username;
