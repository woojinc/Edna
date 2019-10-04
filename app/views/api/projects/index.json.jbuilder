json.array! @projects do |project|
    json.partial! 'api/projects/project', project: project
end