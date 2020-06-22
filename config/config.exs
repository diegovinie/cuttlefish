# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :cuttlefish,
  ecto_repos: [Cuttlefish.Repo]

# Configures the endpoint
config :cuttlefish, CuttlefishWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "huDbOyz29I50/r5scShA0Z59by8iAy/1ZaOmZpgllTGxijUN4AOEiMHev2IOm74C",
  render_errors: [view: CuttlefishWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Cuttlefish.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
