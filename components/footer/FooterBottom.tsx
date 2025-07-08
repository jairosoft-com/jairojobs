export function FooterBottom() {
  const legalLinks = [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Cookie Policy' },
  ];

  return (
    <div className="border-t border-slate-700 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-slate-300">
          <p>&copy; 2025 JairoJobs. All rights reserved.</p>
          <div className="flex space-x-6">
            {legalLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="transition-colors hover:text-white text-slate-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-slate-400">
          <p>Made with ❤️ for job seekers worldwide</p>
        </div>
      </div>
    </div>
  );
}