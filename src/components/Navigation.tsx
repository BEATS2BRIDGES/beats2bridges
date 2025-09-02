import { Link, useLocation } from "react-router-dom";
import { Home, Mail, Users, UserCheck, Calendar, Heart } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/contact", label: "Contact", icon: Mail },
    { path: "/partners", label: "Partners", icon: Users },
    { path: "/officers", label: "Officers", icon: UserCheck },
    { path: "/booking", label: "Book", icon: Calendar },
  ];

  const donateItem = { path: "/donate", label: "Donate", icon: Heart };

  return (
    <nav className="bg-gradient-hero shadow-glow sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 text-2xl font-bold text-primary-foreground">
            <img 
              src="/lovable-uploads/886e34d8-3928-4831-ba84-fdd9ae90db7e.png" 
              alt="Beats2Bridges Logo" 
              className="h-8 w-8 rounded-full object-cover"
            />
            <span>BEATS2BRIDGES</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground font-semibold"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
            {/* Donate tab - all the way to the right */}
            <Link
              to={donateItem.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ml-4 ${
                location.pathname === donateItem.path
                  ? "bg-primary-foreground/20 text-primary-foreground font-semibold"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              <Heart size={18} />
              <span className="hidden sm:inline">{donateItem.label}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;