require "cgi"
require "uri"
require "net/http"
include REXML
class StopTime

    @@traveline_api = "http://nextbus.mxdata.co.uk/nextbuses/1.0/1"

    def self.get_times_by_stop_code(stop_code)
    req_data = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
              <Siri version="1.0" xmlns="http://www.siri.org.uk/"><ServiceRequest>
            <RequestorRef>TravelineAPI2</RequestorRef>
            <StopMonitoringRequest version="1.0">
              <MessageIdentifier>'+stop_code+'</MessageIdentifier>
              <MonitoringRef>'+stop_code+'</MonitoringRef>
            </StopMonitoringRequest></ServiceRequest></Siri>'


    url = URI.parse(@@traveline_api)
    begin
      http = Net::HTTP.new(url.host, url.port)
      request = Net::HTTP::Post.new(url.path)
      request.body = req_data
      request.basic_auth 'TravelineAPI132', 'TheiPh1k@'
      request["Content-Type"] ="application/xml"
      response = http.request(request)
      response.code
      xml_res = response.body
      doc = REXML::Document.new(xml_res)
      puts xml_res
      XPath.each(doc, "//MonitoredStopVisit") do |journey|
          @bus_numbers=[]
          @bus_times=[]
          @dir_names=[]
           XPath.each(journey , "//PublishedLineName"){|bus_number| @bus_numbers.push(bus_number.text)}
           XPath.each(journey , "//AimedDepartureTime"){|bus_time| @bus_times.push(bus_time.text)}
           XPath.each(journey, "//DirectionName"){|dir_name| @dir_names.push(dir_name.text)}
      end



    rescue
      p "Error #{$!}"
    end
    {:bus_numbers => @bus_numbers , :bus_times => @bus_times, :dir_name =>@dir_names}
  end
end


