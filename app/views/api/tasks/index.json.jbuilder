# json.sections do 
#     @sections.each do |section|
#         json.set! section.id do 
#             json.partial! 'api/sections/section', section: section
#             json.ordered_task_ids ordered_tasks_list_ids(section)
#         end
#     end
# end

json.tasks do    
    @tasks.each do |task|
        json.set! task.id do
            json.partial! 'api/tasks/task', task: task
        end
    end
end

json.ordered_task_ids ordered_tasks_list_ids_with_tasks(@tasks)

