defmodule Cuttlefish.Admin do
  @moduledoc """
  The Admin context.
  """

  import Ecto.Query, warn: false
  alias Cuttlefish.Repo

  alias Cuttlefish.Game.Match, as: Recap

  @doc """
  Returns the list of matches.

  ## Examples

      iex> list_matches()
      [%Recap{}, ...]

  """
  def list_matches do
    Repo.all(Recap)
  end

  @doc """
  Gets a single recap.

  Raises `Ecto.NoResultsError` if the Recap does not exist.

  ## Examples

      iex> get_recap!(123)
      %Recap{}

      iex> get_recap!(456)
      ** (Ecto.NoResultsError)

  """
  def get_recap!(id), do: Repo.get!(Recap, id)

  @doc """
  Creates a recap.

  ## Examples

      iex> create_recap(%{field: value})
      {:ok, %Recap{}}

      iex> create_recap(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_recap(attrs \\ %{}) do
    %Recap{}
    |> Recap.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a recap.

  ## Examples

      iex> update_recap(recap, %{field: new_value})
      {:ok, %Recap{}}

      iex> update_recap(recap, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_recap(%Recap{} = recap, attrs) do
    recap
    |> Recap.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a recap.

  ## Examples

      iex> delete_recap(recap)
      {:ok, %Recap{}}

      iex> delete_recap(recap)
      {:error, %Ecto.Changeset{}}

  """
  def delete_recap(%Recap{} = recap) do
    Repo.delete(recap)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking recap changes.

  ## Examples

      iex> change_recap(recap)
      %Ecto.Changeset{source: %Recap{}}

  """
  def change_recap(%Recap{} = recap) do
    Recap.changeset(recap, %{})
  end
end
