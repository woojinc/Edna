json.partial! "api/projects/project", project: @project
json.section_ids do 
    json.array! @project.section_ids
end

# json.sections do 
#     @project.sections.each do |section|
#         json.partial! 'api/sections/section', section: section
#     end
# end