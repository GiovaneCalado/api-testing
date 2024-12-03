import { test, expect } from '@playwright/test';
import { validateContract } from '../commons/api-commons';

test.describe('API REST Testing', () => {
  test('API GET Request', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    const responseBody = await response.json()
  
    expect(response).toBeOK
    expect(responseBody.data.email).toBe('janet.weaver@reqres.in')

    await validateContract(responseBody, 'get_user.json')
  });

  test('API POST Request', async ({ request }) => {
      const response = await request.post('https://reqres.in/api/users', {
          data: {
              "name": "morpheus",
              "job": "leader"
          }
      });
      const responseBody = await response.json()
    
      expect(response).toBeOK
      expect(responseBody.name).toBe('morpheus')
      await validateContract(responseBody, 'post_user.json')
    });

    test('API PUT Request', async ({ request }) => {
      const response = await request.put('https://reqres.in/api/users/2', {
          data: {
              "name": "morpheus",
              "job": "zion resident"
          }
      });
      const responseBody = await response.json()
    
      expect(response).toBeOK
      expect(responseBody.job).toBe('zion resident')
      await validateContract(responseBody, 'put_user.json')
    });

    test('API DELETE Request', async ({ request }) => {
      const response = await request.delete('https://reqres.in/api/users/2');
    
      expect(response).toBeOK
    });
});