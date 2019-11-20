# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# USERS
User.create(username: 'demoUser', password: 'password', full_name: 'Demo User')
User.create(username: "masterAdmin", password: "password", full_name: "administrator")
User.create(username: "galileo215", password: "password", full_name: "Galileo Galilei")
User.create(username: "einstein", password: "password", full_name: "Albert Einstein")
User.create(username: "newtonLaws", password: "password", full_name: "Isaac Newton")
User.create(username: "kepler", password: "password", full_name: "Johannes Kepler")

# IMAGE POSTS
# moon by demoUser
p = Image.new({author_id: 1, caption: "Enjoy this picture of the moon!"})
p.photo.attach(io: File.open("/Users/pavs/Desktop/Pics&Vids/My_pictures/Raw_abstract/processed/Moon_6290.jpg"), filename: "Moon_6290.jpg")
p.save
  # likes
  Like.create({ author_id: 2, image_id: 1 })
  Like.create({ author_id: 3, image_id: 1 })
  # comments
  Comment.create({ author_id: 2, image_id: 1, body: "Cool picture" })

# huge telescope
m = Image.new({author_id: 2, caption: "Great night sky!"})
m.photo.attach(io: File.open("/Users/pavs/Desktop/AppAcademy/week15:16/astrogram_images/looking_out.jpg"), filename: "looking_out.jpg") 
m.save

# earth
g = Image.new({author_id: 3, caption: "Ancient Greeks knew that the Earth was not flat"})
g.photo.attach(io: File.open("/Users/pavs/Desktop/AppAcademy/week15:16/astrogram_images/earth_from_moon.jpg"), filename: "earth_from_moon.jpg")
g.save
  #comments
  Comment.create({ author_id: 2, image_id: 3, body: "I thought the earth was a flat??" })

# night sky
n = Image.new({author_id: 5, caption: "thinking..."})
n.photo.attach(io: File.open("/Users/pavs/Desktop/AppAcademy/week15:16/astrogram_images/night_sky.jpg"), filename: "night_sky.jpg")
n.save

# space looking
e = Image.new({author_id: 4, caption: "Look out"})
e.photo.attach(io: File.open("/Users/pavs/Desktop/AppAcademy/week15:16/astrogram_images/space_telescope.jpg"), filename: "space_telescope.jpg")
e.save
  # likes
  Like.create({ author_id: 2, image_id: 5 })
  Like.create({ author_id: 3, image_id: 5 })
  Like.create({ author_id: 1, image_id: 5 })
