FROM node:12-alpine AS Builder
RUN mkdir -p /home/idanizhaki/app/node_modules /home/node/app/dist && chown -R node:node /home/node/app
WORKDIR /home/idanizhaki/app
COPY package*.json ./
USER idanizhaki
RUN npm install
COPY --chown=idanizhaki:idanizhaki . .
RUN npm run build


FROM ubuntu:18.04@sha256:fd25e706f3dea2a5ff705dbc3353cf37f08307798f3e360a13e9385840f73fb3

ENV NODE_ENV production
ARG USER=idanizhaki
ARG PW=testpass
ARG UID=1000

RUN useradd -m ${USER} --uid=${UID} && echo "${USER}:${PW}" | \chpasswd

COPY entrypoint.sh /home/idanizhaki
RUN chown idanizhaki /home/idanizhaki
RUN chmod +x /home/idanizhaki/entrypoint.sh


WORKDIR /home/idanizhaki/app
COPY ./dist /home/idanizhaki/app

RUN chown idanizhaki -R /home/idanizhaki
RUN chmod +x /home/idanizhaki/entrypoint.sh
RUN chown idanizhaki /bin

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_15.x
RUN apt-get install -y build-essential nodejs

USER ${USER}
EXPOSE 8080

ENTRYPOINT [ "/home/idanizhaki/entrypoint.sh" ]