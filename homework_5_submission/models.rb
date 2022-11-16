# comment model
class Comment < ApplicationRecord
    belongs_to :post
  
    validates :body, presence: true
  end

# post model
class Post < ApplicationRecord
    has_many :comments, dependent: :destroy
    validates :title, presence: true, uniqueness: {scope: :title}
    validates :body, presence: true
end
