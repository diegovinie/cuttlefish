defmodule CuttlefishWeb.RoomChannel do
  use Phoenix.Channel
  alias CuttlefishWeb.Presence
  alias Cuttlefish.Game
  alias Cuttlefish.Auth

  @valid_status ["game_started", "game_ended", "game_restarted"]

  def join("room:lobby", _message, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def join("room:game", _message, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, socket) do
    {:error, %{error: "unauthorized"}}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.username, %{
      online_at: inspect(System.system_time(:second))
    })

    push(socket, "presence_state", Presence.list(socket))
    {:noreply, socket}
  end

  def handle_in("new_msg", msg, socket) do
    broadcast!(socket, "new_msg", msg)
    {:noreply, socket}
  end

  def handle_in("card_picked", msg, socket) do
    %{"match_id" => match_id, "username" => username, "value" => value} = msg

    player = Auth.search(username)
    match = Game.get_match!(match_id)

    %{value: value}
    |> (fn attrs -> Ecto.build_assoc(player, :contenders, attrs) end).()
    |> (fn attrs -> Ecto.build_assoc(match, :contenders, attrs) end).()
    |> Cuttlefish.Repo.insert

    broadcast!(socket, "card_picked", msg)

    {:noreply, socket}
  end

  def handle_in(status, msg, socket) when status in @valid_status do
    case status == "game_started" do
      true ->
        {:ok, match} = Game.create_match(%{name: "testing"})
        broadcast!(socket, status, Map.put(msg, "match_id", match.id))

      false -> broadcast!(socket, status, msg)
    end

    {:noreply, socket}
  end
end
