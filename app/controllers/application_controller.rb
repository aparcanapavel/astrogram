class ApplicationController < ActionController::Base
  # CLLLR
  helper_method :current_user, :logged_in?
  skip_before_action :verify_authenticity_token

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def loggout!
    current_user.reset_session_token!
    session[:session_token] =  nil
  end

  def logged_in?
    !!current_user
  end

  def require_logged_in
    redirect_to new_api_user unless logged_in?
  end
end
