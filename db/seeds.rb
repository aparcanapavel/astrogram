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
#6
kepler = User.create(username: "kepler", password: "password", full_name: "Johannes Kepler")
  kepler.profile_picture.attach(io: open("https://astrogram-seeds.s3.amazonaws.com/kepler.jpg"), filename: "kepler.jpg")
#7
tom = User.create(username: "tomDelonge", password: "password", full_name: "Thomas Delonge")
  tom.profile_picture.attach(io: open("https://astrogram-seeds.s3.amazonaws.com/profile-tom.jpg"), filename: "profile-tom.jpg")
 #8 
elon = User.create(username: "theMusk", password: "password", full_name: "Elon Musk")
  elon.profile_picture.attach(io: open("https://astrogram-seeds.s3.amazonaws.com/profile-elon.jpeg"), filename: "profile-elon.jpg")
#9
nasa = User.create(username: "nasa", password: "password", full_name: "Nasa")
  nasa.profile_picture.attach(io: open("https://astrogram-seeds.s3.amazonaws.com/profile-nasa.jpg"), filename: "profile-nasa.jpg")

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
#space x rocket
mustPost = Image.new({ author_id: 8, caption: "We need to expand the human race" })
file6 = open('https://astrogram-seeds.s3.amazonaws.com/spacex-rocket.jpg')
mustPost.photo.attach(io: file6, filename: "spacex-rocket.jpg")
mustPost.save
  Like.create({ author_id: 2, image_id: 6 })
  Like.create({ author_id: 3, image_id: 6 })
  Like.create({ author_id: 1, image_id: 6 })
  Like.create({ author_id: 4, image_id: 6 })
  Like.create({ author_id: 5, image_id: 6 })
#nasa
nasaPost = Image.new({ author_id: 9, caption: "Throwback to the lunar landing" })
file7 = open('https://astrogram-seeds.s3.amazonaws.com/lunar-landing.jpg')
nasaPost.photo.attach(io: file7, filename: "lunar-landing.jpg")
nasaPost.save
  Like.create({ author_id: 2, image_id: 7 })
  Like.create({ author_id: 3, image_id: 7 })
  Like.create({ author_id: 1, image_id: 7 })
  Like.create({ author_id: 4, image_id: 7 })
  Like.create({ author_id: 5, image_id: 7 })
#nasaPost2
nasaPost2 = Image.new({ author_id: 9, caption: "Earlier this year, we collaborated with other countries in order to get this amazing image of a black hole" })
file8 = open('https://astrogram-seeds.s3.amazonaws.com/nasa-blackhole.jpg')
nasaPost2.photo.attach(io: file8, filename: "nasa-blackhole.jpg")
nasaPost2.save
  Like.create({ author_id: 2, image_id: 8 })
  Like.create({ author_id: 3, image_id: 8 })
  Like.create({ author_id: 1, image_id: 8 })
  Like.create({ author_id: 4, image_id: 8 })
  Like.create({ author_id: 5, image_id: 8 })
#tom post
tomPost = Image.new({ author_id: 7, caption: "UFOs exist. Read more at Washington Post" })
file9 = open('https://astrogram-seeds.s3.amazonaws.com/starsAcademy-earth.jpg')
tomPost.photo.attach(io: file9, filename: "starsAcademy-earth.jpg")
tomPost.save
  Like.create({ author_id: 2, image_id: 9 })
  Like.create({ author_id: 3, image_id: 9 })
  Like.create({ author_id: 1, image_id: 9 })
  Like.create({ author_id: 4, image_id: 9 })
  Like.create({ author_id: 5, image_id: 9 })
#nasa post 3
nasaPost3 = Image.new({ author_id: 9, caption: "Our Space Shuttle" })
file10 = open('https://astrogram-seeds.s3.amazonaws.com/nasa-rocket.jpg')
nasaPost3.photo.attach(io: file10, filename: "nasa-rocket.jpg")
nasaPost3.save
  Like.create({ author_id: 2, image_id: 10 })
  Like.create({ author_id: 3, image_id: 10 })
  Like.create({ author_id: 1, image_id: 10 })
  Like.create({ author_id: 4, image_id: 10 })
  Like.create({ author_id: 5, image_id: 10 })


# FOLLOWS
Follow.create({ followee_id: 5, follower_id: 1})
Follow.create({ followee_id: 4, follower_id: 1})
Follow.create({ followee_id: 3, follower_id: 1})
Follow.create({ followee_id: 2, follower_id: 1})

#demo user follows all
Follow.create({ followee_id: 1, follower_id: 3 })
Follow.create({ followee_id: 1, follower_id: 4 })
Follow.create({ followee_id: 1, follower_id: 5 })
Follow.create({ followee_id: 1, follower_id: 6 })
Follow.create({ followee_id: 1, follower_id: 7 })
Follow.create({ followee_id: 1, follower_id: 8 })
Follow.create({ followee_id: 1, follower_id: 9 })
