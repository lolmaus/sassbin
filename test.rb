require 'bundler/setup'
require 'sinatra'
require 'haml'

get '/' do
  haml :index
end

post '/result' do
  @html = params[:html]
  @css =  params[:css]
  haml :result, layout: false
end