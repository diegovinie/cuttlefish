defmodule Cuttlefish.Auth.Player do
  use Ecto.Schema
  import Ecto.Changeset
  alias Cuttlefish.Game.Contender

  schema "players" do
    field :username, :string
    field :question, :string
    field :secret, :string
    has_many :contenders, Contender

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:username, :question, :secret])
    |> validate_required([:username])
  end
end
