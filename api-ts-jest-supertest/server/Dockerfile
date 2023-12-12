FROM node:20.9.0

ADD package.json /tmp/package.json

ADD yarn.lock /tmp/yarn.lock

RUN \rm -f build

RUN cd /tmp && yarn install

ADD ./ /src

RUN \rm -f node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN yarn build

CMD ["node","build/src/app.js"]