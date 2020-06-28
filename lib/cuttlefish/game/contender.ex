defmodule Cuttlefish.Game.Contender do
  use Ecto.Schema
  import Ecto.Changeset
  alias Cuttlefish.Game.Match
  alias Cuttlefish.Auth.Player

  schema "contenders" do
    field :value, :integer
    belongs_to :player, Player
    belongs_to :match, Match

    timestamps()
  end

  @doc false
  def changeset(contender, attrs) do
    contender
    |> cast(attrs, [:value, :player_id, :match_id])
    |> validate_required([])
  end
end
