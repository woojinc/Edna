class Api::ProjectsController < ApplicationController
    def index
        @projects = Project.all;
        render "api/projects/index"
        # current_user.projects;
    end

    def create
        @project = Project.new(project_params)
        if @project.save
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
            render "api/projects/show" # should render workspace?
        else
            render json: @project.errors.full_messages, status: 400
        end        
    end

    private
    def project_params
        params.require(:project).permit(:title, :description, :public_project, :author_id)
    end
end
