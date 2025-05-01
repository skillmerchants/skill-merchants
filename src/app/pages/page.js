// This component is located in the /pages directory (or /app directory).
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// Here you should import your UserSignup component from where it's defined.
import UserSignup from './users/singup/page'; 
 
function Page() { // This name can be different
  return (
      <div>
         <UserSignup /> {/*This is the component that was having issues*/}
      </div>
  );
}

export default Page;