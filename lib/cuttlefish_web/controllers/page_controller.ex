defmodule CuttlefishWeb.PageController do
  use CuttlefishWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
