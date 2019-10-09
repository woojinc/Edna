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
            render "api/sections/show"
        else
            render json: @section.errors.full_messages, status: 400
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
        params.require(:section).permit(:name, :description, :null_section, :project_id, :prev_section_id, :next_section_id, :author_id)
    end    
end
