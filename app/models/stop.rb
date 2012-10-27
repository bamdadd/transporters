require 'csv'
class Stop
  extend ActiveModel::Naming
  attr_accessor :common_name, :landmark, :street, :longitude, :latitude

  def self.all
    stops = []
    CSV.foreach(File.dirname(__FILE__) + '/MancStops.csv', :headers => true) do |row|
      stop = Stop.new
      stop.common_name = row["CommonName"]
      stop.landmark = row["Landmark"]
      stop.longitude = row["Longitude"]
      stop.latitude = row["Latitude"]
      stop.street = row["Street"]
      stops << stop
    end
    stops
  end
end
