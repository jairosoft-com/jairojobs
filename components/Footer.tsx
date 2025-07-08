import { FooterBottom } from './footer/FooterBottom';
import { FooterLinks } from './footer/FooterLinks';
import { FooterLogo } from './footer/FooterLogo';
import { Newsletter } from './footer/Newsletter';
import { SocialLinks } from './footer/SocialLinks';

export function Footer() {
  const footerSections = [
    {
      title: 'For Job Seekers',
      links: [
        { href: '#', label: 'Browse Jobs' },
        { href: '#', label: 'Career Advice' },
        { href: '#', label: 'Resume Builder' },
        { href: '#', label: 'Salary Guide' },
        { href: '#', label: 'Interview Tips' },
      ],
    },
    {
      title: 'For Employers',
      links: [
        { href: '#', label: 'Post a Job' },
        { href: '#', label: 'Talent Search' },
        { href: '#', label: 'Pricing Plans' },
        { href: '#', label: 'Recruitment Solutions' },
        { href: '#', label: 'Company Branding' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info with Social Links */}
            <div className="lg:col-span-1">
              <FooterLogo />
              <SocialLinks />
            </div>

            {/* Footer Link Sections */}
            <FooterLinks sections={footerSections} />

            {/* Newsletter */}
            <Newsletter />
          </div>
        </div>

        {/* Bottom Section */}
        <FooterBottom />
      </div>
    </footer>
  );
}