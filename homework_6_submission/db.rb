class CreatePosts < ActiveRecord::Migration[7.0]
    def change
      create_table :posts do |t|
        t.string :title
        t.text :body
        t.timestamps
      end
    end
  end

  class CreateComments < ActiveRecord::Migration[7.0]
    def change
      create_table :comments do |t|
        t.references :post, null: false, foreign_key: true
        t.text :body
        t.timestamps
      end
    end
  end
  
  class CreateUsers < ActiveRecord::Migration[7.0]
    def change
      create_table :users do |t|
        t.string :name
        t.string :email, index: {unique: true}
        t.string :password_digest
        t.timestamps
      end
    end
  end

  class AddUserReferencesToPosts < ActiveRecord::Migration[7.0]
    def change
      add_reference :posts, :user, null: false, foreign_key: true
    end
  end

  class AddUserReferencesToComments < ActiveRecord::Migration[7.0]
    def change
      add_reference :comments, :user, null: false, foreign_key: true
    end
  end
  
  class AddAdminToUsers < ActiveRecord::Migration[7.0]
    def change
      add_column :users, :admin?, :boolean, default: false
    end
  end

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_11_13_192543) do
    # These are extensions that must be enabled in order to support this database
    enable_extension "plpgsql"
  
    create_table "comments", force: :cascade do |t|
      t.bigint "post_id", null: false
      t.text "body"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.bigint "user_id", null: false
      t.index ["post_id"], name: "index_comments_on_post_id"
      t.index ["user_id"], name: "index_comments_on_user_id"
    end
  
    create_table "posts", force: :cascade do |t|
      t.string "title"
      t.text "body"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.bigint "user_id", null: false
      t.index ["user_id"], name: "index_posts_on_user_id"
    end
  
    create_table "users", force: :cascade do |t|
      t.string "name"
      t.string "email"
      t.string "password_digest"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.boolean "admin?", default: false
      t.index ["email"], name: "index_users_on_email", unique: true
    end
  
    add_foreign_key "comments", "posts"
    add_foreign_key "comments", "users"
    add_foreign_key "posts", "users"
  end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Post.destroy_all
Comment.destroy_all
User.destroy_all

10.times do
    name = Faker::Name.first_name
    User.create(
    name: name,
    email: "#{name}@email.com",
    password: "123",
    )
end

users = User.all

50.times do
    created_at = Faker::Date.backward(days: 365 * 3)

    p = Post.create(
        title: Faker::Hacker.say_something_smart,
        body: Faker::ChuckNorris.fact,
        created_at: created_at,
        updated_at: created_at,
        user: users.sample
    )

    rand(1..5).times do
        Comment.create(body: Faker::Hacker.say_something_smart, post: p, user: users.sample)
    end
end

posts = Post.all
puts Cowsay.say("Generated #{posts.count} posts", :dragon)

  