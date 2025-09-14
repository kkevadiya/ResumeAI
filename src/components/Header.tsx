import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext"; // Import the useAuth hook
import { supabase } from "@/lib/supabaseClient";   // Import the supabase client

const Header = () => {
  const { session } = useAuth(); // Get the current session
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          ResumeAI
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/#features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/#templates" className="hover:text-primary transition-colors">
            Templates
          </Link>
        </nav>

        {/* This is the new dynamic part */}
        <div className="flex items-center gap-4">
          {session ? (
            // If user is logged in, show Logout button
            <>
              <Button variant="ghost" asChild>
                <Link to="/builder">Builder</Link>
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            // If user is logged out, show Login and Sign Up buttons
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;