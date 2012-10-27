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

      if(lat > latitude - 0.005 && lat < latitude + 0.005 &&
          long > longitude - 0.005 && long < longitude + 0.005 )

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

  def self.find_by_name(name)
    stops = []
    limit = 10
    count = 0
    CSV.foreach(File.dirname(__FILE__) + '/MancStops.csv', :headers => true) do |row|
      if(row["CommonName"].downcase.include? name.downcase)
        stop = Stop.new
        stop.common_name = row["CommonName"]
        stop.landmark = row["Landmark"]
        stop.longitude = row["Longitude"].to_f
        stop.latitude = row["Latitude"].to_f
        stop.street = row["Street"]
        stops << stop

        count = count.next
        return stops if(count == limit)

      end
    end
    stops
  end
end
