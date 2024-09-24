import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { db } from '../src/database';
import todoRoutes from '../src/routes';

const app = express();
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

beforeAll(() => {
  // Set up the test database
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0
  )`);
});

afterAll((done) => {
  // Close the database connection
  db.close(done);
});

beforeEach(() => {
  // Clear the todos table before each test
  db.run('DELETE FROM todos');
});

describe('Todo Controller', () => {
  test('POST /todos - Create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ task: 'Test todo' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.task).toBe('Test todo');
    expect(res.body.completed).toBe(false);
  });

  test('GET /todos - Get all todos', async () => {
    // First, add a todo
    await request(app)
      .post('/todos')
      .send({ task: 'Test todo' });

    const res = await request(app).get('/todos');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].task).toBe('Test todo');
  });

  test('GET /todos/:id - Get a single todo', async () => {
    // First, add a todo
    const postRes = await request(app)
      .post('/todos')
      .send({ task: 'Test todo' });

    const res = await request(app).get(`/todos/${postRes.body.id}`);
    
    expect(res.status).toBe(200);
    expect(res.body.task).toBe('Test todo');
  });

  test('PUT /todos/:id - Update a todo', async () => {
    // First, add a todo
    const postRes = await request(app)
      .post('/todos')
      .send({ task: 'Test todo' });

    const res = await request(app)
      .put(`/todos/${postRes.body.id}`)
      .send({ task: 'Updated todo', completed: true });
    
    expect(res.status).toBe(200);
    expect(res.body.task).toBe('Updated todo');
    expect(res.body.completed).toBe(true);
  });

  test('DELETE /todos/:id - Delete a todo', async () => {
    // First, add a todo
    const postRes = await request(app)
      .post('/todos')
      .send({ task: 'Test todo' });

    const res = await request(app).delete(`/todos/${postRes.body.id}`);
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Todo deleted successfully');

    // Verify the todo is deleted
    const getRes = await request(app).get(`/todos/${postRes.body.id}`);
    expect(getRes.status).toBe(404);
  });
});