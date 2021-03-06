defmodule CuttlefishWeb.CardSetControllerTest do
  use CuttlefishWeb.ConnCase

  alias Cuttlefish.Game
  alias Cuttlefish.Game.CardSet

  @create_attrs %{
    content: "some content",
    name: "some name",
    notes: "some notes"
  }
  @update_attrs %{
    content: "some updated content",
    name: "some updated name",
    notes: "some updated notes"
  }
  @invalid_attrs %{content: nil, name: nil, notes: nil}

  def fixture(:card_set) do
    {:ok, card_set} = Game.create_card_set(@create_attrs)
    card_set
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all cardsets", %{conn: conn} do
      conn = get(conn, Routes.card_set_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create card_set" do
    test "renders card_set when data is valid", %{conn: conn} do
      conn = post(conn, Routes.card_set_path(conn, :create), card_set: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.card_set_path(conn, :show, id))

      assert %{
               "id" => id,
               "content" => "some content",
               "name" => "some name",
               "notes" => "some notes"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.card_set_path(conn, :create), card_set: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update card_set" do
    setup [:create_card_set]

    test "renders card_set when data is valid", %{conn: conn, card_set: %CardSet{id: id} = card_set} do
      conn = put(conn, Routes.card_set_path(conn, :update, card_set), card_set: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.card_set_path(conn, :show, id))

      assert %{
               "id" => id,
               "content" => "some updated content",
               "name" => "some updated name",
               "notes" => "some updated notes"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, card_set: card_set} do
      conn = put(conn, Routes.card_set_path(conn, :update, card_set), card_set: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete card_set" do
    setup [:create_card_set]

    test "deletes chosen card_set", %{conn: conn, card_set: card_set} do
      conn = delete(conn, Routes.card_set_path(conn, :delete, card_set))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.card_set_path(conn, :show, card_set))
      end
    end
  end

  defp create_card_set(_) do
    card_set = fixture(:card_set)
    {:ok, card_set: card_set}
  end
end
