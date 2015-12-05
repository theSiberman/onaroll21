FROM alpine:3.2
MAINTAINER Simon Berman <spb@siberman.com>
RUN apk --update add git && mkdir -p /data/http && rm -rf /var/cache/apk/*
RUN cd /data/http && git clone https://github.com/RHoKAustralia/onaroll21.git .
VOLUME ["/data/http"]
CMD ["true"]