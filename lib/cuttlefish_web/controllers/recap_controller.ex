defmodule CuttlefishWeb.RecapController do
  use CuttlefishWeb, :controller

  alias Cuttlefish.Admin
  alias Cuttlefish.Game.Match, as: Recap

  def index(conn, _params) do
    matches = Admin.list_matches()
    render(conn, "index.html", matches: matches)
  end

  def new(conn, _params) do
    changeset = Admin.change_recap(%Recap{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"recap" => recap_params}) do
    case Admin.create_recap(recap_params) do
      {:ok, recap} ->
        conn
        |> put_flash(:info, "Recap created successfully.")
        |> redirect(to: Routes.recap_path(conn, :show, recap))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    recap = Admin.get_recap!(id)
    render(conn, "show.html", recap: recap)
  end

  def edit(conn, %{"id" => id}) do
    recap = Admin.get_recap!(id)
    changeset = Admin.change_recap(recap)
    render(conn, "edit.html", recap: recap, changeset: changeset)
  end

  def update(conn, %{"id" => id, "recap" => recap_params}) do
    recap = Admin.get_recap!(id)

    case Admin.update_recap(recap, recap_params) do
      {:ok, recap} ->
        conn
        |> put_flash(:info, "Recap updated successfully.")
        |> redirect(to: Routes.recap_path(conn, :show, recap))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", recap: recap, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    recap = Admin.get_recap!(id)
    {:ok, _recap} = Admin.delete_recap(recap)

    conn
    |> put_flash(:info, "Recap deleted successfully.")
    |> redirect(to: Routes.recap_path(conn, :index))
  end
end
