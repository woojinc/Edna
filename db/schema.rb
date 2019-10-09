# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_08_153141) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "projects", force: :cascade do |t|
    t.string "title", null: false
    t.string "description"
    t.boolean "public_project", default: true
    t.integer "workspace_id"
    t.integer "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_projects_on_author_id"
    t.index ["workspace_id"], name: "index_projects_on_workspace_id"
  end

  create_table "sections", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.boolean "null_section", default: false
    t.integer "project_id", null: false
    t.integer "prev_section_id"
    t.integer "next_section_id"
    t.integer "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_sections_on_project_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.boolean "completed", default: false
    t.datetime "start_date"
    t.datetime "end_date"
    t.datetime "due_date"
    t.integer "assignee_id"
    t.integer "author_id", null: false
    t.integer "section_id"
    t.integer "prev_task_id"
    t.integer "next_task_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_tasks_on_author_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "last_name"
    t.string "first_name"
    t.string "pronouns"
    t.string "role"
    t.string "team"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
