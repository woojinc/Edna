@sections.each do |section|
    json.set! section.id do 
        json.partial! 'api/sections/section', section: section
    end
end

# json.array! @sections do |section|
#     json.partial! 'api/sections/section', section: section
# end