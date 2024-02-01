import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {

  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
      if(!user) router.push('/auth');
      if(user) setPageLoading(false);
  }, [user, error, router]);

  if (pageLoading) return null;

  return (
    <main className="bd-dark-layer-2 min-h-screen">
      <Topbar />
      <h1 className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5'>Problems</h1>
      <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
        <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
          <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
            <tr>
              <th scope='col' className='px-1 py-3 w-0 font-medium'>Status</th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>Title</th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>Difficulty</th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>Category</th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>Solution</th>
            </tr>
          </thead>
          <ProblemsTable />
        </table>
      </div>
    </main>
  );
}