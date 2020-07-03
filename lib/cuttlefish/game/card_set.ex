defmodule Cuttlefish.Game.CardSet do
  use Ecto.Schema
  import Ecto.Changeset
  alias Cuttlefish.Game.Match

  schema "cardsets" do
    field :content, {:array, :integer}
    field :name, :string
    field :notes, :string
    has_many :matches, Match, foreign_key: :cardset_id

    timestamps()
  end

  @doc false
  def changeset(card_set, attrs) do
    card_set
    |> cast(attrs, [:name, :content, :notes])
    |> validate_required([:name, :content])
  end
end
