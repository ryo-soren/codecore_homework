# application_controller
class ApplicationController < ActionController::Base
    def posts 
        @posts = Post.order(created_at: :desc)
    end
end

# comments_controller

class CommentsController < ApplicationController

    before_action :find_post

    def create
        @comment = Comment.new(comment_params)
        @comment.post = @post
        
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

    
end

# posts_controller
class PostsController < ApplicationController

    before_action :find_post, only: [:show, :destroy, :edit, :update]

    def new
        @post = Post.new
    end

    def create
        @post = Post.new(post_params)
        
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
end
