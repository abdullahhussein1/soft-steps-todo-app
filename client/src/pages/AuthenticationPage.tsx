import React from "react";
import supabase from "@/supabase/supabase";

const AuthenticationPage: React.FC = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (session && session.provider_token) {
      window.localStorage.setItem(
        "oauth_provider_token",
        session.provider_token
      );
    }

    if (session && session.provider_refresh_token) {
      window.localStorage.setItem(
        "oauth_provider_refresh_token",
        session.provider_refresh_token
      );
    }

    if (event === "SIGNED_OUT") {
      window.localStorage.removeItem("oauth_provider_token");
      window.localStorage.removeItem("oauth_provider_refresh_token");
    }
  });

  async function handleSignInWithGoogle() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    console.log(data);
  }
  async function handleSignInWithGithub() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    console.log(data);
  }

  return (
    <div className="p-5 bg-neutral-900 flex items-center  justify-center h-screen">
      <div className="bg-black max-w-xl w-full p-5 rounded-3xl">
        <div className="flex justify-between flex-col">
          <button onClick={handleSignInWithGoogle}>Sign in With Google</button>
          <button onClick={handleSignInWithGithub}>Sign in With Github</button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
