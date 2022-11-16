import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/moments', 'MomentsController').apiOnly();
  Route.resource('/comments', 'CommentsController').apiOnly();
}).prefix('/api')
