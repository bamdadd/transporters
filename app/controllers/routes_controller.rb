class RoutesController < ApplicationController
  def index
    render :json => Route.all, :layout => false
  end

  def by_name
    render :json => Route.find_by_name(params[:name]), :layout => false
  end

end
