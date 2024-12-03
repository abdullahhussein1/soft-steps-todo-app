import supabase from "@/supabase/supabase";
import github from "../assets/images/github.png";
import githubBlack from "../assets/images/github-black.png";
import google from "../assets/images/google.png";
import googleBlack from "../assets/images/google-black.png";
import palestineCountryFilledIcon from "../assets/images/palestineCountryFilled.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";
import { generateSvgUrl, getFavIcon } from "@/utils/utils";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const { status } = useUser();

  const systemThemeDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const blueSvgUrl = generateSvgUrl(getFavIcon("blue"));

  async function handleSignInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.VITE_BASE_URL as string,
      },
    });
  }
  async function handleSignInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: import.meta.env.VITE_BASE_URL as string,
      },
    });
  }

  useEffect(() => {
    if (status === "authenticated") navigate("/");
  }, [navigate, status]);

  return (
    <div
      className={[
        "h-[100dvh] p-8",
        systemThemeDark ? "bg-black text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="relative mx-auto flex h-full max-w-xl flex-col items-center justify-center">
        <div className="absolute top-0 flex flex-col items-start gap-1 self-start">
          <div className="flex items-center gap-1 text-xl font-semibold">
            <img src={blueSvgUrl} alt="favicon" className="h-7 w-7" />
            <h1 className="text-xl font-semibold">Soft Steps</h1>
          </div>
          <p className="text-[10px] font-light text-neutral-500 sm:text-xs">
            You will surely find the most bitter towards the believers to be the
            Jews and polytheists [5:82]
          </p>
        </div>
        <img
          src={palestineCountryFilledIcon}
          alt="palestineCountryFilledIcon"
          className="absolute h-full w-full justify-self-center object-cover opacity-10 brightness-50"
        />
        <div className="flex w-full flex-col gap-1">
          <h1 className="text-xl font-medium">Get started</h1>
          <p className="text-xs font-thin">
            Sign In/Up to take your new steps easier towards your goals
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl py-5 md:flex-row">
          <button
            className={[
              "flex w-full items-center justify-center gap-2 rounded-2xl border  p-3 backdrop-blur-md transition-colors",
              systemThemeDark
                ? "border-neutral-900 hover:bg-neutral-900/60"
                : "border-neutral-300 hover:bg-neutral-200/60",
            ].join(" ")}
            onClick={handleSignInWithGoogle}
          >
            {systemThemeDark ? (
              <img src={google} className="h-[17px] w-[17px] rounded-full" />
            ) : (
              <img
                src={googleBlack}
                className="h-[17px] w-[17px] rounded-full"
              />
            )}
            <p>Continue With Google</p>
          </button>
          <button
            className={[
              "flex w-full items-center justify-center gap-2 rounded-2xl border  p-3 backdrop-blur-md transition-colors",
              systemThemeDark
                ? "border-neutral-900 hover:bg-neutral-900/60"
                : "border-neutral-300 hover:bg-neutral-200/50",
            ].join(" ")}
            onClick={handleSignInWithGithub}
          >
            {systemThemeDark ? (
              <img src={github} className="h-[17px] w-[17px] rounded-full" />
            ) : (
              <img
                src={githubBlack}
                className="h-[17px] w-[17px] rounded-full"
              />
            )}
            <p>Continue With Github</p>
          </button>
        </div>
        <p className="absolute bottom-0 text-justify text-[9px] font-light text-neutral-500 sm:text-xs">
          Believers should not take disbelievers as guardians instead of the
          believers, and whoever does so will have nothing to hope for from
          Allah, unless it is a precaution against their tyranny. And Allah
          warns you about Himself. And to Allah is the final return. [3:28]
        </p>
      </div>
    </div>
  );
};

export default AuthenticationPage;
