
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { auth as firebaseAuth, isFirebaseEnabled } from '@/lib/firebase';
import { getUserProfile, apiLogin, apiSignup, apiLogout } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { onAuthStateChanged } from 'firebase/auth';


// Define a more specific type for the user data we expect from Firestore
interface UserProfile {
  username: string;
  email: string;
  role: 'user' | 'admin';
  subscription: 'free' | 'pro';
  teamId?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  userData: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isFirebaseEnabled) {
      console.error("[ForensicHub] Firebase is not configured. Please create a .env.local file with your Firebase credentials. See README.md for details.");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth!, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const profile = await getUserProfile(firebaseUser.uid) as UserProfile;
        setUserData(profile);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const login = async (email: string, password: string) => {
    if (!isFirebaseEnabled) {
        toast({ title: "Demo Mode", description: "Login is disabled because Firebase is not configured."});
        return false;
    }
    setLoading(true);
    try {
      await apiLogin(email, password);
      // Auth state change will be handled by the onAuthStateChanged listener
      toast({ title: "Login Successful", description: "Welcome back!" });
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error("Login Error", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "The email or password was incorrect.",
      });
      setLoading(false);
      return false;
    }
  }

  const signup = async (email: string, password: string) => {
     if (!isFirebaseEnabled) {
        toast({ title: "Demo Mode", description: "Signup is disabled because Firebase is not configured."});
        return false;
    }
     setLoading(true);
     try {
      await apiSignup(email, password);
      // Auth state change will handle the rest
      toast({ title: "Signup Successful", description: "Welcome to ForensicHub!" });
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error("Signup Error", error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "Could not create account.",
      });
      setLoading(false);
      return false;
    }
  }

  const logout = async () => {
    if (!isFirebaseEnabled) {
        toast({ title: "Demo Mode", description: "Logout is disabled."});
        return;
    }
    setLoading(true);
    await apiLogout();
    setUser(null);
    setUserData(null);
    setLoading(false);
    router.push('/login');
  };


  const value = {
    user,
    userData,
    loading,
    login,
    signup,
    logout,
  };

  // On the first render (on server and initial client render), return null.
  if (!isClient) {
    return null;
  }
  
  if (loading || !isFirebaseEnabled) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">{isFirebaseEnabled ? 'Loading...' : 'Initializing...'}</p>
        </div>
      </div>
    );
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
