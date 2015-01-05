require "sinatra"

PANEL_CLASSES = %w{
  panel-primary
  panel-success
  panel-info
  panel-default
  panel-warning
  panel-danger
}

before do
  content_type :html, "charset" => "utf-8"
end

get "/" do
  @panel_class = PANEL_CLASSES.sample
  @request_time = Time.now

  erb :index
end
