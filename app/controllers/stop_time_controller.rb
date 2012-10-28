class StopTimeController  < ApplicationController


  def by_stop_code
    render :json => StopTime.get_times_by_stop_code(params[:stop_code]), :layout => false
  end


end