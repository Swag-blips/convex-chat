import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <main>
        <Unauthenticated>  
          <SignInButton />
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>
      </main>
    </>
  );
}



export default App;