defmodule Cuttlefish.Login.Player do
  use Ecto.Schema
  import Ecto.Changeset

  schema "players" do
    field :username, :string
    field :question, :string
    field :secret, :string

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:username, :question, :secret])
    |> validate_required([:username])
  end
end
