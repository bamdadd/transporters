# require 'nokogiri'
# require 'pp'
# class Route

# def get_line_name(file_path)
# xml_file = open(file_path)
# doc = Nokogiri::XML(xml_file)
# doc.css("Services Service Lines LineName").first.children.to_s
# end

# def get_stops(file_path)
# xml_file = open(file_path)
# doc = Nokogiri::XML(xml_file)
# doc.css("StopPoints StopPointRef").children
# end


# end

# r = Route.new
# pp r.get_line_name('/Users/bdashtba/Downloads/NW/SVRGMN02160-20120129-3843.xml')
# puts r.get_stops('/Users/bdashtba/Downloads/NW/SVRGMN02160-20120129-3843.xml').count
# r.get_stops('/Users/bdashtba/Downloads/NW/SVRGMN02160-20120129-3843.xml').each do |stop|
# pp stop.to_s
# end
