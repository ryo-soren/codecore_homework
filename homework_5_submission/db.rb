# create posts table
class CreatePosts < ActiveRecord::Migration[7.0]
    def change
        create_table :posts do |t|
        t.string :title
        t.text :body
        t.timestamps
        end
    end
end

# create comments table
class CreateComments < ActiveRecord::Migration[7.0]
    def change
        create_table :comments do |t|
        t.references :post, null: false, foreign_key: true
        t.text :body
        t.timestamps
        end
    end
end

# schema
ActiveRecord::Schema[7.0].define(version: 2022_11_11_054525) do
    # These are extensions that must be enabled in order to support this database
    enable_extension "plpgsql"
  
    create_table "comments", force: :cascade do |t|
      t.bigint "post_id", null: false
      t.text "body"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["post_id"], name: "index_comments_on_post_id"
    end
  
    create_table "posts", force: :cascade do |t|
      t.string "title"
      t.text "body"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
  
    add_foreign_key "comments", "posts"
  end

# seeds
Post.destroy_all

50.times do
    created_at = Faker::Date.backward(days: 365 * 3)

    p = Post.create(
        title: Faker::Hacker.say_something_smart,
        body: Faker::ChuckNorris.fact,
        created_at: created_at,
        updated_at: created_at
    )

    rand(1..5).times do
        Comment.create(body: Faker::Hacker.say_something_smart, post: p)
    end
end

posts = Post.all
puts Cowsay.say("Generated #{posts.count} posts", :dragon)

