defmodule Cuttlefish.AdminTest do
  use Cuttlefish.DataCase

  alias Cuttlefish.Admin

  describe "matches" do
    alias Cuttlefish.Admin.Recap

    @valid_attrs %{avg: "120.5", name: "some name", sd: "120.5", status: "some status"}
    @update_attrs %{avg: "456.7", name: "some updated name", sd: "456.7", status: "some updated status"}
    @invalid_attrs %{avg: nil, name: nil, sd: nil, status: nil}

    def recap_fixture(attrs \\ %{}) do
      {:ok, recap} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Admin.create_recap()

      recap
    end

    test "list_matches/0 returns all matches" do
      recap = recap_fixture()
      assert Admin.list_matches() == [recap]
    end

    test "get_recap!/1 returns the recap with given id" do
      recap = recap_fixture()
      assert Admin.get_recap!(recap.id) == recap
    end

    test "create_recap/1 with valid data creates a recap" do
      assert {:ok, %Recap{} = recap} = Admin.create_recap(@valid_attrs)
      assert recap.avg == Decimal.new("120.5")
      assert recap.name == "some name"
      assert recap.sd == Decimal.new("120.5")
      assert recap.status == "some status"
    end

    test "create_recap/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Admin.create_recap(@invalid_attrs)
    end

    test "update_recap/2 with valid data updates the recap" do
      recap = recap_fixture()
      assert {:ok, %Recap{} = recap} = Admin.update_recap(recap, @update_attrs)
      assert recap.avg == Decimal.new("456.7")
      assert recap.name == "some updated name"
      assert recap.sd == Decimal.new("456.7")
      assert recap.status == "some updated status"
    end

    test "update_recap/2 with invalid data returns error changeset" do
      recap = recap_fixture()
      assert {:error, %Ecto.Changeset{}} = Admin.update_recap(recap, @invalid_attrs)
      assert recap == Admin.get_recap!(recap.id)
    end

    test "delete_recap/1 deletes the recap" do
      recap = recap_fixture()
      assert {:ok, %Recap{}} = Admin.delete_recap(recap)
      assert_raise Ecto.NoResultsError, fn -> Admin.get_recap!(recap.id) end
    end

    test "change_recap/1 returns a recap changeset" do
      recap = recap_fixture()
      assert %Ecto.Changeset{} = Admin.change_recap(recap)
    end
  end
end
