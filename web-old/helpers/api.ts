import axios from 'axios';

type fetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function api<T>(url: string, method: fetchMethod, data?: any): Promise<T> {
  try {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('seila:token');

      const response = await axios({
        url,
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        data: JSON.stringify(data)
      });

      return response.data as T;
    }
  } catch (e: any) {
    console.log(e);
    // if (e.response.status === 401 || e.response.data === 'jwt malformed') {
    //   window.location.href = '/login';
    // } else {
    //   throw new Error(e.response.data);
    // }
  }
}
