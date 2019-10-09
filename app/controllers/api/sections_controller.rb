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
            @sections = Section.orderedList(@section)
            render "api/sections/index"
        else
            render json: @section.errors.full_messages, status: 400
        end
    end

    def update_sections_order
        # create array of sections that needs to be updated
        @section = Section.find(params[:id])
        order_arr = [@section]
        unless params[:prev_section_id].nil?
            @prev_section = Section.find(params[:prev_section_id])
            order_arr.push(@prev_section)
        end
        unless params[:next_section_id].nil?
            @next_section = Section.find(params[:next_section_id])
            order_arr.push(@next_section)
        end
        
        # handles the actual update of prev/next_section ids here
        update_related_sections

    end

    def update_related_sectionse
        @prev_section.next_id = @section.next_id if @prev_section
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

    def update_related_sections

    end
end
