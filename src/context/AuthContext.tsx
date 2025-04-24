
   import React, { createContext, useContext, useState, useEffect } from 'react';
   import { User, AuthState } from '../types';
   import { useToast } from "@/components/ui/use-toast";
   import axios from 'axios';

   interface AuthContextType extends AuthState {
     login: (email: string, password: string) => Promise<void>;
     signup: (email: string, password: string, name: string, country: string) => Promise<void>;
     logout: () => void;
   }

   const AuthContext = createContext<AuthContextType | undefined>(undefined);

   export const useAuth = () => {
     const context = useContext(AuthContext);
     if (!context) {
       throw new Error('useAuth must be used within an AuthProvider');
     }
     return context;
   };

   export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [authState, setAuthState] = useState<AuthState>({
       user: null,
       isAuthenticated: false,
     });
     const { toast } = useToast();

     useEffect(() => {
       const token = localStorage.getItem('token');
       const storedUser = localStorage.getItem('user');
       if (token && storedUser) {
         try {
           const user = JSON.parse(storedUser);
           setAuthState({
             user,
             isAuthenticated: true,
           });
           axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
         } catch (error) {
           console.error('Failed to parse stored user');
           localStorage.removeItem('user');
           localStorage.removeItem('token');
         }
       }
     }, []);

     const login = async (email: string, password: string) => {
       try {
         const response = await axios.post('http://localhost:5000/api/auth/login', {
           email,
           password,
         });
         const { user, token } = response.data;

         localStorage.setItem('user', JSON.stringify(user));
         localStorage.setItem('token', token);
         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

         setAuthState({
           user,
           isAuthenticated: true,
         });

         toast({
           title: "Login Successful",
           description: `Welcome back, ${user.name}!`,
         });
       } catch (error: any) {
         console.error(error);
         toast({
           title: "Login Failed",
           description: error.response?.data?.message || "Please check your credentials and try again.",
           variant: "destructive",
         });
         throw error;
       }
     };

     const signup = async (email: string, password: string, name: string, country: string) => {
       try {
         const response = await axios.post('http://localhost:5000/api/auth/signup', {
           email,
           password,
           name,
           country,
         });
         const { user, token } = response.data;

         localStorage.setItem('user', JSON.stringify(user));
         localStorage.setItem('token', token);
         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

         setAuthState({
           user,
           isAuthenticated: true,
         });

         toast({
           title: "Account Created",
           description: `Welcome to Task Tracker, ${name}!`,
         });
       } catch (error: any) {
         console.error(error);
         toast({
           title: "Signup Failed",
           description: error.response?.data?.message || "There was an error creating your account.",
           variant: "destructive",
         });
         throw error;
       }
     };

     const logout = async () => {
       try {
         await axios.post('http://localhost:5000/api/auth/logout');
         localStorage.removeItem('user');
         localStorage.removeItem('token');
         delete axios.defaults.headers.common['Authorization'];
         setAuthState({
           user: null,
           isAuthenticated: false,
         });
         toast({
           title: "Logged Out",
           description: "You have been successfully logged out.",
         });
       } catch (error) {
         console.error(error);
       }
     };

     const value = {
       ...authState,
       login,
       signup,
       logout,
     };

     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
   };