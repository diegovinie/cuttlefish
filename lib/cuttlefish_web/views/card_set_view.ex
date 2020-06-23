defmodule CuttlefishWeb.CardSetView do
  use CuttlefishWeb, :view
  alias CuttlefishWeb.CardSetView

  def render("index.json", %{cardsets: cardsets}) do
    %{data: render_many(cardsets, CardSetView, "card_set.json")}
  end

  def render("show.json", %{card_set: card_set}) do
    %{data: render_one(card_set, CardSetView, "card_set.json")}
  end

  def render("card_set.json", %{card_set: card_set}) do
    %{id: card_set.id,
      name: card_set.name,
      content: card_set.content,
      notes: card_set.notes}
  end
end
