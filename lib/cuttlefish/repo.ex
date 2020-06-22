defmodule Cuttlefish.Repo do
  use Ecto.Repo,
    otp_app: :cuttlefish,
    adapter: Ecto.Adapters.Postgres
end
