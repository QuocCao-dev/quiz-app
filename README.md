# quiz-app
# exam
Create exam
POST: /exams
{
  "name": "test exam 2",
  "duration":  60,
  "category": "test category 2",
  "totalMarks": 100,
  "passingMarks": 60,
  "questions": []
}
GET: /exams

GET: /exams/id

PATCH: /exams/id
{
  "name": "test exam 2",
  "duration":  60,
  "category": "test category 2",
  "totalMarks": 100,
  "passingMarks": 60,
  "questions"?: []
}

DELETE: /exams/id

POST: questions/
{
  "examId": 1,
  "name": "question 1",
  "correctOption": "a",
  "options": ["a", "b","c","d"]
}

GET
GET ITEM
PATCH
DELETE