defmodule Cuttlefish.Repo.Migrations.CreateMatches do
  use Ecto.Migration

  def change do
    create table(:matches) do
      add :name, :string
      add :avg, :decimal
      add :sd, :decimal
      add :status, :string
      add :cardset_id, references(:cardsets, on_delete: :nothing), null: true

      timestamps()
    end

    create index(:matches, [:cardset_id])
  end
end
