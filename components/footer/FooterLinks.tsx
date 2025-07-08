interface FooterSection {
  title: string;
  links: { href: string; label: string }[];
}

interface FooterLinksProps {
  sections: FooterSection[];
}

export function FooterLinks({ sections }: FooterLinksProps) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  className="text-sm transition-colors hover:text-white text-slate-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}