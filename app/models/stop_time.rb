require "cgi"
require "uri"
require "net/http"

class StopTime
  def initialize
    @traveline_api = "http://nextbus.mxdata.co.uk/nextbuses/1.0/1"
    #TravelineAPI132:TheiPh1k@
  end

  def get_times_by_stop_code(stop_code)
    req_data = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
              <Siri version="1.0" xmlns="http://www.siri.org.uk/"><ServiceRequest>
            <RequestorRef>TravelineAPI2</RequestorRef>
            <StopMonitoringRequest version="1.0">
              <MessageIdentifier>'+stop_code+'</MessageIdentifier>
              <MonitoringRef>'+stop_code+'</MonitoringRef>
            </StopMonitoringRequest></ServiceRequest></Siri>'


    url = URI.parse(@traveline_api)
    begin
      http = Net::HTTP.new(url.host, url.port)
      request = Net::HTTP::Post.new(url.path)
      request.body = req_data
      request.basic_auth 'TravelineAPI132', 'TheiPh1k@'
      request["Content-Type"] ="application/xml"
      response = http.request(request)
      response.code
      response.body
    rescue
      p "Error #{$!}"
    end

  end
end


t = StopTime.new
p t.get_times_by_stop_code("1800EB00871")
