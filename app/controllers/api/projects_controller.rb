class Api::ProjectsController < ApplicationController
    def index
        # @projects = Project.all;
        @projects = current_user.projects
        render "api/projects/index"
        # current_user.work_spaces.projects;
    end

    def create
        @project = Project.new(project_params)
        if @project.save
            @section = @project.sections.create(
                name: "(no section)", 
                null_section: true,
                author_id: current_user.id)
            render "api/projects/show"
        else
            render json: @project.errors.full_messages, status: 400
        end
    end

    def show
        @project = Project.find(params[:id])
        if @project
            render "api/projects/show"
        else
            render json: @project.errors.full_messages, status: 204
        end
    end

    def update
        @project = Project.find(params[:id])
        if @project.update(project_params)
            render "api/projects/show"
        else
            render json: @project.errors.full_messages, status: 400
        end
    end

    def destroy
        @project = Project.find(params[:id])
        if @project.destroy
            @projects = current_user.projects
            render "api/projects/index" # should render workspace?
        else
            render json: @project.errors.full_messages, status: 400
        end        
    end

    private
    def project_params
        params.require(:project).permit(:title, :description, :public_project, :author_id)
    end
end
