defmodule Cuttlefish.Game.CardSet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "cardsets" do
    field :content, {:array, :integer}
    field :name, :string
    field :notes, :string

    timestamps()
  end

  @doc false
  def changeset(card_set, attrs) do
    card_set
    |> cast(attrs, [:name, :content, :notes])
    |> validate_required([:name, :content])
  end
end
