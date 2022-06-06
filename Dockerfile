FROM klyntar/all_in_one@sha256:dff001a9cd3da6328c504b52ed8a5748c47d23219feae220930dac1c1981cfe7

#Move to own location
WORKDIR /root/Apollo

COPY package*.json ./
COPY . .

RUN pnpm run build

ENV NODE_ENV production