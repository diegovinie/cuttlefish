# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Cuttlefish.Repo.insert!(%Cuttlefish.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

Cuttlefish.Repo.insert!(%Cuttlefish.Game.CardSet{
  name: "standard",
  content: [0, 1, 2, 3, 5, 8, 13, 20, 40, 100]
})

Cuttlefish.Repo.insert!(%Cuttlefish.Game.CardSet{
  name: "test",
  content: [1, 3, 7]
})

Cuttlefish.Repo.insert!(%Cuttlefish.Auth.Player{
  username: "sandman",
  question: "Take my hand",
  secret: "We're off to never-never land"
})
