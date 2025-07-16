import React, { useState } from "react";
import LoginModal from "./LoginModal";

function App() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
      {!user ? (
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 bg-white text-indigo-600 rounded-full shadow-lg hover:bg-indigo-50 transition text-lg font-semibold"
        >
          Open Login
        </button>
      ) : (
        <div className="text-white text-lg font-medium">
          👋 Welcome, {user.email}
        </div>
      )}
      {open && (
        <LoginModal
          onClose={() => setOpen(false)}
          onLoginSuccess={(u) => setUser(u)}
        />
      )}
    </div>
  );
}

export default App;
