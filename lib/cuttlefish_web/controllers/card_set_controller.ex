defmodule CuttlefishWeb.CardSetController do
  use CuttlefishWeb, :controller

  alias Cuttlefish.Game
  alias Cuttlefish.Game.CardSet

  action_fallback CuttlefishWeb.FallbackController

  def index(conn, _params) do
    cardsets = Game.list_cardsets()
    render(conn, "index.json", cardsets: cardsets)
  end

  def create(conn, %{"card_set" => card_set_params}) do
    with {:ok, %CardSet{} = card_set} <- Game.create_card_set(card_set_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.card_set_path(conn, :show, card_set))
      |> render("show.json", card_set: card_set)
    end
  end

  def show(conn, %{"id" => id}) do
    card_set = Game.get_card_set!(id)
    render(conn, "show.json", card_set: card_set)
  end

  def update(conn, %{"id" => id, "card_set" => card_set_params}) do
    card_set = Game.get_card_set!(id)

    with {:ok, %CardSet{} = card_set} <- Game.update_card_set(card_set, card_set_params) do
      render(conn, "show.json", card_set: card_set)
    end
  end

  def delete(conn, %{"id" => id}) do
    card_set = Game.get_card_set!(id)

    with {:ok, %CardSet{}} <- Game.delete_card_set(card_set) do
      send_resp(conn, :no_content, "")
    end
  end
end
