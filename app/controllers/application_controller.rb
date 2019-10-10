class ApplicationController < ActionController::Base

    helper_method :current_user, 
        :logged_in?, 
        :ordered_list_ids, 
        :ordered_list_ids_with_sections,
        :ordered_tasks_list_ids,
        :ordered_tasks_list_ids_with_tasks

    def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login!(user)
        user.reset_session_token!
        session[:session_token] = user.session_token
        @current_user = user
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def logged_in?
        !!current_user
    end

    def require_logged_out
    end

    def require_logged_in
    end

    # This is used to create ordered_list_ids for sections under project item
    def ordered_list_ids(project)
        # @sections = section.project.sections
        @sections = project.sections
        # debugger
        section_hash = {}
        head = nil

        @sections.each do |section|
            section_hash[section.id] = section 
            head = section if section.prev_section_id == nil
        end
        
        ordered_list_ids = [head.id]

        until section_hash[ordered_list_ids.last].next_section_id == nil do
            ordered_list_ids.push(section_hash[ordered_list_ids.last].next_section_id)
        end
        
        # debugger
        ordered_list_ids
    end

    # This is used to create ordered_list_ids for sections under project item
    def ordered_list_ids_with_sections(sections)
        # @sections = section.project.sections
        # @sections = project.sections
        # debugger
        section_hash = {}
        head = nil

        sections.each do |section|
            section_hash[section.id] = section 
            head = section if section.prev_section_id == nil
        end
        
        ordered_list_ids = [head.id]

        until section_hash[ordered_list_ids.last].next_section_id == nil do
            ordered_list_ids.push(section_hash[ordered_list_ids.last].next_section_id)
        end
        
        # debugger
        ordered_list_ids
    end

    # This is used to create ordered_list_ids for sections under project item
    def ordered_tasks_list_ids(section)
        # @sections = section.project.sections
        @tasks = section.tasks
        # debugger
        task_hash = {}
        head = nil

        @tasks.each do |task|
            task_hash[task.id] = task 
            head = task if task.prev_task_id == nil
        end
        
        ordered_list_ids = [head.id]

        until task_hash[ordered_list_ids.last].next_task_id == nil do
            ordered_list_ids.push(task_hash[ordered_list_ids.last].next_task_id)
        end
        
        # debugger
        ordered_list_ids
    end

    # This is used to create ordered_list_ids for tasks under project item
    def ordered_tasks_list_ids_with_tasks(tasks)
        # @tasks = task.project.tasks
        # @tasks = project.tasks
        # debugger
        task_hash = {}
        head = nil

        tasks.each do |task|
            task_hash[task.id] = task 
            head = task if task.prev_task_id == nil
        end
        
        ordered_list_ids = [head.id]

        until task_hash[ordered_list_ids.last].next_task_id == nil do
            ordered_list_ids.push(task_hash[ordered_list_ids.last].next_task_id)
        end
        
        # debugger
        ordered_list_ids
    end

end
