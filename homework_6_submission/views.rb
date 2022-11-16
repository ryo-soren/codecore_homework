<!DOCTYPE html>
<html>
  <head>
    <title>BlogOnRails</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>
    <nav class="navbar navbar-light text-primary mt-2">
        <a class="navbar-brand text-primary mx-4" href="<%= root_path %>">Blog on Rails</a>
        <div id="navbarSupportedContent">
          <ul class="list-inline center mx-4">
            <li class="list-inline-item">
              <a class="nav-link" href="<%= root_path %>">Home</a>
            </li>         
            <li class="list-inline-item">
              <a class="nav-link" href="<%= new_post_path %>">New Post</a>
            </li>
            <% if user_signed_in? %>
            <li class="list-inline-item">
              <a class="nav-link" href="<%= edit_user_path(current_user) %>"><%=current_user.name%></a>
            </li>
            <li class="list-inline-item">
              <%= button_to 'Sign-Out', session_path(current_user), method: :delete, class:"btn btn-primary"%>
            </li>
            <% else %>
            <li class="list-inline-item">
              <a class="nav-link" href="<%= new_user_path %>">Sign Up</a>
            </li>
            <li class="list-inline-item">
              <%= button_to 'Sign-in', new_session_path, method: :get, class:"btn btn-primary"%>
            </li>
            <% end %>
            
          </ul>
        </div>
      </nav>
  <body>
    <% flash.each do |type, message| %>
      <div class="alert alert-info" role=alert >
      <%= message %>
      </div>
    <% end %>
    <%= yield %>
  </body>
</html>

# posts#form
<%=form_with model: @post, class:"m-3" do |form|%>
    <div class="form-group">
      <%= form.label :title %>
      <%= form.text_field :title, class:"form-control" %>
    </div>
    <div class="form-group">
      <%= form.label :body %>
      <%= form.text_area :body, class:"form-control" %>
    </div>
  <%= form.submit class:"btn btn-outline-primary my-3"%>
<% end %>

# posts#edit
<%= render "form" %>
# posts#new
<%= render "form" %>

# posts#index
<div class="row m-3">
  <% @posts.each do |post|%>
  <div class="my-3 col-sm-6 col-md-4">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">
          <%= link_to post.title, post, class:"stretched-link text-decoration-none"%>
        </h4>
        <p class="card-text"><%=post.body%></p>
      </div>
    </div>
  </div>
  <% end %>
</div>

# posts#show
<div class="card m-3 border-0">
    <div class="card-body" id="postCard">
        <h1 class="card-title"><%=@post.title%> </h1>
        <p class="card-text"><%=@post.body%> </p>
        <p><small>Posted <%= time_ago_in_words(@post.created_at) %> ago</small></p>
        <% if can?(:crud, @post) %>
            <div class="d-flex">
                <%= button_to 'Edit', edit_post_path(@post.id), method: :get, class:"btn btn-outline-primary" %>
                <%= button_to 'Delete', post_path(@post), method: :delete, class:"btn btn-outline-primary mx-1" %>
            </div>
        <% end %>

    </div>
    <div class="card-body" id="commentFormCard">
        <%=form_with(model: [@post, @comment]) do |form|%>
            <div class="form-group">
            <h2>Comment</h2>
            <%= form.text_area :body, class:"form-control" %>
            </div>
        <%= form.submit "Submit", class:"btn btn-outline-primary my-3"%>
        <% end %>
    </div>
    <% @comments.each do |comment|%>
    <div class="card-body" id="commentsCard">
        <p class="card-text"><%= comment.body%> </p>
        <div class="d-flex">
            <div class="d-flex align-items-center"><small class="me-2">Commented <%= time_ago_in_words(comment.created_at)%> ago</small></div>
            <% if can?(:crud, comment) %>
                <div class="d-flex align-items-center">&#x2022;</div>
                <%= button_to 'Delete', post_comment_path(@post.id, comment.id), method: :delete, class:"btn btn-link btn-sm text-decoration-none" %>
            <% end %>
            
        </div>
    </div>
    <%end%>
</div>

# sessions#new
<%=form_with url: session_path, class:"m-3" do |form|%>
    <div class="form-group">
        <%= form.label :email %>
        <%= form.text_field :email, class:"form-control" %>
    </div>
    <div class="form-group">
        <%= form.label :password %>
        <%= form.password_field :password, class:"form-control" %>
    </div>
    <%= form.submit "Sign-In", class:"btn btn-outline-primary my-3"%>
<% end %>

# users#form
<%=form_with model: @user, class:"m-3" do |form|%>
    <div class="form-group">
        <%= form.label :name %>
        <%= form.text_field :name, class:"form-control", placeholder:"Name"%>
    </div>
    <div class="form-group">
        <%= form.label :email %>
        <%= form.text_field :email, class:"form-control", placeholder:"Email"%>
    </div>
    <% if !current_user %>
    <div class="form-group">
        <%= form.label :password %>
        <%= form.password_field :password, class:"form-control", placeholder:"Password" %>
    </div>
    <div class="form-group">
        <%= form.label :password_confirmation %>
        <%= form.password_field :password_confirmation, class:"form-control", placeholder:"Password" %>
    </div>
    <% end %>
    <% if current_user %>
    <%= form.submit "Save", class:"btn btn-outline-primary my-3"%>
    <%= link_to "Change Password", user_edit_password_path(current_user), class:"text-decoration-none"%>
        <% else %>        
    <%= form.submit "Sign-Up", class:"btn btn-outline-primary my-3"%>
    <% end %>
<% end %>

# users#new
<%= render 'form'%>

# users#edit
<%= render 'form'%>

# users#edit_password
<%=form_with scope: :user, url: user_edit_password_path, method: :patch, class:"m-3" do |form|%>
    <div class="form-group">
        <%= form.label :current_password %>
        <%= form.password_field :current_password, class:"form-control", placeholder:"Password" %>
    </div>
    <div class="form-group">
        <%= form.label "New password" %>
        <%= form.password_field :password, class:"form-control", placeholder:"Password" %>
    </div>
    <div class="form-group">
        <%= form.label :password_confirmation %>
        <%= form.password_field :password_confirmation, class:"form-control", placeholder:"Password" %>
    </div>
  <%= form.submit class:"btn btn-outline-primary my-3"%>
<% end %>


