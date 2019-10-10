class Api::TasksController < ApplicationController
def index
        @tasks = current_user.sections.find(params[:section_id]).tasks
        render "api/tasks/index"
    end

    def create
        @task = Task.new(task_params)

        @task.author_id = current_user.id
        if @task.save
            unless @task.prev_task_id.nil?
                @prev_task = Task.find(@task.prev_task_id)
                @prev_task.update(:next_task_id => @task.id)
            end
            unless @task.next_task_id.nil?
                @next_task = Task.find(@task.next_task_id)
                @next_task.update(:prev_task_id => @task.id)
            end
            @tasks = Task.ordered_list(@task)
            render "api/tasks/index"
        else
            render json: @task.errors.full_messages, status: 400
        end
    end

    def update_tasks_order
        updated_order_list = params[:moveOpInfo][:updatedOrderedIds]
        moving_id = params[:moveOpInfo][:movingtaskId]
        moveto_idx = params[:moveOpInfo][:moveToIndex].to_i

        @moving = Task.find(moving_id)

        tasks_will_be_updated = [@moving]

        # Grab prev and next task for the moving task
        if !@moving.prev_task_id.nil?
            @moving_prev = Task.find(@moving.prev_task_id)
            tasks_will_be_updated.push(@moving_prev)
        end
        if !@moving.next_task_id.nil?
            @moving_next = Task.find(@moving.next_task_id)
            tasks_will_be_updated.push(@moving_next)
        end

        # Grab prev and next task for the new position
        if moveto_idx != 0
            @moved_prev = Task.find(updated_order_list[moveto_idx - 1])
            tasks_will_be_updated.push(@moved_prev)
        end
        if !updated_order_list[moveto_idx + 1].nil?
            @moved_next = Task.find(updated_order_list[moveto_idx + 1])
            tasks_will_be_updated.push(@moved_next)
        end

        # Logic for updating the tasks inside tasks_will_be_updated
        #update_tasks_will_be_updated

        # Change the prev and next task of the moving task
        if @moving_prev 
            @moving_prev.next_task_id = @moving.next_task_id 
        end
        if @moving_next
            @moving_next.prev_task_id = @moving.prev_task_id 
        end

        # Change the prev and next task of the moved task
        if @moved_prev
            @moved_prev.next_task_id = @moving.id
            @moving.prev_task_id = @moved_prev.id
        else
            @moving.prev_task_id = nil
        end
        if @moved_next
            @moved_next.prev_task_id = @moving.id
            @moving.next_task_id = @moved_next.id
        else
            @moving.next_task_id = nil
        end
        
        begin            
            Task.transaction do 
                tasks_will_be_updated.each do |task|
                    task.save!
                end
            end
            @tasks = Task.ordered_list(@moving)
            render "api/tasks/index"

        rescue ActiveRecord::RecordInvalid
            puts json: ["here we go!!!"]            
        end

        # moving_task.prev_id => moveto_task.id
        # => except when moveto_task.prev_id == nil
        # ===> moinvg_task.prev_id => nil

        # moving_task.next_id => moveto_task.next_id
        # => except when moving_task.prev_id == nil
        # ===> moving_task.next_id => moveto_task.id

        # moveto_task.prev_id => moving_task.prev_id
        # => only when moveto_task.prev_id => moving_task.id
        # ===> otherwise, stays the same
        # there might be more logic...

        # moveto_task.next_id => moving_task.id

    end

    def update_tasks_will_be_updated
        # @moving
        # @moving_prev
        # @moving_next
        # @moved_prev
        # @moved_next

        # Change the prev and next task of the moving task
        if @moving_prev 
            @moving_prev.next_task_id = @moving.next_task_id 
        end
        if @moving_next
            @moving_next.prev_task_id = @moving.prev_task_id 
        end

        # Change the prev and next task of the moved task
        if @moved_prev
            @moved_prev.next_task_id = @moving.id
            @moving.prev_task_id = @moved_prev.id
        else
            @moving.prev_task_id = nil
        end
        if @moved_next
            @moved_next.prev_task_id = @moving.id
            @moving.next_task_id = @moved_next.id
        else
            @moving.next_task_id = nil
        end

    end

    def show
        @task = Task.find(params[:id])
        if @task
            render "api/tasks/show"
        else
            render json: @task.errors.full_messages, status: 204
        end
    end

    def update
        @task = Task.find(params[:id])
        if @task.update(task_params)
            render "api/tasks/show"
        else
            render json: @task.errors.full_messages, status: 400
        end
    end

    def destroy
        @task = Task.find(params[:id])
        if @task.destroy
            @tasks = @task.tasks;
            @tasks.task_id = @null_task.id
            render "api/tasks/show" # should render workspace?
        else
            render json: @task.errors.full_messages, status: 400
        end        
    end

    private
    def task_params
        params.require(:task)
        .permit(:name, :description, :completed, ,:start_date, :end_date, :due_date,
        :assignee_id, :author_id, :section_id, :prev_task_id, :next_task_id)
    end    

end
