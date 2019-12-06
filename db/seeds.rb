require "open-uri"
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# USERS
demo = User.create(username: 'demoUser', password: 'password', full_name: 'Demo User')
  demo.profile_picture.attach(io: open("https://astrogram-seeds.s3.amazonaws.com/night-sky-with-moon-and-stars.jpg"), filename: "Night-sky-with-moon-and-stars.jpg")

master = User.create(username: "masterAdmin", password: "password", full_name: "administrator")
  master.profile_picture.attach(io: open("https://astrogram-seeds.s3.amazonaws.com/night-sky-with-moon-and-stars.jpg"), filename: "night-sky-with-moon-and-stars.jpg")

galileo = User.create(username: "galileo215", password: "password", full_name: "Galileo Galilei")
  galileo.profile_picture.attach(io: open("https://astrogram-seeds.s3.amazonaws.com/gallieo.jpg"), filename: "gallieo.jpg")

einstein = User.create(username: "einstein", password: "password", full_name: "Albert Einstein")
  einstein.profile_picture.attach(io: open("https://astrogram-seeds.s3.amazonaws.com/einstein.jpg"), filename: "einstein.jpg")

newton = User.create(username: "newtonLaws", password: "password", full_name: "Isaac Newton")
  newton.profile_picture.attach(io: open("https://astrogram-seeds.s3.amazonaws.com/newton.jpg"), filename: "newton.jpg")

kepler = User.create(username: "kepler", password: "password", full_name: "Johannes Kepler")
  kepler.profile_picture.attach(io: open("https://astrogram-seeds.s3.amazonaws.com/kepler.jpg"), filename: "kepler.jpg")

# IMAGE POSTS
# moon by demoUser
p = Image.new({author_id: 1, caption: "Enjoy this picture of the moon!"})
file1 = open('https://astrogram-seeds.s3.amazonaws.com/Moon_6290.jpg')
p.photo.attach(io: file1, filename: "Moon_6290.jpg")
p.save
  # likes
  Like.create({ author_id: 2, image_id: 1 })
  Like.create({ author_id: 3, image_id: 1 })
  # comments
  Comment.create({ author_id: 2, image_id: 1, body: "Cool picture" })

# huge telescope
m = Image.new({author_id: 2, caption: "Great night sky!"})
file2 = open('https://astrogram-seeds.s3.amazonaws.com/looking_out.jpg')
m.photo.attach(io: file2, filename: "looking_out.jpg") 
m.save

# earth
g = Image.new({author_id: 3, caption: "Ancient Greeks knew that the Earth was not flat"})
file3 = open('https://astrogram-seeds.s3.amazonaws.com/earth_from_moon.jpg')
g.photo.attach(io: file3, filename: "earth_from_moon.jpg")
g.save
  #comments
  Comment.create({ author_id: 2, image_id: 3, body: "I thought the earth was a flat??" })

# night sky
n = Image.new({author_id: 5, caption: "thinking..."})
file4 = open('https://astrogram-seeds.s3.amazonaws.com/night_sky.jpg')
n.photo.attach(io: file4, filename: "night_sky.jpg")
n.save

# space looking
e = Image.new({author_id: 4, caption: "Look out"})
file5 = open('https://astrogram-seeds.s3.amazonaws.com/space_telescope.jpg')
e.photo.attach(io: file5, filename: "space_telescope.jpg")
e.save
  # likes
  Like.create({ author_id: 2, image_id: 5 })
  Like.create({ author_id: 3, image_id: 5 })
  Like.create({ author_id: 1, image_id: 5 })


# FOLLOWS
Follow.create({ followee_id: 5, follower_id: 1})
Follow.create({ followee_id: 4, follower_id: 1})
Follow.create({ followee_id: 3, follower_id: 1})
Follow.create({ followee_id: 2, follower_id: 1})

Follow.create({ followee_id: 1, follower_id: 3 })
Follow.create({ followee_id: 1, follower_id: 4 })
Follow.create({ followee_id: 1, follower_id: 5 })
