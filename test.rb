require 'bundler/setup'
require 'sinatra'

set :environment, :development
require 'sinatra/reloader' if development?
require 'sass'
require 'haml'

require 'compass'
require 'breakpoint-slicer'


Compass.sass_engine_options[:load_paths].each do |path|
  Sass.load_paths << path
end



get '/' do
  haml :index
end


get '/ajax' do
  haml :ajax
end


post '/result' do

  @html = params[:html]
  @css =  params[:css]

  haml :result

end


post '/compile-sass' do
  sass = params[:sass]

  begin
    sass(sass.chomp, {:style => :nested, :quiet => true})
  rescue Sass::SyntaxError => e
    status 200
    e.to_s
  end if sass
end