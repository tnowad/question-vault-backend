# Question Vault

## Entities

### User

- `id` (Primary Key)
- `username`
- `email`
- `password`
- `reputation_score`
- `bio`
- `created_at`
- `updated_at`

### Question

- `id` (Primary Key)
- `user_id` (Foreign Key referencing User.id)
- `title`
- `description`
- `created_at`
- `updated_at`

### Answer

- `id` (Primary Key)
- `user_id` (Foreign Key referencing User.id)
- `question_id` (Foreign Key referencing Question.id)
- `content`
- `created_at`
- `updated_at`

### Comment

- `id` (Primary Key)
- `user_id` (Foreign Key referencing User.id)
- `answer_id` (Foreign Key referencing Answer.id)
- `content`
- `created_at`
- `updated_at`

### Category

- `id` (Primary Key)
- `name`
- `created_at`
- `updated_at`

### Tag

- `id` (Primary Key)
- `name`
- `created_at`
- `updated_at`

### Bookmark

- `id` (Primary Key)
- `user_id` (Foreign Key referencing User.id)
- `question_id` (Foreign Key referencing Question.id)
- `created_at`
- `updated_at`

### Notification

- `id` (Primary Key)
- `user_id` (Foreign Key referencing User.id)
- `content`
- `created_at`
- `is_read`

### Reputation

- `id` (Primary Key)
- `user_id` (Foreign Key referencing User.id)
- `score`
- `created_at`

### History

- `id` (Primary Key)
- `user_id` (Foreign Key referencing User.id)
- `action` (e.g., "asked a question," "answered a question")
- `question_id` (Foreign Key referencing Question.id)
- `answer_id` (Foreign Key referencing Answer.id)
- `created_at`

### Vote

- `id` (Primary Key)
- `user_id` (Foreign Key referencing User.id)
- `answer_id` (Foreign Key referencing Answer.id)
- `vote_type` (e.g., "upvote," "downvote")
- `created_at`

### Badge

- `id` (Primary Key)
- `name`
- `description`
- `image_url`
- `created_at`
- `updated_at`
