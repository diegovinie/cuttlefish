defmodule Cuttlefish.Auth.Player do
  use Ecto.Schema
  import Ecto.Changeset

  schema "players" do
    field :nickname, :string
    field :question, :string
    field :secret, :string

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:nickname, :question, :secret])
    |> validate_required([:nickname])
  end
end
