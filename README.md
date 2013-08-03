SassBin
=======

It's a tiny web app that lets you quickly type some SASS/SCSS and immediately see the compiled CSS. If you add a pinch of HTML/HAML, it will be automatically rendered.

There are a lot of similar fiddle sites, and some of them do support SASS. What makes SassBin unique is that it supports multiple compass exensions (listed in the [Gemfile](https://github.com/lolmaus/sassbin/blob/0.2.x/Gemfile)).

If you would like any other Compass extension supported, please open a ticket and i will gladly add an extension.

The bits of HAML/HTML and SASS/SCSS code are saved to and loaded from [GitHub Gist](https://gist.github.com/).



Code
----

The code is very ugly, it was actually just a guinea pig for me to go in for Sinatra and jQuery and i didn’t mean it to be an engine for public use. Yet, you can start your own SassBin instance in seconds.

Consider this to be a functional prototype.

SassBin uses [Sinatra](http://www.sinatrarb.com/), [Sinatra-Assetpack](http://ricostacruz.com/sinatra-assetpack/), [SASS](http://sass-lang.com/), [Compass](http://compass-style.org/), [HAML](http://haml.info/), [jQuery](http://jquery.com/), [jQuery UI](http://jqueryui.com/), [ACE](http://ace.ajax.org), [clientside-haml-js](https://github.com/uglyog/clientside-haml-js), [jquery.ga.js](https://github.com/yckart/jquery.ga.js).


Running your own instance
-------------------------

Couldn't be simplier:

    git clone git@github.com:lolmaus/sassbin.git
    cd sassbin
    bundle install
    rackup

Tested on Windows and Ubuntu Linux.
    
You can use Thin and Nginx in production. Here are config file examples, adjust as necessary:

### sassbin_thin_config.yml

    ---
        environment: production
        chdir: /opt/sassbin
        address: 127.0.0.1
        user: www-data
        group: www-data
        port: 3000
        pid: /opt/sassbin/thin.pid
        rackup: /opt/sassbin/config.ru
        log: /opt/sassbin/thin.log
        servers: 2
        max_conns: 1024
        timeout: 30
        max_persistent_conns: 512
        daemonize: true
        
Use `thin start -C sassbin_thin_config.yml` to start thin manually or set it up to run as a daemon.


### sassbin_nginx_config.conf:

    upstream sassbin_thin {
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
    }
    
    server {
        listen   80;
        server_name  www.sassbin.com;
        rewrite ^/(.*) http://sassbin.com/$1 permanent;
    }
    
    
    server {
        listen   80;
        server_name sassbin.com;
    
        access_log /var/log/nginx/sassbin.com-access.log;
        error_log /var/log/nginx/sassbin.com.log;
    
        root   /opt/sassbin/app/;
    
        location / {
            proxy_pass http://sassbin_thin;
        }
    }


Credit
------

© 2013 Andrey Mikhaylov aka lolmaus.

Inspired by [SassMeister](http://sassmeister.com). Some witty Ruby code was borrowed from it.

Licensed with [MIT License](http://opensource.org/licenses/MIT).
