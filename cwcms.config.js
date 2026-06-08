/*
   ___  __    __                   
  / __\/ / /\ \ \___ _ __ ___  ___ 
 / /   \ \/  \/ / __| '_ ` _ \/ __|
/ /___  \  /\  / (__| | | | | \__ \
\____/   \/  \/ \___|_| |_| |_|___/

this is CWcms anno 2025. to get started, add your mongodb connection string to the .env file, under MONGO_URI
add the modules you need to the modules array.

use npm run make:account to make your first account.

//////////////////////////////
------AVAILABLE MODULES-------
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

----GENERAL PURPOSE----
* Post
* Blog

----RESTAURANT----
* Menu
* Reviews
* Opening hours

//////////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

export default {
    clientLogo: '',
    modules: ['menu', 'reviews'],
    db: process.env.MONGO_URI
}