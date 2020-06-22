defmodule Cuttlefish.AuthTest do
  use Cuttlefish.DataCase

  alias Cuttlefish.Auth

  describe "players" do
    alias Cuttlefish.Auth.Player

    @valid_attrs %{nickname: "some nickname", question: "some question", secret: "some secret"}
    @update_attrs %{nickname: "some updated nickname", question: "some updated question", secret: "some updated secret"}
    @invalid_attrs %{nickname: nil, question: nil, secret: nil}

    def player_fixture(attrs \\ %{}) do
      {:ok, player} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_player()

      player
    end

    test "list_players/0 returns all players" do
      player = player_fixture()
      assert Auth.list_players() == [player]
    end

    test "get_player!/1 returns the player with given id" do
      player = player_fixture()
      assert Auth.get_player!(player.id) == player
    end

    test "create_player/1 with valid data creates a player" do
      assert {:ok, %Player{} = player} = Auth.create_player(@valid_attrs)
      assert player.nickname == "some nickname"
      assert player.question == "some question"
      assert player.secret == "some secret"
    end

    test "create_player/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_player(@invalid_attrs)
    end

    test "update_player/2 with valid data updates the player" do
      player = player_fixture()
      assert {:ok, %Player{} = player} = Auth.update_player(player, @update_attrs)
      assert player.nickname == "some updated nickname"
      assert player.question == "some updated question"
      assert player.secret == "some updated secret"
    end

    test "update_player/2 with invalid data returns error changeset" do
      player = player_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_player(player, @invalid_attrs)
      assert player == Auth.get_player!(player.id)
    end

    test "delete_player/1 deletes the player" do
      player = player_fixture()
      assert {:ok, %Player{}} = Auth.delete_player(player)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_player!(player.id) end
    end

    test "change_player/1 returns a player changeset" do
      player = player_fixture()
      assert %Ecto.Changeset{} = Auth.change_player(player)
    end
  end
end
