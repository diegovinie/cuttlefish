defmodule Cuttlefish.Game.Match do
  use Ecto.Schema
  import Ecto.Changeset
  alias Cuttlefish.Game.Contender

  schema "matches" do
    field :avg, :decimal
    field :name, :string
    field :sd, :decimal
    field :status_id, :integer
    has_many :contenders, Contender

    timestamps()
  end

  @doc false
  def changeset(match, attrs) do
    match
    |> cast(attrs, [:name, :avg, :sd, :status_id])
    |> validate_required([:name])
  end
end
