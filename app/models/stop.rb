require 'csv'
class Stop
  extend ActiveModel::Naming
  attr_accessor :common_name, :landmark, :street, :longitude, :latitude, :naptan_code

  def initialize row
    self.common_name = row["CommonName"]
    self.landmark = row["Landmark"]
    self.longitude = row["Longitude"].to_f
    self.latitude = row["Latitude"].to_f
    self.street = row["Street"]
    self.naptan_code = row["NaptanCode"]
  end

  def self.all
    stops = []
    CSV.foreach(File.dirname(__FILE__) + '/MancStops.csv', :headers => true) do |row|
      stop = Stop.new(row)
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

        stop = Stop.new(row)
        stops << stop
      end
    end
    stops
  end

  def self.find_by_code(code)
  end

  def self.find_by_name(name)
    stops = []
    limit = 10
    count = 0
    CSV.foreach(File.dirname(__FILE__) + '/MancStops.csv', :headers => true) do |row|
      if(row["CommonName"].downcase.include? name.downcase)
        stop = Stop.new(row)
        stops << stop

        count = count.next
        return stops if(count == limit)

      end
    end
    stops
  end
end
