const Footer = () => {
  return (
    <footer className="py-6 border-t border-border/20">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ResumeAI. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;