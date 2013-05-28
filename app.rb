$:.unshift File.expand_path('../../../lib', __FILE__)

require 'bundler/setup'
require 'sinatra/base'
require 'sinatra/reloader' #if ( (ENV['RACK_ENV'] != :development) or (ENV['RACK_ENV'] != nil) )
require 'sinatra/assetpack'
require 'compass'
require 'sinatra/support'

# Compass extensions

require 'blend-mode'
require 'bourbon-compass'
require 'breakpoint'
require 'breakpoint-slicer'
require 'color-schemer'
require 'css-slideshow'
require 'fancy-buttons'
require 'fittext'
require 'harsh'
require 'modular-scale'
require 'neat-compass'
require 'rwdcalc'
require 'responsive-sass'
require 'salsa'
require 'sassy-buttons'
require 'sassy-text-shadow'
require 'singularitygs'
require 'stipe'
require 'susy'
require 'toolkit'
require 'zen-grids'


Encoding.default_external = 'utf-8'  if defined?(::Encoding)

class SassLogger < Sass::Logger::Base

  attr_reader :messages

  @messages = ''

  def _log(level, message)
    @messages << "/*\n #{message.lines.first} */\n"
  end

  def clean!
    @messages = ''
  end
end

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

  # Overriding Sass logger
  Sass.logger = SassLogger.new
  Sass.logger.log_level = :warn

  ["/", "/gist/:gist", "/gist/:gist/"].each do |path|
    get path do
      haml :main
    end
  end

  post '/compile-sass' do
    sass_code = params[:sass_code]
    sass_flavor = params[:sass_flavor]
    css_flavor = ['compressed', 'compact', 'nested', 'expanded'].include?(params[:css_flavor]) ? params[:css_flavor].to_sym : :nested

    Sass.logger.clean!

    begin
      if sass_flavor == 'sass'
        output = sass(sass_code.chomp, {style: css_flavor, cache: false})
      else
        output = scss(sass_code.chomp, {style: css_flavor, cache: false})
      end

      Sass.logger.messages << output
    rescue Sass::SyntaxError => e
      status 200
      e.to_s.lines.first
    end if sass_code
  end
end

if __FILE__ == $0
  App.run!
end
