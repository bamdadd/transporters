class StopsController < ApplicationController
  def index
    render :json => Stop.all, :layout => false
  end

  def find
    render :json => Stop.find(params[:lat].to_f, params[:long].to_f), :layout => false
  end

  def by_name
    render :json => Stop.find_by_name(params[:name]), :layout => false
  end


  def show
    stop = Stop.find_by_code(params[:code])
  end
end
