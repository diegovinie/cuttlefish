defmodule CuttlefishWeb.MatchController do
  use CuttlefishWeb, :controller

  alias Cuttlefish.Game
  alias Cuttlefish.Game.Match

  action_fallback CuttlefishWeb.FallbackController

  def index(conn, _params) do
    matches = Game.list_matches()
    render(conn, "index.json", matches: matches)
  end

  def create(conn, %{"match" => match_params}) do
    with {:ok, %Match{} = match} <- Game.create_match(match_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.match_path(conn, :show, match))
      |> render("show.json", match: match)
    end
  end

  def show(conn, %{"id" => id}) do
    match = Game.get_match!(id)
    render(conn, "show.json", match: match)
  end

  def update(conn, %{"id" => id, "match" => match_params}) do
    match = Game.get_match!(id)

    with {:ok, %Match{} = match} <- Game.update_match(match, match_params) do
      render(conn, "show.json", match: match)
    end
  end

  def delete(conn, %{"id" => id}) do
    match = Game.get_match!(id)

    with {:ok, %Match{}} <- Game.delete_match(match) do
      send_resp(conn, :no_content, "")
    end
  end
end
