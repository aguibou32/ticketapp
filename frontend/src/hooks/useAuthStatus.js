import { useState, useEffect } from "react";
import {useSelector } from "react-redux";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const {user} = useSelector((state) => state.auth);
  
  useEffect(() => {
    if(user){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return {loggedIn, checkingStatus};
}

/*
Just some note how this works for the future
We are using the user the to check if it is null or not 

1) if it is not, we know the user is logged In, we set it to true 
2) If it not, we know the user is not logged in, we set it to false
3) Just for the purpose of showing the loading spinner from the moment the user hit the 
   private route, until the auth checking is finished, we are using an extra variable called checking status
d
   Checking status is set to true, meaning it will show the Spinner in both cases. The useEffect run and when it finishes 
   the spinner disapear and it the user is either redirected to the component they want to navigate or they are sent to the login
   

   NOW VERY IMPORTANT, THE REASON WE ARE USING THE USER AS A DEPENDENCY IS BECAUSE EVERYTIME THE STATE OF THE USER CHANGES, WE WANT TO 
   RUN THIS FUNCTION, EITHER TO LOGIN IN THE USER OR LOGOUT.
   
   FOR INSTANCE, IMAGINE YOU ARE LOGGED IN, FOR SOMETIME AND THEN YOU LOGOUT, THIS MEANS useEffect must run for you not to be able to access a private route like the profile route
*/