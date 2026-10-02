import { ArrowUp, Mail, MessageCircle } from "lucide-react";
import { personalInfo } from "../../data/personal";
import { whatsappLink } from "../../lib/whatsapp";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "../../lib/icons";

export default function Footer(props) {
  const socials = [
    { label: "GitHub", href: personalInfo.github, icon: GithubIcon },
    { label: "LinkedIn", href: personalInfo.linkedin, icon: LinkedinIcon },
    { label: "Instagram", href: personalInfo.instagram, icon: InstagramIcon },
    { label: "WhatsApp", href: whatsappLink(), icon: MessageCircle },
    { label: "E-mail", href: personalInfo.email && `mailto:${personalInfo.email}`, icon: Mail },
  ].filter((s) => s.href);

  return (
    <footer id="rodape" className="relative overflow-hidden border-t border-line pt-16 pb-10" {...props}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xl font-bold tracking-[-0.03em]">{personalInfo.name}</p>
            <p className="mt-1 text-muted">{personalInfo.role}</p>
          </div>

          <nav aria-label="Redes e contato">
            <ul className="flex flex-wrap gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Assinatura tipográfica gigante */}
        <p
          aria-hidden="true"
          className="footer-mark mt-16 select-none text-[clamp(3.5rem,15.5vw,13rem)] leading-[0.85] font-extrabold tracking-[-0.06em]"
        >
          Figueiredo
        </p>

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. Todos os direitos reservados.
          </p>
          <a href="#inicio" className="inline-flex min-h-11 items-center gap-2 self-start transition-colors hover:text-fg sm:self-auto">
            Voltar ao topo
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
