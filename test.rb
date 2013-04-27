require 'bundler/setup'
require 'sinatra'
require 'sinatra/reloader' if development?
require 'sass'
require 'haml'

get '/' do
  haml :index
end

post '/result' do
  @html = params[:html]
  #@css =  params[:css]


  begin
    @css = sass(params[:css].chomp, {:style => :nested, :quiet => true})

  rescue Sass::SyntaxError => e
    status 200
    e.to_s
  end

  haml :result, layout: false
end