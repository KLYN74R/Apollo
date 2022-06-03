FROM klyntar/all_in_one@sha256:cef57179678b7aef8e8eb4f7acf85551cc18c65f21e99fbc4fd375311f049834

#Move to own location
WORKDIR /root/Apollo

COPY package*.json ./
COPY . .

RUN pnpm run build

ENV NODE_ENV production

EXPOSE 9999