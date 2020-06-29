defmodule Cuttlefish.Auth.Player do
  use Ecto.Schema
  import Ecto.Changeset
  alias Cuttlefish.Game.Contender
  alias Cuttlefish.Game.Match

  schema "players" do
    field :username, :string
    field :question, :string
    field :secret, :string
    has_many :contenders, Contender
    many_to_many :matches, Match, join_through: "contenders",
                                  on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:username, :question, :secret])
    |> validate_required([:username])
  end
end
