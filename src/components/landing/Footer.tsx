const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} CrazeCheck. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
          <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          <a href="#" className="transition-colors hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
