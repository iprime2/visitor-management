import { create } from 'zustand';
import Cookies from 'js-cookie'; // For client-side cookie management

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    access_token: string;
  } | null;
  isAuthenticated: boolean;
  setUser: (user: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    access_token: string;
  }) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,

  // Set the user and mark as authenticated, store user data in cookies
  setUser: (user) => {
    Cookies.set('authToken', user.access_token, { expires: 7, path: '/' }); // Store token in cookies
    localStorage.setItem('userData', JSON.stringify(user)); // Store user data in localStorage
    set({
      user,
      isAuthenticated: true,
    });
  },

  // Clear user data, remove data from localStorage and cookies
  clearUser: () => {
    Cookies.remove('authToken'); // Remove token from cookies
    localStorage.removeItem('userData'); // Remove user data from localStorage
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));

// Initialize Zustand store with data from localStorage if it exists
if (typeof window !== 'undefined') {
  const userData = localStorage.getItem('userData');
  if (userData) {
    useUserStore.getState().setUser(JSON.parse(userData));
  }
}

export default useUserStore;
