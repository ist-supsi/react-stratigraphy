# syntax=docker/dockerfile:1

FROM node:16.13.1-alpine3.14 as build-stage

WORKDIR /workspace/orders/web-orders
COPY ./ /workspace/
RUN npm install
RUN npm run build

FROM nginx:1.17.9-alpine
COPY --from=build-stage \
    /workspace/orders/web-orders/build/ /usr/share/nginx/html

COPY --from=build-stage \
    /workspace/orders/web-orders/default.conf \
    /etc/nginx/conf.d/default.conf

EXPOSE 80

# FIRST BUILD MANUALLY THE APP !! (SEE README FILE)
# FROM nginx:1.17.9-alpine
# COPY ./build/ /usr/share/nginx/html
# COPY default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80