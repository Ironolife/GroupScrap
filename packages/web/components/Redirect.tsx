import { useRouter } from 'next/router';
import { useEffect, VFC } from 'react';

type RedirectProps = {
  href: string;
};

const Redirect: VFC<RedirectProps> = ({ href }) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [router]);

  return null;
};

export default Redirect;
