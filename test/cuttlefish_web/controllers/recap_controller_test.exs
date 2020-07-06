defmodule CuttlefishWeb.RecapControllerTest do
  use CuttlefishWeb.ConnCase

  alias Cuttlefish.Admin

  @create_attrs %{avg: "120.5", name: "some name", sd: "120.5", status: "some status"}
  @update_attrs %{avg: "456.7", name: "some updated name", sd: "456.7", status: "some updated status"}
  @invalid_attrs %{avg: nil, name: nil, sd: nil, status: nil}

  def fixture(:recap) do
    {:ok, recap} = Admin.create_recap(@create_attrs)
    recap
  end

  describe "index" do
    test "lists all matches", %{conn: conn} do
      conn = get(conn, Routes.recap_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Matches"
    end
  end

  describe "new recap" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.recap_path(conn, :new))
      assert html_response(conn, 200) =~ "New Recap"
    end
  end

  describe "create recap" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.recap_path(conn, :create), recap: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.recap_path(conn, :show, id)

      conn = get(conn, Routes.recap_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Recap"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.recap_path(conn, :create), recap: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Recap"
    end
  end

  describe "edit recap" do
    setup [:create_recap]

    test "renders form for editing chosen recap", %{conn: conn, recap: recap} do
      conn = get(conn, Routes.recap_path(conn, :edit, recap))
      assert html_response(conn, 200) =~ "Edit Recap"
    end
  end

  describe "update recap" do
    setup [:create_recap]

    test "redirects when data is valid", %{conn: conn, recap: recap} do
      conn = put(conn, Routes.recap_path(conn, :update, recap), recap: @update_attrs)
      assert redirected_to(conn) == Routes.recap_path(conn, :show, recap)

      conn = get(conn, Routes.recap_path(conn, :show, recap))
      assert html_response(conn, 200) =~ "some updated name"
    end

    test "renders errors when data is invalid", %{conn: conn, recap: recap} do
      conn = put(conn, Routes.recap_path(conn, :update, recap), recap: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Recap"
    end
  end

  describe "delete recap" do
    setup [:create_recap]

    test "deletes chosen recap", %{conn: conn, recap: recap} do
      conn = delete(conn, Routes.recap_path(conn, :delete, recap))
      assert redirected_to(conn) == Routes.recap_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.recap_path(conn, :show, recap))
      end
    end
  end

  defp create_recap(_) do
    recap = fixture(:recap)
    {:ok, recap: recap}
  end
end
