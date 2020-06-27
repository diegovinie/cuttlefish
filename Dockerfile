# first version

FROM elixir:latest
RUN apt-get update && \
  apt-get install -y postgresql-client npm inotify-tools

RUN mkdir /app
COPY . /app
WORKDIR /app

  
# Install hex manager
RUN mix local.hex --force

RUN mix deps.get --force
RUN mix local.rebar --force

# Compile
RUN mix do compile

RUN cd assets && npm install
RUN cd assets && npm run deploy

# RUN chmod +x entrypoint.sh

CMD ["/app/entrypoint.sh"]
