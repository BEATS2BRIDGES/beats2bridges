import { Link, useLocation } from "react-router-dom";
import { Home, Mail, Users, UserCheck, Calendar, Heart, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/contact", label: "Contact", icon: Mail },
    { path: "/partners", label: "Partners", icon: Users },
    { path: "/officers", label: "Officers", icon: UserCheck },
    { path: "/booking", label: "Book", icon: Calendar },
  ];

  const donateItem = { path: "/donate", label: "Donate", icon: Heart };

  const NavLink = ({ path, label, icon: Icon, isDonate = false }: { 
    path: string; 
    label: string; 
    icon: any; 
    isDonate?: boolean 
  }) => {
    const isActive = location.pathname === path;
    
    if (isDonate) {
      return (
        <Link
          to={path}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
            isActive
              ? "bg-secondary text-primary font-semibold"
              : "bg-secondary hover:bg-secondary/90 text-primary"
          }`}
        >
          <Icon size={18} className="text-primary" />
          <span className="text-primary">{label}</span>
        </Link>
      );
    }

    return (
      <Link
        to={path}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
          isActive
            ? "bg-primary-foreground/20 text-primary-foreground font-semibold"
            : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
        }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };

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

          {/* Mobile Menu */}
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-smooth">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-gradient-hero border-l border-primary-foreground/20">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map(({ path, label, icon }) => (
                    <NavLink key={path} path={path} label={label} icon={icon} />
                  ))}
                  <div className="pt-4 border-t border-primary-foreground/20">
                    <NavLink 
                      path={donateItem.path} 
                      label={donateItem.label} 
                      icon={donateItem.icon} 
                      isDonate 
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            /* Desktop Navigation */
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
              {/* Donate tab - beige background with blue text */}
              <Link
                to={donateItem.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ml-4 ${
                  location.pathname === donateItem.path
                    ? "bg-secondary text-primary font-semibold"
                    : "bg-secondary hover:bg-secondary/90 text-primary"
                }`}
              >
                <Heart size={18} className="text-primary" />
                <span className="hidden sm:inline text-primary">{donateItem.label}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;