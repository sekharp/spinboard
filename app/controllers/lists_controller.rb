class ListsController < ApplicationController
  before_action :require_login

  def index
    @list = List.new
    @lists = current_user.lists
  end

  def create
    @user = User.find(session[:user_id])
    @list = @user.lists.new(list_params)
    if @list.save
      redirect_to lists_path
    else
      flash[:error] = @list.errors.full_messages.join(', ')
      redirect_to lists_path
    end
  end

  private

  def require_login
    unless current_user
      redirect_to login_path
    end
  end

  def list_params
    params.require(:list).permit(:name, :user_id)
  end
end
