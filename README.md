# How To 2 API

API address https://how-to-api-2.herokuapp.com

## Authentication Routes

### POST 

**/auth/register**  —Registers a user. 
Takes in an object: 
{Username: data, Password: data, Email: data, Account: Editor or Subscriber}
Returns an object with Username and Account.

**/auth/login** —Logs in a user
Takes in an object:
{Username: data, Password, data}
Returns and object with id, Username, Account, and a token

### GET

**/auth/users** —Returns a list of users
*same as /api/users

## Users Routes

### GET

**/api/users** —Returns a list of all users
*same as /auth/users

**/api/users/subscribers** —Returns a list of all users that are subscribers.

**/api/users/editors** —Returns a list of all users that are editors.

**/api/users/admins** —Returns a list of all users that are administrators.

**/api/users/:id** —Returns a user of a specific id.

### PUT

**/api/users/:id** —Updates a user of a specific id
Takes in an object with entries that need to be updated
ex. {Username: new username} or {Password: new password} or a combination of any fields
Will return a success message or error message

### DELETE

**/api/user/:id** —Deletes a user of a specific id

## Entries Routes

### GET

**/api/entries** —Returns an array of all entries as object with each object containing entry info, an array of content blocks, and an average rating field.

**/api/entries/:id** —Returns a single entry object containing entry info, an array of content block objects, and average rating field.

**/api/entries/:id/content** —Returns an array of all content block objects for a specific entry.

**/api/entries/content/:id** —Returns an object of a specific content block by content blocks id.

**/api/entries/author/:id** —Returns all entries from a specific author/editor.

**/api/entries/categories/:id** —Returns all entries from a specific category.

**/api/topentries** —Returns the top rated entries 
This endpoint takes an optional query string (?limit=number) at the end which limits the number of entries returned. Default is 1 entry. Ex. /api/topentries?limit=3 will return 3 entries.

**/api/entries/:id/rating** —Returns a users rating for a specific entry
This Route takes in a non-optional query string ?user=(users id)
user = user id
:id = entry id

### POST 

**/api/entries** —Adds an entry 
Takes in an object:
{User_id: data, Title: data, Category: data}
Returns the created entry with all data fields including author, author id, date created, and initialized AverageRating of 0 ^

**/api/entries/content** —Adds a content block to a post.
Takes in an object:
{Entries_id: entries id, Step: data, Heading: data, Content: data}
Returns the same object with its own unique id.

**/api/entries/rating** —Adds a rating for an entry
Takes in an object:
{Users_id: data, Entries_id: data, Rating: data}
Returns a success message and the rating entered. 

### PUT

**/api/entries/:id** —Updated an entry of a specific id
Takes in an object of fields needed to be updated 
Returns a success or error message.

**/api/entries/content/:id** —Edits a content block by content blocks id (not entry id)
Takes in an object of fields needed to be updated 
Returns a success or error message.

**/api/entries/:id/rating** —Edits the rating for a specific entry
Takes a non-optional query string ?user=(user id) and :id in path it id of entry 
Takes in an object {Rating: data}
Returns a success or error message


### DELETE

**/api/entries/:id** —Deletes an entry of a specific id.

**/api/entries/content/:id** —Deletes a content block by its id.

**/api/entries/:id/rating** —Deletes a rating for an entry.
Takes a non-optional query string ?user=(user id) and :id in path is id of entry.

## Categories

### GET

**/api/categories** -Gets a list of all categories.

**/api/categories/:id** -Gets a category by id.

### POST

**/api/categories** - Takes in an object {Name: data} and returns the object including id.

### PUT

**api/categories/:id** Edits a category takes in {Name: data} object and returns the object including id.

### DELETE

**api/categories/:id** Delets a category of a given id.

^When creating an entry it will not show in get routes without at least 1 rating. To subvert this bug each entry is initialized with a rating of 0. This rating is created by the author of the entry. So if a user is viewing his/her own entry and goes to rate their own entry it must update the rating and not try to make a new one.


Back end server created using node js, express, and knex.