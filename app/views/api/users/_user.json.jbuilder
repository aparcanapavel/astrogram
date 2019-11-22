json.extract! user, :id, :username, :follower_ids, :followee_ids, :authored_image_ids

json.fullName user.full_name

json.followed current_user.followees.include?(user)

# if(user.photo)
  # json.imageUrl url_for(user.photo)
# end
