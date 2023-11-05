'use client';

import { useEffect, useState } from 'react';
import { googleAuth, logout } from '@/firebase/auth.firebase';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();
  const [siteName, setSiteName] = useState<string>('');
  const [siteDescription, setSiteDescription] = useState<string>('');
  const [userSite, setUserSite] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user && loading && !userSite) {
    }
  });

  return (
    <main className="flex gap-6 flex-col items-center justify-between p-24">
      <p>this is the dashboard homepage</p>
      {user ? <p>🟢 connected</p> : <p>🔴 not connected</p>}
      {user ? (
        <button onClick={logout} className="bg-gray-200 px-6 py-3 rounded-md">
          LOGUT
        </button>
      ) : (
        <button
          onClick={googleAuth}
          className="bg-gray-200 px-6 py-3 rounded-md"
        >
          GOOGLE AUTH
        </button>
      )}
      {user && (
        <div className="flex flex-col gap-6">
          <p className="text-center font-bold ">Mon site</p>
          <div>
            <label htmlFor="siteName">Nom du site</label>
            <input
              className="border"
              type="text"
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="siteDescription">Description du site</label>
            <input
              className="border"
              type="text"
              id="siteDescription"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
            />
          </div>
        </div>
      )}
    </main>
  );
}
