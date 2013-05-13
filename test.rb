require 'bundler/setup'

require 'compass' #must be loaded before sinatra
require 'sinatra'
require 'haml'    #must be loaded after sinatra

set :environment, :development
require 'sinatra/reloader' if development?

require 'github_api'
require 'yaml'

require 'breakpoint-slicer'


# set sinatra's variables
set :app_file, __FILE__
set :root, File.dirname(__FILE__)
set :views, "views"
set :public_dir, 'static'

configure do
  Compass.add_project_configuration(File.join(Sinatra::Application.root, 'config', 'compass.config'))
end

Compass.sass_engine_options[:load_paths].each do |path|
  Sass.load_paths << path
end

helpers do
  def github(auth_token = '')
    gh_config = YAML.load_file("github.yml")

    github = Github.new do |config|
      config.client_id = gh_config['client_id']
      config.client_secret = gh_config['client_secret']
      config.oauth_token = auth_token
    end
  end
end

before do
  @github = github(session[:github_token])
  @gist_input = ''
end

# compiling CSS files
get '/css/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass(:"sass/#{params[:name]}", Compass.sass_engine_options )
end


get '/' do
  haml :index
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


#get '/gist/:bla' do
#  puts "YAY:"
#  files = @github.gists.get(params[:bla]).files
#  files["#{files.keys.grep(/.+\.(html|htm)/)[0]}"].content
#end