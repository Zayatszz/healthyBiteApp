// api.js

const API_URL = 'http://192.168.100.37:3003';

const request = async (endpoint, method, body) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (response.ok) {
      return await response.json();
    } else {
      const errorText = await response.text();
      throw new Error(errorText || 'Something went wrong');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const login = (email, password) => {
  return request('/login', 'POST', { email, password });
};

export const signup = (userData) => {
  return request('/users', 'POST', userData);
};


export const fetchCarwashList = () => {
  return request('/carwashes', 'GET');
};


// api/user.js

// export const updateUser = async (token, userData) => {
//   return request(`/${userData.id}`, 'PUT', userData);
 
// };
export const updateUser = async (token, userData) => {
  console.log(userData, "userdatagaa shalgachihy")
  return request(`/users/${userData.id}`, 'PUT', userData, {
    'Authorization': `Bearer ${token}`,
  });
};
