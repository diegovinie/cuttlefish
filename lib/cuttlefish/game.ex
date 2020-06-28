defmodule Cuttlefish.Game do
  @moduledoc """
  The Game context.
  """

  import Ecto.Query, warn: false
  alias Cuttlefish.Repo

  alias Cuttlefish.Game.CardSet

  @doc """
  Returns the list of cardsets.

  ## Examples

      iex> list_cardsets()
      [%CardSet{}, ...]

  """
  def list_cardsets do
    Repo.all(CardSet)
  end

  @doc """
  Gets a single card_set.

  Raises `Ecto.NoResultsError` if the Card set does not exist.

  ## Examples

      iex> get_card_set!(123)
      %CardSet{}

      iex> get_card_set!(456)
      ** (Ecto.NoResultsError)

  """
  def get_card_set!(id), do: Repo.get!(CardSet, id)

  @doc """
  Creates a card_set.

  ## Examples

      iex> create_card_set(%{field: value})
      {:ok, %CardSet{}}

      iex> create_card_set(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_card_set(attrs \\ %{}) do
    %CardSet{}
    |> CardSet.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a card_set.

  ## Examples

      iex> update_card_set(card_set, %{field: new_value})
      {:ok, %CardSet{}}

      iex> update_card_set(card_set, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_card_set(%CardSet{} = card_set, attrs) do
    card_set
    |> CardSet.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a card_set.

  ## Examples

      iex> delete_card_set(card_set)
      {:ok, %CardSet{}}

      iex> delete_card_set(card_set)
      {:error, %Ecto.Changeset{}}

  """
  def delete_card_set(%CardSet{} = card_set) do
    Repo.delete(card_set)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking card_set changes.

  ## Examples

      iex> change_card_set(card_set)
      %Ecto.Changeset{source: %CardSet{}}

  """
  def change_card_set(%CardSet{} = card_set) do
    CardSet.changeset(card_set, %{})
  end

  alias Cuttlefish.Game.Match

  @doc """
  Returns the list of matches.

  ## Examples

      iex> list_matches()
      [%Match{}, ...]

  """
  def list_matches do
    Repo.all(Match)
  end

  @doc """
  Gets a single match.

  Raises `Ecto.NoResultsError` if the Match does not exist.

  ## Examples

      iex> get_match!(123)
      %Match{}

      iex> get_match!(456)
      ** (Ecto.NoResultsError)

  """
  def get_match!(id), do: Repo.get!(Match, id)

  @doc """
  Creates a match.

  ## Examples

      iex> create_match(%{field: value})
      {:ok, %Match{}}

      iex> create_match(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_match(attrs \\ %{}) do
    %Match{}
    |> Match.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a match.

  ## Examples

      iex> update_match(match, %{field: new_value})
      {:ok, %Match{}}

      iex> update_match(match, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_match(%Match{} = match, attrs) do
    match
    |> Match.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a match.

  ## Examples

      iex> delete_match(match)
      {:ok, %Match{}}

      iex> delete_match(match)
      {:error, %Ecto.Changeset{}}

  """
  def delete_match(%Match{} = match) do
    Repo.delete(match)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking match changes.

  ## Examples

      iex> change_match(match)
      %Ecto.Changeset{source: %Match{}}

  """
  def change_match(%Match{} = match) do
    Match.changeset(match, %{})
  end
end
