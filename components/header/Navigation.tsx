interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  const navLinks = [
    { href: "#jobs", label: "Find Jobs" },
    { href: "#companies", label: "Companies" },
    { href: "#employers", label: "For Employers" },
    { href: "#resources", label: "Resources" },
  ];

  return (
    <nav className={`flex items-center space-x-8 ${className}`}>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}