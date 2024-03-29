# Astrogram

This is **Astrogram** a single page clone of Instagram. *Astrogram* includes the basic features of Instagram, like creating an account, logging in, logging out, staying logged in after refreshing the page, and having a profile show page for users(current user pofile will display different settings). Further, *Astrogram* also has a feature outside of what is included in Instagram, uploading images from the browser. Finally, *Astrogram* has been built mobile first!


### Technologies Used:
1. JavaScript
2. Ruby on Rails
3. PostgreSQL
4. React.js
5. Redux.js
6. HTML5
7. CSS3
8. Sass
9. jQuery for Ajax calls to my API & for animations
10. BCrypt for user passwords
11. AWS S3 buckets to store user images
### Features:
* Sign up, log in, log out with username & password
* Image upload Modal
* Image likes and unlikes with animation
* Profile show
* Follow and unfollow users
* Filtered feed that only shows users being followed by the current user.
* Search for users
* Edit profile
* Mobile Friendly


Bellow is the splash screen for a new visiting user
![Greetings](https://github.com/aparcanapavel/astrogram/blob/master/z-astrogram-welcome-signup.png?raw=true)

In order to handle the likes annimation, I used basic jQuery to add and remove classess to the heart element. In the end, it allowed me to create a simple annimation that expands and fills the heart for   liking it, and it shrinks and shows a different heart uppon unliking the picture.

```js
// #frontend/components/image_index_item.jsx
handleLike(imageId) {
    const { currentUser, likes } = this.props;

    for(let i = 0; i < likes.length; i++){
      if(likes[i].authorId === currentUser.id){
        this.props.deleteLike(likes[i].id);
        this.likeIcon = "far fa-heart";
        
        document.getElementById(`heartIcon-${imageId}`)
          .style.fontSize = '60px';

        $(`#heartIcon-${imageId}`)
          .fadeIn(800)
          .animate({ 'font-size': '30px' }, 150)
          .fadeOut(150);
      }
    }
    if (likes.every(like => like.authorId !== currentUser.id)) {
      this.props.createLike({ image_id: imageId, author_id: currentUser.id });
      this.likeIcon = "fas fa-heart";
      document.getElementById(`heartIcon-${imageId}`).style.fontSize = '40px';
      $(`#heartIcon-${imageId}`)
        .fadeIn(800)
        .animate({ 'font-size': '60px' }, 150)
        .fadeOut(150);

    }
    
  }
  ```

To upload images, I added this form that appears as a modal on top everything else in the page.
![upload image form](https://github.com/aparcanapavel/astrogram/blob/master/z-image-upload-form.png?raw=true)
![image-preview](https://github.com/aparcanapavel/astrogram/blob/master/z-moon-preview.png?raw=true)

Lastly, if users were to visit their own profile page and click on the gear icon, it pops up another modal that shows a list with a link to my own current website, a logout button, and a cancel button.
![profile-logout](https://github.com/aparcanapavel/astrogram/blob/master/z-profile-settings.png?raw=true)


