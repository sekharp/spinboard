class LinksController < ApplicationController
  before_action :require_login

  def index
    @link = Link.new
  end

  def create
    @user = User.find(session[:user_id])
    @link = @user.links.new(link_params)
    if @link.save
      redirect_to links_path
    else
      render :new
    end
  end

  private

  def require_login
    unless current_user
      redirect_to login_path
    end
  end

  def link_params
    params.require(:link).permit(:title, :url, :user_id, :read)
  end
end
