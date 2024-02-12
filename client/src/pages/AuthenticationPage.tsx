import React from "react";
import supabase from "@/supabase/supabase";
import { Sparkle } from "lucide-react";
import { Github } from "lucide-react";

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
      options: {
        redirectTo: import.meta.env.VITE_BASE_URL as string,
      },
    });

    console.log(data);
  }
  async function handleSignInWithGithub() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: import.meta.env.VITE_BASE_URL as string,
      },
    });

    console.log(data);
  }

  return (
    <div className="p-5 bg-[#111] text-white flex items-center  justify-center flex-col gap-4 h-screen">
      <h1 className="text-3xl font-light">
        Welcome to <span className="font-semibold">Soft Steps</span>
      </h1>
      <div className="bg-black max-w-xl w-full p-5 rounded-3xl">
        <div className="flex justify-center items-center gap-5 flex-col">
          <button
            className="flex gap-2 items-center rounded-xl p-3 hover:bg-neutral-900/50 transition-colors"
            onClick={handleSignInWithGoogle}
          >
            <Sparkle size={18} />
            <p>Sign in With Google</p>
          </button>
          <button
            className="flex gap-2 items-center rounded-xl p-3 hover:bg-neutral-900/50 transition-colors"
            onClick={handleSignInWithGithub}
          >
            <Github size={18} />
            <p>Sign in With Github</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
