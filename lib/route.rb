require 'nokogiri'
require 'pp'
class Route


  def open_xml_file(file_path)
  xml_file = open(file_path)
  @doc = Nokogiri::XML(xml_file)
  end


  def get_line_name()
    @doc.css("Services Service Lines LineName").first.children.to_s
  end

  def get_stops()
    stops = @doc.css("AnnotatedStopPointRef")
    stops_array = Array.new
    stops.each do |stop|
       stops_array.push({"ref"=>stop.css('StopPointRef').children.to_s , "CommonName" => stop.css('CommonName').children.to_s})
    end
    stops_array
  end


end

r = Route.new
xml_files = r.list_xml_files
r.open_xml_file('/Users/bdashtba/Downloads/NW/SVRGMN02160-20120129-3843.xml')
pp r.get_line_name
r.get_stops.each do |stop|
  puts stop.to_s
end


