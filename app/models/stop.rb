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
      stop.longitude = row["Longitude"].to_f
      stop.latitude = row["Latitude"].to_f
      stop.street = row["Street"]
      stops << stop
    end
    stops
  end

  def self.find(lat,long)

    stops = []
    CSV.foreach(File.dirname(__FILE__) + '/MancStops.csv', :headers => true) do |row|
      latitude = row["Latitude"].to_f
      longitude = row["Longitude"].to_f

      if(lat > latitude - 0.5 && lat < latitude + 0.5 &&
          long > longitude - 0.5 && long < longitude + 0.5 )

        stop = Stop.new
        stop.common_name = row["CommonName"]
        stop.landmark = row["Landmark"]
        stop.longitude = longitude
        stop.latitude = latitude
        stop.street = row["Street"]
        stops << stop
      end
    end
    stops
  end
end
