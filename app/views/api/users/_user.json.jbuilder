json.extract! user, :id, :username, :follower_ids, :followee_ids, :authored_image_ids

#json.imageUrl url_for(user.profile_picture)
json.fullName user.full_name

json.followed current_user.followees.include?(user)

if(user.profile_picture.attached?)
 json.imageUrl url_for(user.profile_picture)
end
