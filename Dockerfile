FROM node@sha256:2ae9624a39ce437e7f58931a5747fdc60224c6e40f8980db90728de58e22af7c
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm ci --only=production
USER node
CMD "npm" "start"