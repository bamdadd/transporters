require 'nokogiri'
require 'pp'
require 'ftools'
require 'csv'
class Route
  attr_accessor :dir_path

  def initialize
    @dir_path = '/Users/bdashtba/Downloads/NW/'
  end

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
       stops_array.push({:ref=>stop.css('StopPointRef').children.to_s , :common_name => stop.css('CommonName').children.to_s})
    end
    stops_array
  end

  def list_xml_files
    files = Array.new
    Dir.new(@dir_path).entries.each { |n| files.push(n) if File.file?(@dir_path+n) }
    files
  end

  def get_operator_name
    @doc.css("OperatorShortName").first.children.to_s
  end


end

r = Route.new
xml_files = r.list_xml_files
xml_files.each do |file|
  r.open_xml_file(r.dir_path+file)
  line_name= r.get_line_name
  operator= r.get_operator_name.to_s.sub('&amp;', '&')
  stop_refs = ""
  stop_names =""
  puts line_name
  puts operator
  r.get_stops.each {|line| stop_refs = stop_refs + line[:ref]+ "|"}
  r.get_stops.each {|line| stop_names = stop_names + line[:common_name]+ "|"}
  puts stop_names
  #CSV.open('routes.csv', 'w') do |csv|
  #  csv << ["Line Name", "Operator Name", "Stop Reference", "Stop Name"]
  #end
  CSV.open('routes.csv', 'ab') do |csv|
    csv << [line_name , operator, stop_refs , stop_names]
  end
end



