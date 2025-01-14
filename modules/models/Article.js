const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const slug = require('slug')
const User = require('./User')

const ArticleSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  title: { type: String, required: true },
  description: String,
  body: String,
  favoritesCount: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

ArticleSchema.plugin(uniqueValidator, { message: 'is already taken' })

ArticleSchema.pre('validate', function (next) {
  this.slugify()

  next()
})

ArticleSchema.methods.slugify = function () {
  this.slug = slug(this.title)
}

ArticleSchema.methods.updateFavoriteCount = function () {
  const article = this

  return User.count({ favorites: { $in: [article._id] } }).then(function (count) {
    article.favoritesCount = count

    return article.save()
  })
}

ArticleSchema.methods.toJSONFor = function (user) {
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  }
}

module.exports = mongoose.model('Article', ArticleSchema)
