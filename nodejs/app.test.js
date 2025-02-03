const request = require('supertest');
const { app, server } = require('./app');
const mysql = require('mysql2/promise');

jest.mock('mysql2/promise', () => {
  const mockPool = {
    execute: jest.fn(),
    on: jest.fn(),
  };
  return {
    createPool: () => mockPool,
  };
});

describe('GET /api/v1/task/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  it('should return 400 for invalid id parameter', async () => {
    const response = await request(app).get('/api/v1/task/invalid-id');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid id parameter' });
  });

  it('should return 500 for database query error', async () => {
    const pool = mysql.createPool();
    pool.execute.mockRejectedValue(new Error('Database query error'));

    const response = await request(app).get('/api/v1/task/1');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Database query error' });
    expect(pool.execute).toHaveBeenCalledTimes(1);
    expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM tasks WHERE id = ?', [1]);
  });

  it('should return the task for a valid id', async () => {
    const pool = mysql.createPool();
    const mockRows = [{ id: 1, name: 'Test Task' }];
    pool.execute.mockResolvedValue([mockRows]);

    const response = await request(app).get('/api/v1/task/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRows);
    expect(pool.execute).toHaveBeenCalledTimes(1);
    expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM tasks WHERE id = ?', [1]);
  });
});