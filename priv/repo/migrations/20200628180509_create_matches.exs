defmodule Cuttlefish.Repo.Migrations.CreateMatches do
  use Ecto.Migration

  def change do
    create table(:matches) do
      add :name, :string
      add :avg, :decimal
      add :sd, :decimal
      add :status, :string

      timestamps()
    end

  end
end
