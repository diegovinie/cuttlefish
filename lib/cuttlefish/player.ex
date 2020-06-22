defmodule Cuttlefish.Player do
  use Ecto.Schema
  import Ecto.Changeset

  schema "players" do
    field :name, :string
    field :question, :string
    field :secret, :string

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:name, :question, :secret])
    |> validate_required([:name, :question, :secret])
  end
end
