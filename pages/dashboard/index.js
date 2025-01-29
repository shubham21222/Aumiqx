import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/content');
  }, [router]);

  return null;
};

export default Dashboard;
