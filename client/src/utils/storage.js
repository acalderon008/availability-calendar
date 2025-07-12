// Local storage utilities for user preferences

const STORAGE_KEYS = {
  USER_NAME: 'availability_calendar_user_name'
};

export const getUserName = () => {
  return localStorage.getItem(STORAGE_KEYS.USER_NAME) || '';
};

export const setUserName = (name) => {
  localStorage.setItem(STORAGE_KEYS.USER_NAME, name);
};

export const hasUserName = () => {
  return !!getUserName();
}; 