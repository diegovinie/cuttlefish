defmodule Cuttlefish.Repo.Migrations.CreatePlayers do
  use Ecto.Migration

  def change do
    create table(:players) do
      add :name, :string
      add :question, :string
      add :secret, :string

      timestamps()
    end

  end
end
