import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Product: ["Features", "Pricing", "Case Studies", "Documentation"],
  Company: ["About", "Careers", "Press", "Contact"],
  Resources: ["Blog", "Whitepapers", "Webinars", "API Reference"],
  Legal: ["Privacy Policy", "Terms of Service", "Security", "Compliance"],
};

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="font-semibold text-lg">Chimera</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Enterprise AI for pharmaceutical drug repurposing and value-added medicine discovery.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>2024 Project Chimera. All rights reserved.</p>
          <p>SOC 2 Type II Compliant | HIPAA Ready | GDPR Compliant</p>
        </div>
      </div>
    </footer>
  );
}
