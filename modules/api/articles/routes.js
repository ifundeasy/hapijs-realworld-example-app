module.exports = (server) => {
  const inputValidations = require('./validations/input')
  const outputValidations = require('./validations/output')
  const fetchArticle = require('./prerequisites').fetchArticle(server)
  const fetchComment = require('./prerequisites').fetchComment(server)
  const authorizeArticle = require('./prerequisites').authorizeArticle(server)
  const authorizeComment = require('./prerequisites').authorizeComment(server)
  const handlers = require('./handlers')(server)

  return [
    // GET /api/articles
    {
      method: 'GET',
      path: '/articles',
      config: {
        description: 'Get a list of articles',
        notes: 'Returm a list of articles',
        tags: ['api', 'articles'],
        validate: inputValidations.ArticlesQueryValidations,
        response: outputValidations.ListArticleOutputValidationsConfig
      },
      handler: handlers.getArticles
    },
    // GET /api/articles/feed
    {
      method: 'GET',
      path: '/articles/feed',
      config: {
        description: 'Get the current logged user articles feed',
        notes: 'Return all articles followed users of the current logged user',
        tags: ['api', 'articles'],
        auth: 'jwt',
        validate: inputValidations.ArticlesFeedQueryValidations,
        response: outputValidations.ListArticleWithAuthOutputValidationsConfig
      },
      handler: handlers.getArticlesFeed
    },
    // POST /api/articles
    {
      method: 'POST',
      path: '/articles',
      config: {
        description: 'Create a new article',
        tags: ['api', 'articles'],
        auth: 'jwt',
        validate: inputValidations.ArticleCreatePayloadValidations,
        response: outputValidations.ArticleOnPostOutputValidationsConfig
      },
      handler: handlers.createArticle
    },
    // GET /api/articles/{slug}
    {
      method: 'GET',
      path: '/articles/{slug}',
      config: {
        description: 'Get an article by its slug',
        tags: ['api', 'articles'],
        auth: { mode: 'try', strategy: 'jwt' },
        pre: [fetchArticle],
        validate: inputValidations.ArticleParamsValidations,
        response: outputValidations.ArticleOnGetOutputValidationsConfig
      },
      handler: handlers.getArticle
    },
    // PUT /api/articles/{slug}
    {
      method: 'PUT',
      path: '/articles/{slug}',
      config: {
        description: 'Update an article',
        tags: ['api', 'articles'],
        auth: 'jwt',
        pre: [fetchArticle, authorizeArticle],
        validate: inputValidations.ArticleUpdatePayloadValidations,
        response: outputValidations.ArticleOnPutOutputValidationsConfig
      },
      handler: handlers.updateArticle
    },
    // DELETE /api/articles/{slug}
    {
      method: 'DELETE',
      path: '/articles/{slug}',
      config: {
        description: 'Delete an article',
        tags: ['api', 'articles'],
        auth: 'jwt',
        pre: [fetchArticle, authorizeArticle],
        validate: inputValidations.ArticleDeletePayloadValidations,
        response: outputValidations.ArticleOnDeleteOutputValidationsConfig
      },
      handler: handlers.deleteArticle
    },
    // POST /api/articles/{slug}/favorite
    {
      method: 'POST',
      path: '/articles/{slug}/favorite',
      config: {
        description: 'Favorite an article',
        tags: ['api', 'articles'],
        auth: 'jwt',
        pre: [fetchArticle],
        validate: inputValidations.ArticleFavoritePayloadValidations,
        response: outputValidations.ArticleFavoriteOutputValidationsConfig
      },
      handler: handlers.favoriteArticle
    },
    // DELETE /api/articles/{slug}/favorite
    {
      method: 'DELETE',
      path: '/articles/{slug}/favorite',
      config: {
        description: 'Unfavorite an article',
        tags: ['api', 'articles'],
        auth: 'jwt',
        pre: [fetchArticle],
        validate: inputValidations.ArticleFavoritePayloadValidations,
        response: outputValidations.ArticleFavoriteOutputValidationsConfig
      },
      handler: handlers.unfavoriteArticle
    },
    // GET /api/articles/{slug}/comments
    {
      method: 'GET',
      path: '/articles/{slug}/comments',
      config: {
        description: 'List all comment of an article',
        tags: ['api', 'articles', 'comments'],
        auth: { mode: 'try', strategy: 'jwt' },
        pre: [fetchArticle],
        validate: inputValidations.ArticleParamsValidations,
        response: outputValidations.ListCommentOutputValidationsConfig
      },
      handler: handlers.getComments
    },
    // POST /api/articles/{slug}/comments
    {
      method: 'POST',
      path: '/articles/{slug}/comments',
      config: {
        description: 'Add a comment to an article',
        tags: ['api', 'articles', 'comments'],
        auth: 'jwt',
        pre: [fetchArticle],
        validate: inputValidations.CommentCreatePayloadValidations,
        response: outputValidations.CommentOnPostOutputValidationsConfig
      },
      handler: handlers.addComment
    },
    // DELETE /api/articles/{slug}/comments/{commentId}
    {
      method: 'DELETE',
      path: '/articles/{slug}/comments/{commentId}',
      config: {
        description: 'Delete a comment',
        tags: ['api', 'articles', 'comments'],
        auth: 'jwt',
        pre: [fetchArticle, fetchComment, authorizeComment],
        validate: inputValidations.CommentDeletePayloadValidations,
        response: outputValidations.CommentOnDeleteOutputValidationsConfig
      },
      handler: handlers.deleteComment
    }
  ]
}
