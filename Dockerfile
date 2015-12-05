FROM alpine:3.2

MAINTAINER Simon Berman <spb@siberman.com>

ADD . /data/http

VOLUME ['/data/http/']

CMD ["echo", "creating ciinabox data container"]
