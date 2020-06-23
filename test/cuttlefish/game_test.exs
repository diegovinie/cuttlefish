defmodule Cuttlefish.GameTest do
  use Cuttlefish.DataCase

  alias Cuttlefish.Game

  describe "cardsets" do
    alias Cuttlefish.Game.CardSet

    @valid_attrs %{content: "some content", name: "some name", notes: "some notes"}
    @update_attrs %{content: "some updated content", name: "some updated name", notes: "some updated notes"}
    @invalid_attrs %{content: nil, name: nil, notes: nil}

    def card_set_fixture(attrs \\ %{}) do
      {:ok, card_set} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Game.create_card_set()

      card_set
    end

    test "list_cardsets/0 returns all cardsets" do
      card_set = card_set_fixture()
      assert Game.list_cardsets() == [card_set]
    end

    test "get_card_set!/1 returns the card_set with given id" do
      card_set = card_set_fixture()
      assert Game.get_card_set!(card_set.id) == card_set
    end

    test "create_card_set/1 with valid data creates a card_set" do
      assert {:ok, %CardSet{} = card_set} = Game.create_card_set(@valid_attrs)
      assert card_set.content == "some content"
      assert card_set.name == "some name"
      assert card_set.notes == "some notes"
    end

    test "create_card_set/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Game.create_card_set(@invalid_attrs)
    end

    test "update_card_set/2 with valid data updates the card_set" do
      card_set = card_set_fixture()
      assert {:ok, %CardSet{} = card_set} = Game.update_card_set(card_set, @update_attrs)
      assert card_set.content == "some updated content"
      assert card_set.name == "some updated name"
      assert card_set.notes == "some updated notes"
    end

    test "update_card_set/2 with invalid data returns error changeset" do
      card_set = card_set_fixture()
      assert {:error, %Ecto.Changeset{}} = Game.update_card_set(card_set, @invalid_attrs)
      assert card_set == Game.get_card_set!(card_set.id)
    end

    test "delete_card_set/1 deletes the card_set" do
      card_set = card_set_fixture()
      assert {:ok, %CardSet{}} = Game.delete_card_set(card_set)
      assert_raise Ecto.NoResultsError, fn -> Game.get_card_set!(card_set.id) end
    end

    test "change_card_set/1 returns a card_set changeset" do
      card_set = card_set_fixture()
      assert %Ecto.Changeset{} = Game.change_card_set(card_set)
    end
  end
end
