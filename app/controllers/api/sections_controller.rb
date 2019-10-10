class Api::SectionsController < ApplicationController
    def index
        # @sections = Project.all;
        @sections = current_user.projects.find(params[:project_id]).sections
        render "api/sections/index"
        # current_user.work_spaces.sections;
    end

    def create
        # @section = current_user.Project.find(params[:project_id]).sections.new(section_params)
        @section = Section.new(section_params)

        @section.author_id = current_user.id
        if @section.save
            unless @section.prev_section_id.nil?
                @prev_section = Section.find(@section.prev_section_id)
                @prev_section.update(:next_section_id => @section.id)
            end
            unless @section.next_section_id.nil?
                @next_section = Section.find(@section.next_section_id)
                @next_section.update(:prev_section_id => @section.id)
            end
            @sections = Section.ordered_list(@section)
            render "api/sections/index"
        else
            render json: @section.errors.full_messages, status: 400
        end
    end

    def update_sections_order
        updated_order_list = params[:moveOpInfo][:updatedOrderedIds]
        moving_id = params[:moveOpInfo][:movingSectionId]
        moveto_idx = params[:moveOpInfo][:moveToIndex].to_i

        @moving = Section.find(moving_id)

        sections_will_be_updated = [@moving]

        # Grab prev and next section for the moving section
        if !@moving.prev_section_id.nil?
            @moving_prev = Section.find(@moving.prev_section_id)
            sections_will_be_updated.push(@moving_prev)
        end
        if !@moving.next_section_id.nil?
            @moving_next = Section.find(@moving.next_section_id)
            sections_will_be_updated.push(@moving_next)
        end

        # Grab prev and next section for the new position
        if moveto_idx != 0
            @moved_prev = Section.find(updated_order_list[moveto_idx - 1])
            sections_will_be_updated.push(@moved_prev)
        end
        if !updated_order_list[moveto_idx + 1].nil?
            @moved_next = Section.find(updated_order_list[moveto_idx + 1])
            sections_will_be_updated.push(@moved_next)
        end

        # Logic for updating the sections inside sections_will_be_updated
        #update_sections_will_be_updated

        # Change the prev and next section of the moving section
        if @moving_prev 
            @moving_prev.next_section_id = @moving.next_section_id 
        end
        if @moving_next
            @moving_next.prev_section_id = @moving.prev_section_id 
        end

        # Change the prev and next section of the moved section
        if @moved_prev
            @moved_prev.next_section_id = @moving.id
            @moving.prev_section_id = @moved_prev.id
        else
            @moving.prev_section_id = nil
        end
        if @moved_next
            @moved_next.prev_section_id = @moving.id
            @moving.next_section_id = @moved_next.id
        else
            @moving.next_section_id = nil
        end
        
        begin            
            Section.transaction do 
                sections_will_be_updated.each do |section|
                    section.save!
                end
            end
            @sections = Section.ordered_list(@moving)
            # @project = Project.find(params[:moveOpInfo][:projectId])
            render "api/sections/index"
            # render "api/projects/show"
        rescue ActiveRecord::RecordInvalid
            puts json: ["here we go!!!"]            
        end



        # moving_section.prev_id => moveto_section.id
        # => except when moveto_section.prev_id == nil
        # ===> moinvg_section.prev_id => nil

        # moving_section.next_id => moveto_section.next_id
        # => except when moving_section.prev_id == nil
        # ===> moving_section.next_id => moveto_section.id

        # moveto_section.prev_id => moving_section.prev_id
        # => only when moveto_section.prev_id => moving_section.id
        # ===> otherwise, stays the same
        # there might be more logic...

        # moveto_section.next_id => moving_section.id

    end

    def update_sections_will_be_updated
        # @moving
        # @moving_prev
        # @moving_next
        # @moved_prev
        # @moved_next

        # Change the prev and next section of the moving section
        if @moving_prev 
            @moving_prev.next_section_id = @moving.next_section_id 
        end
        if @moving_next
            @moving_next.prev_section_id = @moving.prev_section_id 
        end

        # Change the prev and next section of the moved section
        if @moved_prev
            @moved_prev.next_section_id = @moving.id
            @moving.prev_section_id = @moved_prev.id
        else
            @moving.prev_section_id = nil
        end
        if @moved_next
            @moved_next.prev_section_id = @moving.id
            @moving.next_section_id = @moved_next.id
        else
            @moving.next_section_id = nil
        end

    end

    def show
        @section = Section.find(params[:id])
        if @section
            render "api/sections/show"
        else
            render json: @section.errors.full_messages, status: 204
        end
    end

    def update
        @section = Section.find(params[:id])
        if @section.update(section_params)
            render "api/sections/show"
        else
            render json: @section.errors.full_messages, status: 400
        end
    end

    def destroy
        @section = Section.find(params[:id])
        if @section.destroy
            @null_section = Project.find(params[:project_id]).sections.find_by(null_section: true)
            @tasks = @section.tasks;
            @tasks.section_id = @null_section.id
            render "api/sections/show" # should render workspace?
        else
            render json: @section.errors.full_messages, status: 400
        end        
    end

    private
    def section_params
        params.require(:section)
        .permit(:name, :description, :null_section, :project_id, 
        :prev_section_id, :next_section_id, :author_id)
    end    

end
