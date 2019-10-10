json.sections do 
    @sections.each do |section|
        json.set! section.id do 
            json.partial! 'api/sections/section', section: section
        end
    end
end
# debugger
json.ordered_section_ids ordered_list_ids_with_sections(@sections)

# json.array! @sections do |section|
#     json.partial! 'api/sections/section', section: section
# end