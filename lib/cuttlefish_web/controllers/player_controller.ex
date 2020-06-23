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
    with {:ok, %Player{} = player_params} <- Auth.create_player(player_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.player_path(conn, :show, player_params))
      |> render("show.json", player: player_params)
    end
  end

  def show(conn, %{"id" => id}) do
    player = Auth.get_player!(id)
    render(conn, "show.json", player: player)
  end

  def look_up(conn, %{"nickname" => nickname}) do
    player = Auth.search(nickname)
    render(conn, "show.json", player: player)
  end

  def update(conn, %{"id" => id, "player" => player_params}) do
    player = Auth.get_player!(id)

    case Auth.update_player(player, player_params) do
      {:ok, player} ->
        conn
        |> put_flash(:info, "Player updated successfully.")
        |> redirect(to: Routes.player_path(conn, :show, player))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", player: player, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    player = Auth.get_player!(id)
    {:ok, _player} = Auth.delete_player(player)

    conn
    |> put_flash(:info, "Player deleted successfully.")
    |> redirect(to: Routes.player_path(conn, :index))
  end
end
