FROM node:latest

EXPOSE 3000

WORKDIR /app
ADD package.json /app
RUN yarn

ADD . /app

RUN mkdir build

ENTRYPOINT ["yarn"]
CMD ["start"]
