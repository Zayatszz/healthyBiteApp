// api.js

// const API_URL = 'https://champion-flamingo-vaguely.ngrok-free.app';

const API_URL =  'https://16a8-157-15-7-118.ngrok-free.app';

// const API_URL = 'http://192.168.100.37:3003';
// const API_URL = 'http://172.20.10.3:3003';

const request = async (endpoint, method, body) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method,
    headers,
  };

  // if (body) {
  //   config.body = JSON.stringify(body);
  // }
  if (method === 'POST' && body) {
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

export const login = (emailOrPhoneNumber, password) => {
  return request('/login', 'POST', { emailOrPhoneNumber, password });
};

export const signup = (userData) => {
  return request('/users', 'POST', userData);
};

export const fetchFoodList = (userId) => {
  return request(`/foods?userId=${userId}`, 'GET');
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
export const getLoggedFoods = (userId) => {
  return request(`/logged-foods/${userId}`, 'GET');
};
export const deleteLoggedFood = (id) => {
  return request(`/logged-foods/${id}`, 'DELETE');
};







export const fetchCarwashList = () => {
  return request('/carwashes', 'GET');
};
export const fetchCarwashServiceList = () => {
  return request('/carwashservices', 'GET');
};
export const fetchCarwashService = (id) => {

  return request(`/carwashservices/${id}`, 'GET');
};

export const orderCarwash = (orderDetails) => {
  return request('/bookings', 'POST', orderDetails);
};
export const getBookings = (orderDetails) => {
  return request('/bookings', 'POST', orderDetails);
};
export const getBookingStatus = (bookingId) => {

  return request(`/bookings/status/${bookingId}`, 'GET');
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
export const updateUser = async (token, userData) => {
  console.log(userData, "userdatagaa shalgachihy")
  return request(`/users/${userData.id}`, 'PUT', userData, {
    'Authorization': `Bearer ${token}`,
  });
};
