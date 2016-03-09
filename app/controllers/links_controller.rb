class LinksController < ApplicationController
  before_action :require_login

  def index
    @link = Link.new
    @links = current_user.links
    @lists = current_user.lists
  end

  def create
    @user = User.find(session[:user_id])
    @link = @user.links.new(link_params)
    if @link.save
      redirect_to links_path
    else
      flash[:error] = @link.errors.full_messages.join(', ')
      redirect_to links_path
    end
  end

  def edit
    @link = Link.find(params[:id])
    @lists = current_user.lists
  end

  def update
    @link = Link.find(params[:id])
    if @link.update(link_params)
      redirect_to links_path
    else
      render :edit
    end
  end

  private

  def require_login
    unless current_user
      redirect_to login_path
    end
  end

  def link_params
    params.require(:link).permit(:title, :url, :user_id, :list_id, :read)
  end
end
