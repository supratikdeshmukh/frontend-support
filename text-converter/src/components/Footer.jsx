export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://facebook.com",
      icon: "fab fa-facebook-f",
      label: "Facebook",
    },
    {
      href: "https://instagram.com",
      icon: "fab fa-instagram",
      label: "Instagram",
    },
    {
      href: "https://github.com",
      icon: "fab fa-github",
      label: "GitHub",
    },
  ];

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {currentYear} Text Converter. All rights reserved.</p>
        <div className="social-icons">
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
            >
              <i className={icon}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
