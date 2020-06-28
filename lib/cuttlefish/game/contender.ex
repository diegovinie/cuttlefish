defmodule Cuttlefish.Game.Contender do
  use Ecto.Schema
  import Ecto.Changeset

  schema "contenders" do
    field :value, :integer
    field :player_id, :id
    field :match_id, :id

    timestamps()
  end

  @doc false
  def changeset(contender, attrs) do
    contender
    |> cast(attrs, [:value])
    |> validate_required([:value])
  end
end
