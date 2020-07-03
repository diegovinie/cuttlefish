defmodule Cuttlefish.Game.Match do
  use Ecto.Schema
  import Ecto.Changeset
  alias Cuttlefish.Game.Contender
  alias Cuttlefish.Auth.Player

  schema "matches" do
    field :avg, :decimal
    field :name, :string
    field :sd, :decimal
    field :status, :string
    has_many :contenders, Contender
    many_to_many :players, Player, join_through: "contenders",
                                      on_replace: :delete
    field :cardset_id, :integer

    timestamps()
  end

  @doc false
  def changeset(match, attrs) do
    match
    |> cast(attrs, [:name, :avg, :sd, :status, :cardset_id])
    |> validate_required([:cardset_id])
  end
end
