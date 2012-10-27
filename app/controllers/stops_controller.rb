class StopsController < ApplicationController
  def index
    render :json => Stop.all, :layout => false
  end
end
