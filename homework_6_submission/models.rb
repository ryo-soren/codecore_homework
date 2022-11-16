# frozen_string_literal: true

class Ability
    include CanCan::Ability
  
    def initialize(user)
  
      user ||= User.new 
      
      alias_action :create, :read, :update, :delete, :to => :crud
  
      if user.admin?
        can :manage, :all
      end
  
      can :crud, Post do |post|
          user == post.user
      end
  
      can :crud, Comment do |comment|
        user == comment.user || user == comment.post.user
      end
  
    end
  end
  
  class ApplicationRecord < ActiveRecord::Base
    primary_abstract_class
  end

  class Comment < ApplicationRecord
    belongs_to :post
    belongs_to :user
    validates :body, presence: true
  end

  class Post < ApplicationRecord
    has_many :comments, dependent: :destroy
    belongs_to :user
    validates :title, presence: true, uniqueness: {scope: :title}
    validates :body, presence: true
end

class User < ApplicationRecord
    has_secure_password :password

    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy

    VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
    validates :email, presence: true, uniqueness: true, format: VALID_EMAIL_REGEX


end
