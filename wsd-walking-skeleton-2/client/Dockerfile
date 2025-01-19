FROM denoland/deno:alpine-2.0.2

WORKDIR /app

COPY package.json .
COPY *config.js .

RUN DENO_FUTURE=1 deno install

COPY . .

CMD [ "run", "dev", "--host"]