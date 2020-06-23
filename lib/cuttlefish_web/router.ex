defmodule CuttlefishWeb.Router do
  use CuttlefishWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CuttlefishWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", CuttlefishWeb do
    pipe_through :api

    get "players/search", PlayerController, :look_up
    resources "/players", PlayerController

    resources "/cardsets", CardSetController
  end
end
