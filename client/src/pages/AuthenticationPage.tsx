import React from "react";
import supabase from "@/supabase/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const AuthenticationPage: React.FC = () => {
  return (
    <div className="p-5 bg-neutral-900 flex items-center  justify-center h-screen">
      <div className="bg-black max-w-xl w-full p-5 rounded-3xl">
        <Auth
          supabaseClient={supabase}
          providers={["google", "github"]}
          appearance={{
            theme: ThemeSupa,
            style: {
              container: {
                backgroundColor: "black",
                borderRadius: 40,
                width: "100%",
              },
              button: {
                backgroundColor: "black",
                borderRadius: 25,
              },
              input: {
                backgroundColor: "black",
                borderRadius: 25,
              },
            },
          }}
          socialLayout="horizontal"
          theme="dark"
          redirectTo={import.meta.env.VITE_API_BASE_URL + "/"}
        />
      </div>
    </div>
  );
};

export default AuthenticationPage;
