import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth, provider } from "./firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      onLoginSuccess(res.user);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onLoginSuccess(result.user);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -50 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Welcome Back</h2>
          <button onClick={onClose} className="text-xl">&times;</button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email or phone number"
            className="w-full border rounded-xl px-4 py-2 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-2 outline-none"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="w-full bg-indigo-600 text-white rounded-xl py-2 hover:bg-indigo-700 transition">
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <hr className="flex-grow" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="flex-grow" />
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-2 border rounded-xl py-2 hover:bg-gray-50 transition"
        >
          <img
            src="https://img.icons8.com/color/20/000000/google-logo.png"
            alt="google"
          />
          Log in with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Sign up now
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginModal;
