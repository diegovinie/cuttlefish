defmodule Cuttlefish.Repo.Migrations.CreateCardsets do
  use Ecto.Migration

  def change do
    create table(:cardsets) do
      add :name, :string
      add :content, {:array, :integer}
      add :notes, :string

      timestamps()
    end

  end
end
