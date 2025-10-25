import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";

export function useAuth() {
  const { firebaseUser, loading: firebaseLoading } = useFirebaseAuth();
  
  const { data: user, isLoading: queryLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
    enabled: !firebaseLoading,
  });

  const isLoading = firebaseLoading || queryLoading;
  const isAuthenticated = !!firebaseUser || !!user;

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
