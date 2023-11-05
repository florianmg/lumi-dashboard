"use client";

import { googleAuth, logout } from "@/firebase/auth.firebase";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  return (
    <main className="flex gap-6 flex-col items-center justify-between p-24">
      <p>this is the dashboard homepage</p>
      {user ? <p>🟢 connected</p> : <p>🔴 not connected</p>}
      {user ? <button onClick={logout} className="bg-gray-200 px-6 py-3 rounded-md">LOGUT</button> :  <button onClick={googleAuth} className="bg-gray-200 px-6 py-3 rounded-md">GOOGLE AUTH</button>}
    </main>
  )
}
