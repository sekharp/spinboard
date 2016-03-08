class ListsController < ApplicationController
  before_action :require_login

  def index
    @list = List.new
    @lists = current_user.lists
    @unlisted_links = current_user.links.where(list_id: nil)
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

  def show
    @list = List.find(params[:id])
  end

  def edit
    @list = List.find(params[:id])
  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      redirect_to @list
    else
      flash.now[:errors] = @list.errors.full_messages(", ")
      render :edit
    end
  end

  def destroy
    links = Link.where(list_id: params[:id])
    links.each { |link| link.update_attribute(:list_id, nil) }
    List.destroy(params[:id])
    redirect_to lists_path
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
