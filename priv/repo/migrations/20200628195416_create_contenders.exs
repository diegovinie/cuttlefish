defmodule Cuttlefish.Repo.Migrations.CreateContenders do
  use Ecto.Migration

  def change do
    create table(:contenders) do
      add :value, :integer
      add :player_id, references(:players, on_delete: :delete_all), null: false
      add :match_id, references(:matches, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:contenders, [:player_id])
    create index(:contenders, [:match_id])
  end
end
