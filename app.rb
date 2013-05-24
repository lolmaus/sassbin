$:.unshift File.expand_path('../../../lib', __FILE__)

require 'bundler/setup'
require 'sinatra/base'
require 'sinatra/reloader' #if ( (ENV['RACK_ENV'] != :development) or (ENV['RACK_ENV'] != nil) )
require 'sinatra/assetpack'
require 'compass'
require 'sinatra/support'


Encoding.default_external = 'utf-8'  if defined?(::Encoding)

class App < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  disable :show_exceptions
  enable  :raise_exceptions

  set :root, File.dirname(__FILE__)

  # This is a convenient way of setting up Compass in a Sinatra
  # project without mucking around with load paths and such.
  register Sinatra::CompassSupport

  # ### Compass sprite configuration
  # Skip this section if you don't need sprite images.
  #
  # Configure Compass so it knows where to look for sprites.  This tells
  # Compass to look for images in `app/images`, dump sprite images in the same
  # folder, and link to it with HTTP images path.
  #
  c = Compass.configuration
  c.project_path     = root
  c.images_dir       = "app/images"
  c.http_generated_images_path = "/images"

  # Asset Pack.
  register Sinatra::AssetPack
  assets do
    css :main,  ['/css/*.css']
    js :app,    ['/js/app/**/*.js', '/js/app/*.js']
    js :vendor, ['/js/vendor/*.js']
  end

  # Allowing vanilla SASS use Compass extensions
  Compass.sass_engine_options[:load_paths].each do |path|
    Sass.load_paths << path
  end

  ["/", "/gist/:gist", "/gist/:gist/"].each do |path|
    get path do
      haml :main
    end
  end

  post '/compile-sass' do
    sass_code = params[:sass_code]
    sass_flavor = params[:sass_flavor]
    css_flavor = ['compressed', 'compact', 'nested', 'expanded'].include?(params[:css_flavor]) ? params[:css_flavor].to_sym : :nested

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
end

if __FILE__ == $0
  App.run!
end
