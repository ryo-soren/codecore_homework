class ApplicationController < ActionController::Base
    def posts 
        @posts = Post.order(created_at: :desc)
    end

    def current_user
        @current_user ||= User.find_by_id session[:user_id]
    end

    helper_method :current_user

    def user_signed_in?
        current_user.present?
    end

    helper_method :user_signed_in?

    def authenticate_user!
        redirect_to new_session_path, notice: "Please sign in" unless user_signed_in?
    end

end

class CommentsController < ApplicationController

    before_action :find_post
    before_action :authenticate_user!
    before_action :authorize_user!, only:[:destroy]

    def create
        @comment = Comment.new(comment_params)
        @comment.post = @post
        @comment.user = current_user
        
        if @comment.save
            flash.alert = "Comment posted"
            redirect_to @post
        else
            flash.alert = @comment.errors.full_messages.join(", ")
            redirect_to @post
        end
        
    end

    def destroy
        @comment = Comment.find params[:id]
        if @comment.save
            @comment.destroy
            redirect_to post_path(@comment.post)
            flash.alert = "Comment deleted"
        else
            flash.alert = @comment.errors.full_messages.join(", ")
            redirect_to post_path(@comment.post)
        end
    end


    private
    
    def find_post
        @post = posts.find params[:post_id]
    end
    
    def comment_params
        params.require(:comment).permit(:body)
    end

    def authorize_user!
        redirect_to root_path, alert: "Not Authorized!" unless can?(:crud, @comment)
    end
end

class PostsController < ApplicationController

    before_action :find_post, only: [:show, :destroy, :edit, :update]
    before_action :authenticate_user!, except: [:index, :show]
    before_action :authorize_user!, only:[:edit, :update, :destroy]

    def new
        @post = Post.new
    end

    def create
        @post = Post.new(post_params)
        @post.user = current_user

        if @post.save
            flash.alert = "New post created"
            redirect_to @post
        else
            flash.alert = @post.errors.full_messages.join(", ")
            render 'new'
        end
        
    end

    def index
        @posts = Post.order(created_at: :desc)
    end

    def show
        @comments = @post.comments.order(created_at: :desc)
        @comment = Comment.new
    end

    def edit
    end

    def update
        @post.user = current_user

        if @post.update(post_params)
            flash.alert = "Post updated successfully"
            redirect_to @post
        else
            flash.alert = @post.errors.full_messages.join(", ")
            render :edit            
        end
    end

    def destroy
        @post.destroy
        flash.alert = "Post deleted successfully"
        redirect_to posts_path
    end
    
    private

    def find_post
        @post = Post.find params[:id]
    end

    def post_params
        params.require(:post).permit(:title, :body)
    end

    def authorize_user!
        redirect_to root_path, alert: "Not authorized!" unless can?(:crud, @post)
    end
end

class SessionsController < ApplicationController
    def new
    end
  
    def create
      @user = User.find_by_email params[:email]
      if @user && @user.authenticate(params[:password])
        session[:user_id] = @user.id
        flash.alert = "Logged in"
        redirect_to root_path
      else
        flash.alert = "Wrong email or password"
        render :new
      end
    end

    def destroy
        session[:user_id] = nil
        flash.alert = "Logged out"
        redirect_to root_path
    end
end

class UsersController < ApplicationController

    before_action :find_user, only:[:update]

    def new
      @user = User.new
    end
  
    def create
      @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id
        redirect_to root_path 
        flash.alert = "Logged In!"
      else
        flash.alert = @user.errors.full_messages.join(", ")
        render 'new'
      end
    end
    
    def edit
        @user = current_user
    end

    def update
        if current_user.update(user_params)
            flash.alert = "Successfully Updated"
            redirect_to root_path
        else
            flash.alert = "Please enter a valid email"
            render :edit
        end
    end

    def edit_password 
      @user = current_user
    end

    def update_password
      @user = current_user
      puts"**************************"
      puts (@user.authenticate(params.require(:user).permit(:current_password)))
      puts params[:user][:current_password]
      puts"**************************"
      # if @user && @user.authenticate(params.require(:user).permit(:current_password))
      if @user.authenticate(params[:user][:current_password])
        if password_same?
          if @user.update(params.require(:user).permit(:password))
            redirect_to root_path, {alert: "Password updated!"}
          else
            redirect_to user_edit_password_path, {alert: @user.errors.full_messages.join(", ")}
          end
        else
          redirect_to user_edit_password_path, {alert: "Password confirmation doesn't match", status: 303}
        end
      else
        redirect_to user_edit_password_path, {alert: "Old Password is incorrect", status: 303}
      end
    end
    
    private
    def find_user
        @user = User.find params[:id]
    end

    def user_params
      params.require(:user).permit(
        :name,
        :email,
        :password,
        :password_confirmation
      )
    end

    def password_same?
      if (params[:user][:password] != params[:user][:current_password]) && (params[:user][:password] === params[:user][:password_confirmation])
        true
      else
        false
      end
    end
  end
