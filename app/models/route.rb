require 'csv'
class Route
  extend ActiveModel::Naming
  attr_accessor :route_name, :operator, :stops, :days

  attr_accessor :stop_codes
  def initialize row
    self.route_name = row[0]
    self.operator = row[1]
    self.stops = row[2].split("|").collect {|c| Stop.find_by_code(c)}
    self.days = row[3].split("|")
  end

  @@routes = {}

  def self.get_routes
    if(@@routes == {})
      CSV.foreach(File.dirname(__FILE__) + '/routes.csv', :headers => false) do |row|
        route = Route.new(row)
        route.stops.compact!
        if(route.stops != [])
          @@routes[route.route_name] = route
        end
      end
    end
    @@routes
  end

  def self.all
    get_routes.values.take(10)
  end


  def self.find_by_name(name)
    get_routes[name]
  end

  def self.filter(term)
    get_routes.values.select{|r| r.route_name.include? term}.take(10)
  end
end
