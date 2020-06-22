defmodule CuttlefishWeb.PlayerController do
  use CuttlefishWeb, :controller

  alias Cuttlefish.Auth
  alias Cuttlefish.Auth.Player

  action_fallback CuttlefishWeb.FallbackController

  def index(conn, _params) do
    players = Auth.list_players()
    render(conn, "index.json", players: players)
  end

  def create(conn, %{"player" => player_params}) do
    with {:ok, %Player{} = player} <- Auth.create_player(player_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.player_path(conn, :show, player))
      |> render("show.json", player: player)
    end
  end

  def show(conn, %{"id" => id}) do
    player = Auth.get_player!(id)
    render(conn, "show.json", player: player)
  end

  def update(conn, %{"id" => id, "player" => player_params}) do
    player = Auth.get_player!(id)

    with {:ok, %Player{} = player} <- Auth.update_player(player, player_params) do
      render(conn, "show.json", player: player)
    end
  end

  def delete(conn, %{"id" => id}) do
    player = Auth.get_player!(id)

    with {:ok, %Player{}} <- Auth.delete_player(player) do
      send_resp(conn, :no_content, "")
    end
  end
end
