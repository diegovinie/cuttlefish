defmodule CuttlefishWeb.MatchView do
  use CuttlefishWeb, :view
  alias CuttlefishWeb.MatchView

  def render("index.json", %{matches: matches}) do
    %{data: render_many(matches, MatchView, "match.json")}
  end

  def render("show.json", %{match: match}) do
    %{data: render_one(match, MatchView, "match.json")}
  end

  def render("match.json", %{match: match}) do
    %{id: match.id,
      name: match.name,
      avg: match.avg,
      sd: match.sd,
      status_id: match.status_id}
  end
end
