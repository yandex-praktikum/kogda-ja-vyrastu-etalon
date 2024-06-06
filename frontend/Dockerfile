FROM node:18.16.0-alpine3.17 AS builder
# Defaults to production, docker-compose overrides this to development on build and run.
ARG YARN_VERSION=1.22.19
ENV YARN_VERSION=${YARN_VERSION}
RUN npm i -g "yarn@$YARN_VERSION" --force
WORKDIR /var/www/app
RUN chown node:node ./
USER node
COPY package.json yarn.lock ./
# Устанавливаем зависимости
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build


FROM nginx:1.21.0-alpine as production
# Copy built assets from builder
COPY --from=builder /var/www/app/build /usr/share/nginx/html
# Add your nginx.conf
COPY ./etc/config/docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
