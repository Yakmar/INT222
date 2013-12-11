function addEmail()
{
    var learnID = document.forms["coop_app"]["LearnID"].value;
    document.forms["coop_app"]["email"].value = learnID + "@senecacollege.ca";
}