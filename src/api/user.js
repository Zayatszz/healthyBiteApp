// api.js

// const API_URL = 'https://champion-flamingo-vaguely.ngrok-free.app';

const API_URL =  'https://278f-2405-5700-585-f4b3-707b-5319-c511-652.ngrok-free.app';


// const API_URL = 'http://192.168.100.37:3003';
// const API_URL = 'http://172.20.10.3:3003';

const request = async (endpoint, method, body = null, extraHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  };

  const config = {
    method,
    headers,
  };

  if ((method === 'POST' || method === 'PUT') && body) {
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


export const getUserById = (userId) => {
  return request(`/users/${userId}`, 'GET');
};
export const login = (emailOrPhoneNumber, password) => {
  return request('/login', 'POST', { emailOrPhoneNumber, password });
};
export const signup = (userData) => {
  return request('/users', 'POST', userData);
};
export const updateUser = async (token, userData) => {
  console.log(userData, "userdatagaa shalgachihy")
  return request(`/users/${userData.id}`, 'PUT', userData, {
    'Authorization': `Bearer ${token}`,
  });
};

export const fetchFoodList = (userId) => {
  return request(`/foods?userId=${userId}`, 'GET');
};
export const fetchMealPlan = (userId, mealType, token) => {
  // return request(`/mealPlan?userId=${userId}&mealType=${mealType}`, 'GET');
  return request(`/mealPlan?userId=${userId}&mealType=${mealType}`, 'GET', null, {
    Authorization: `Bearer ${token}`,
  });
};
export const toggleFavoriteFood = (userId, foodId) => {
  return request('/favorite-foods/toggle', 'POST', { userId, foodId });
};
export const getFavoriteFoods = (userId) => {
  return request(`/favorite-foods/${userId}`, 'GET');
};
export const logFood = (userId, foodId, mealType) => {
  return request('/logged-foods', 'POST', { userId, foodId, mealType });
};
export const getLoggedFoods = (userId, startDate, endDate) => {
  return request(`/logged-foods/filter?userId=${userId}&startDate=${startDate}&endDate=${endDate}`, 'GET');
};

export const getWeeklyLoggedFoods = (userId) => {
  return request(`/logged-foods/week?userId=${userId}`, 'GET');
};


export const logWater = (userId, amount) => {
  return request('/logged-waters', 'POST', { userId, amount });
};
export const getLoggedWater = (userId, startDate, endDate) => {
  return request(`/logged-waters/filter?userId=${userId}&startDate=${startDate}&endDate=${endDate}`, 'GET');
};



export const deleteLoggedFood = (id) => {
  return request(`/logged-foods/${id}`, 'DELETE');
};


// api/user.js
export const fetchQuestions = () => {
  return request('/questions', 'GET');
};

export const submitUserHealthInfo = (data) => {
  return request('/user-health-info', 'POST', data);
};








export const fetchUserOrders = (userId) => {
  return request(`/user-orders/${userId}`, 'GET');
};

export const getToken = () => {
  return request('/qpay/token', 'POST');
};
export const createInvoive = (invoiceDetails) => {
  return request('/qpay/invoice', 'POST', invoiceDetails);
};

export const filterCarwashes = async (filters) => {
  console.log(filters, "aaaaaaaaaaaa")
  console.log(filters?.province, "province")
  const queryString = new URLSearchParams(filters).toString();
  console.log(queryString, "queryString")
  console.log(`/carwashservice/filter?${queryString}`)
  return request(`/carwashservice/filter?${queryString}`, 'GET');
};

// api/user.js

// export const updateUser = async (token, userData) => {
//   return request(`/${userData.id}`, 'PUT', userData);
 
// };

