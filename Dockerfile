FROM nginx:1.29-alpine

ENV PORT=8080

COPY default.conf.template /etc/nginx/templates/default.conf.template
