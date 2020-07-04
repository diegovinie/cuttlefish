# second version

FROM bitwalker/alpine-elixir-phoenix:latest

EXPOSE 4000
EXPOSE 80
RUN apk add postgresql-client


RUN mkdir /app
COPY . /app
WORKDIR /app

RUN mix do deps.get, deps.compile

RUN cd assets && npm install

CMD ["/app/entrypoint.sh"]
