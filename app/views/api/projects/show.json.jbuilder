json.project do 
    json.partial! "api/projects/project", project: @project

    json.section_ids do 
        json.array! @project.section_ids
    end
    
    json.ordered_section_ids ordered_list_ids(@project)
end

json.sections do
    @sections.each do |section|
        json.set! section.id do 
            json.partial! "api/sections/section", section: section
            json.ordered_task_ids ordered_tasks_list_ids(section)
        end
    end
end


json.tasks do
    @project.tasks.each do |task|
        json.set! task.id do 
            json.partial! "api/tasks/task", task: task
        end
    end
end
