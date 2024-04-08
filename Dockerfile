FROM node:alpine

EXPOSE 2023

WORKDIR /app

COPY package.json /app

COPY yarn.lock /app

RUN yarn install

COPY . .

RUN addgroup \
        --gid 1001 \
        --system app && \
    adduser \
        --disabled-password \
        --gecos "" \
        --ingroup "app" \
        --no-create-home \
        --uid "1001" \
        --system \
        "app"

RUN chown -R app /app

USER app

ENTRYPOINT ["yarn"]
CMD ["start"]
