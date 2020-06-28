defmodule Cuttlefish.Game do
  @moduledoc """
  The Game context.
  """

  import Ecto.Query, warn: false
  alias Cuttlefish.Repo

  alias Cuttlefish.Game.CardSet
  alias Cuttlefish.Auth.Player

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
    Match
    |> Repo.all()
    |> Repo.preload(:contenders)
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
  def get_match!(id), do: Match |> Repo.get!(id) |> Repo.preload(:contenders)

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

  alias Cuttlefish.Game.Contender

  @doc """
  Returns the list of contenders.

  ## Examples

      iex> list_contenders()
      [%Contender{}, ...]

  """
  def list_contenders do
    Repo.all(Contender)
  end

  @doc """
  Gets a single contender.

  Raises `Ecto.NoResultsError` if the Contender does not exist.

  ## Examples

      iex> get_contender!(123)
      %Contender{}

      iex> get_contender!(456)
      ** (Ecto.NoResultsError)

  """
  def get_contender!(id), do: Contender |> Repo.get!(id) |> Repo.preload([:player, :match])

  @doc """
  Creates a contender.

  ## Examples

      iex> create_contender(%{field: value})
      {:ok, %Contender{}}

      iex> create_contender(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_contender(attrs \\ %{}) do
    %Contender{}
    |> Contender.changeset(attrs)
    |> Ecto.Changeset.cast_assoc(:player, with: &Player.changeset/2)
    |> Ecto.Changeset.cast_assoc(:match, with: &Match.changeset/2)
    |> Repo.insert()
  end

  @doc """
  Updates a contender.

  ## Examples

      iex> update_contender(contender, %{field: new_value})
      {:ok, %Contender{}}

      iex> update_contender(contender, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_contender(%Contender{} = contender, attrs) do
    contender
    |> Contender.changeset(attrs)
    |> Ecto.Changeset.cast_assoc(:player, with: &Player.changeset/2)
    |> Repo.update()
  end

  @doc """
  Deletes a contender.

  ## Examples

      iex> delete_contender(contender)
      {:ok, %Contender{}}

      iex> delete_contender(contender)
      {:error, %Ecto.Changeset{}}

  """
  def delete_contender(%Contender{} = contender) do
    Repo.delete(contender)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking contender changes.

  ## Examples

      iex> change_contender(contender)
      %Ecto.Changeset{source: %Contender{}}

  """
  def change_contender(%Contender{} = contender) do
    Contender.changeset(contender, %{})
  end
end
