# Astrogram

[Live Link](https://astrogram-prod.herokuapp.com/)

This is **Astrogram** a single page clone of Instagram. *Astrogram* includes the basic features of instagram,like creating an account,loggin in, logging out, staying logged in after refreshing the page, and having a profile show page for users(current user pofile will display different settings). Further, *Astrogram* also has a feature outside of what is included in Instagram, uploading images from the browser instead of the app.


Bellow is the welcome screen for a new user
![Greetings](https://github.com/aparcanapavel/astrogram/blob/master/z-astrogram-welcome-signup.png?raw=true)

In order to handle the likes annimation, I used basic jQuery to add and remove classess to the heart   element. In the end, it allowed me to create a simple annimation that expands and fills the heart for   liking it, and it shrinks and shows a different heart uppon unliking the picture.
![likes code](https://github.com/aparcanapavel/astrogram/blob/master/z-astrogram-likes-code.png?raw=true)

To upload images, I added this form that appears as a modal on top everything else in the page.
![upload image form](https://github.com/aparcanapavel/astrogram/blob/master/z-image-upload-form.png?raw=true)
![image-preview](https://github.com/aparcanapavel/astrogram/blob/master/z-moon-preview.png?raw=true)

Lastly, if users were to visit their own profile page and click on the gear icon, it pops up another modal that shows a list with a link to my own current website, a logout button, and a cancel button.
![profile-logout](https://github.com/aparcanapavel/astrogram/blob/master/z-profile-settings.png?raw=true)


### Technologies Used:
1. JavaScript
2. Ruby on Rails
3. PostgreSQL
4. HTML
5. CSS

### Libraries Used:
* React.js
* Redux.js
* jQuery for Ajax calls to my API & for animations
* BCrypt for user passwords
* AWS S3 buckets to store images
### Features:
* Sign up, log in, log out with username & password
* Image upload form
* Image likes and unlikes
* Profile show
* Follow and unfollow users
* Filtered feed that only show users being followed
#### Beta Features:
* Search for users
* Edit profile
