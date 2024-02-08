// Import necessary dependencies
import React from "react";
import supabase from "@/supabase/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const AuthenticationPage: React.FC = () => {
  return (
    <Auth
      supabaseClient={supabase}
      providers={["google", "github"]}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
  );
};

export default AuthenticationPage;
