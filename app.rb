require 'sinatra'
require 'sinatra/activerecord'

set :database, 'sqlite3:app.sqlite3'
set :sessions, true

require './Models'


before do
  @current_user= User.find(session[:user_id]) if session[:user_id]

end

get '/home' do
  erb :home

end

get '/' do
  erb :index
end

post '/' do
  User.create(username: params[:username],password: params[:password])
  user = User.where(username: params[:username]).first
  session[:user_id] = user.id
  redirect '/home'

end

post '/signin' do
  @user = User.where(username: params[:username]).first
      if @user.password == params[:password]
        session[:user_id] = @user.id
        redirect '/home'
      else
        redirect '/'
      end
end

post '/logout' do
  session[:user_id] = nil
end

post '/business' do

  Business.create(name: params[:name],image_url: params[:image_url], city: params[:city])

  Favorite.create(user_id: @current_user.id, business_id: Business.last.id )

  redirect '/home'

end

get '/favorites' do
    @myFavorites = @current_user.businesses

    @myFavorites.to_json
end
