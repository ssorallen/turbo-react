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

get "/onefish" do
  @fish_count = 1
  erb :fish
end

get "/twofish" do
  @fish_count = 2
  erb :fish
end

get "/redfish" do
  @fish_class = "fish-red"
  erb :fish
end

get "/bluefish" do
  @fish_class = "fish-blue"
  erb :fish
end
