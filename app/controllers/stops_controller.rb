class StopsController < ApplicationController
  def index
    render :json => Stop.all, :layout => false
  end

  def find
    render :json => Stop.find(params[:lat].to_f, params[:long].to_f), :layout => false
  end
end
