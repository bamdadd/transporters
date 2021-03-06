require 'csv'
class Stop
  extend ActiveModel::Naming
  attr_accessor :common_name, :longitude, :latitude, :code

  def initialize row
    self.common_name = row["CommonName"]
    self.longitude = row["Longitude"].to_f
    self.latitude = row["Latitude"].to_f
    self.code = row["AtcoCode"]
  end


  def to_coordinates
    [self.latitude, self.longitude]
  end


  @@stops = {}
  def self.get_stops
    if(@@stops == {})
      stops = []
      CSV.foreach(File.dirname(__FILE__) + '/MancStops.csv', :headers => true) do |row|
        stop = Stop.new(row)
        @@stops[stop.code] = stop
      end
    end
    @@stops
  end

  def self.all
    get_stops.values
  end

  def self.find(lat,long)
    stops = get_stops.values
    res = []
    stops.each do |stop|
      latitude = stop.latitude
      longitude = stop.longitude

      distance = Geocoder::Calculations.distance_between(stop, [lat, long])
      if(distance < 1)
        res << [distance, stop]
      end
    end

    res.sort!{|x,y| x[0] <=> y[0]}
    res.collect{|x| x[1]}
  end

  def self.find_by_code(code)
    get_stops[code]
  end

  def self.find_by_name(name)
    stops = get_stops.values
    limit = 10
    count = 0
    res = []
    stops.each do |stop|
      if(stop.common_name.downcase.include? name.downcase)
        res << stop

        count = count.next
        return res if(count == limit)

      end
    end
    res
  end
end
