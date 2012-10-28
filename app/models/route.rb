require 'csv'
class Route
  extend ActiveModel::Naming
  attr_accessor :route_name, :operator, :stops, :days

  def initialize row
    self.route_name = row[0]
    self.operator = row[1]
    self.stops = row[2].split("|")
    self.days = row[3].split("|")
  end

  def self.all
    routes = []
    CSV.foreach(File.dirname(__FILE__) + '/routes.csv', :headers => false) do |row|
      route = Route.new(row)
      routes << route
    end
    routes
  end


  def self.find_by_name(name)
    routes = []
    limit = 10
    count = 0
    CSV.foreach(File.dirname(__FILE__) + '/routes.csv', :headers => false) do |row|
      if(row[0].downcase.include? name.downcase)
        route = Route.new(row)
        routes << route

        count = count.next
        return routes if(count == limit)

      end
    end
    routes
  end
end
