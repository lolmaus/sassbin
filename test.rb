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

# compiling internal SASS to CSS
get '/css/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass(:"sass/#{params[:name]}", Compass.sass_engine_options )
end


get '/' do
  haml :index
end


post '/compile-sass' do
  sass_code = params[:sass_code]
  sass_flavor = params[:sass_flavor]
  css_flavor = ['compressed', 'compact', 'nested', 'expanded'].include?(params[:css_flavor]) ? params[:css_flavor].to_sym : :nested
  puts params[:css_flavor]

  begin
    if sass_flavor == 'sass'
      sass(sass_code.chomp, {style: css_flavor, quiet: true, cache: false})
    else
      scss(sass_code.chomp, {style: css_flavor, quiet: true, cache: false})
    end

  rescue Sass::SyntaxError => e
    status 200
    e.to_s
  end if sass_code
end


get '/gist/:gist_id' do
  begin
    files = @github.gists.get(params[:gist_id]).files

    html_file = files["#{files.keys.grep(/.+\.(html|htm)/)[0]}"]
    @html = html_file.content if html_file

    sass_file = files["#{files.keys.grep(/.+\.(sass|scss|css)/)[0]}"]
    if sass_file
      @sass = sass_file.content
      @sass_flavor = File.extname(sass_file.filename)[1..-1] == 'sass' ? 'sass' : 'scss'
    end
  rescue
    status 200

    @html = "<i>Gist #{params[:gist_id]} was not found. :(</i>"
  end

  haml :index
end