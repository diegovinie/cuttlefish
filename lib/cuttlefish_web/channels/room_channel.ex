defmodule CuttlefishWeb.RoomChannel do
  use Phoenix.Channel
  alias CuttlefishWeb.Presence
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
    broadcast!(socket, "card_picked", msg)
    {:noreply, socket}
  end

  def handle_in(status, msg, socket) when status in @valid_status do
    broadcast!(socket, status, msg)
    {:noreply, socket}
  end
end
