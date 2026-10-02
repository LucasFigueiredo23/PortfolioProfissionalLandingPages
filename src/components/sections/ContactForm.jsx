import { useId, useRef, useState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, MessageCircle, ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { formOptions } from "../../data/content";
import { formConfig } from "../../data/personal";
import { whatsappLink } from "../../lib/whatsapp";
import { cn } from "../../lib/cn";

const initial = {
  name: "",
  email: "",
  whatsapp: "",
  projectType: "",
  budget: "",
  message: "",
  company: "",
  goal: "",
  deadline: "",
  references: "",
  website: "", // honeypot anti-spam: humanos não veem este campo
};

// Ordem usada para focar o primeiro campo com erro
const fieldOrder = ["name", "email", "whatsapp", "projectType", "message"];

function validate(v) {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = "Digite seu nome.";
  const email = v.email.trim();
  const phone = v.whatsapp.replace(/\D/g, "");
  if (!email && !phone) errors.email = "Informe um e-mail ou um WhatsApp para eu conseguir responder.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Esse e-mail parece incompleto. Confira o @ e o domínio.";
  if (phone && (phone.length < 10 || phone.length > 13)) errors.whatsapp = "Use DDD + número, ex.: (91) 98765-4321.";
  if (!v.projectType) errors.projectType = "Escolha o tipo de projeto.";
  if (v.message.trim().length < 10) errors.message = "Conte um pouco mais sobre o projeto (pelo menos 10 caracteres).";
  return errors;
}

function buildWhatsAppMessage(v) {
  const line = (label, value) => (value ? `*${label}:* ${value}` : null);
  return [
    "Olá, Lucas! Vim pelo seu portfólio e quero conversar sobre um projeto.",
    "",
    line("Nome", v.name),
    line("Empresa/projeto", v.company),
    line("Tipo", v.projectType),
    line("Objetivo", v.goal),
    line("Prazo", v.deadline),
    line("Investimento", v.budget),
    line("E-mail", v.email),
    line("Referências", v.references),
    "",
    v.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [sentVia, setSentVia] = useState("endpoint");
  const [waUrl, setWaUrl] = useState("");
  const formRef = useRef(null);
  const uid = useId();

  const errors = validate(values);
  const showError = (name) => (touched[name] ? errors[name] : undefined);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (status === "error") setStatus("idle");
  };
  const blur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return; // bot preencheu o honeypot

    if (Object.keys(errors).length) {
      setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
      const first = fieldOrder.find((f) => errors[f]);
      formRef.current?.elements[first]?.focus();
      return;
    }

    // Sem endpoint configurado: monta a mensagem e abre o WhatsApp.
    if (!formConfig.endpoint) {
      const url = whatsappLink(buildWhatsAppMessage(values));
      setWaUrl(url);
      setSentVia("whatsapp");
      window.open(url, "_blank", "noopener");
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const { website, ...payload } = values;
      const res = await fetch(formConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, ...formConfig.extraFields, subject: `Novo briefing: ${values.name}` }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSentVia("endpoint");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(initial);
    setTouched({});
    setStatus("idle");
  };

  return (
    <section id="briefing" aria-labelledby="briefing-title" className="relative pb-28 md:pb-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="briefing-title" className="type-h2">
              Conte sobre o seu projeto
            </h2>
            <p className="mt-5 text-muted">
              Leva uns dois minutos. Com essas respostas eu entendo o contexto e volto com os próximos passos e, se fizer
              sentido, uma proposta.
            </p>
            <p className="mt-6 text-sm text-muted">
              Campos com <span className="text-fg">*</span> são obrigatórios.
            </p>
            <Button href={whatsappLink()} variant="secondary" icon={MessageCircle} className="mt-8">
              Prefiro conversar no WhatsApp
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={80}>
          {status === "success" ? (
            <div role="status" className="rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.04] p-8 sm:p-10">
              <CircleCheck aria-hidden="true" className="size-8 text-emerald-300" />
              {sentVia === "whatsapp" ? (
                <>
                  <p className="mt-5 text-2xl font-bold tracking-[-0.03em]">Briefing pronto ✓</p>
                  <p className="mt-2 max-w-lg text-muted">
                    Abri o WhatsApp com tudo preenchido. É só enviar a mensagem por lá.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button href={waUrl} icon={MessageCircle}>
                      Abrir WhatsApp de novo
                    </Button>
                    <Button variant="secondary" onClick={reset}>
                      Preencher outro briefing
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-5 text-2xl font-bold tracking-[-0.03em]">Mensagem enviada ✓</p>
                  <p className="mt-2 max-w-lg text-muted">
                    Recebi seu briefing. Vou ler com calma e responder pelo contato que você deixou.
                  </p>
                  <Button variant="secondary" onClick={reset} className="mt-8">
                    Enviar outro briefing
                  </Button>
                </>
              )}
            </div>
          ) : (
            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              className="rounded-3xl border border-line bg-surface/60 p-5 sm:p-8"
              aria-describedby={status === "error" ? `${uid}-form-error` : undefined}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={`${uid}-name`} label="Nome" required error={showError("name")} className="sm:col-span-2">
                  <input name="name" type="text" autoComplete="name" value={values.name} onChange={update} onBlur={blur} placeholder="Como posso te chamar?" />
                </Field>

                <Field id={`${uid}-email`} label="E-mail" error={showError("email")} hint="E-mail ou WhatsApp: pelo menos um.">
                  <input name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={update} onBlur={blur} placeholder="voce@empresa.com" />
                </Field>

                <Field id={`${uid}-whatsapp`} label="WhatsApp" error={showError("whatsapp")}>
                  <input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" value={values.whatsapp} onChange={update} onBlur={blur} placeholder="(91) 90000-0000" />
                </Field>

                <Field id={`${uid}-type`} label="Tipo de projeto" required error={showError("projectType")}>
                  <select name="projectType" value={values.projectType} onChange={update} onBlur={blur}>
                    <option value="" disabled>Selecione</option>
                    {formOptions.projectType.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>

                <Field id={`${uid}-budget`} label="Faixa de investimento" optional>
                  <select name="budget" value={values.budget} onChange={update}>
                    <option value="">Selecione</option>
                    {formOptions.budget.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>

                <Field id={`${uid}-message`} label="Mensagem" required error={showError("message")} className="sm:col-span-2">
                  <textarea name="message" rows={5} value={values.message} onChange={update} onBlur={blur} placeholder="O que você vende, para quem, e o que espera que a página faça." />
                </Field>
              </div>

              {/* Campos extras recolhidos para o formulário não parecer longo */}
              <details className="group mt-6 rounded-2xl border border-line">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 text-sm font-medium text-muted transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
                  Adicionar mais detalhes (opcional)
                  <ChevronDown aria-hidden="true" className="size-4 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="grid gap-5 border-t border-line p-4 sm:grid-cols-2">
                  <Field id={`${uid}-company`} label="Empresa / projeto" optional>
                    <input name="company" type="text" autoComplete="organization" value={values.company} onChange={update} placeholder="Nome da marca" />
                  </Field>
                  <Field id={`${uid}-goal`} label="Objetivo principal" optional>
                    <select name="goal" value={values.goal} onChange={update}>
                      <option value="">Selecione</option>
                      {formOptions.goal.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field id={`${uid}-deadline`} label="Prazo" optional>
                    <select name="deadline" value={values.deadline} onChange={update}>
                      <option value="">Selecione</option>
                      {formOptions.deadline.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field id={`${uid}-refs`} label="Referências" optional>
                    <input name="references" type="text" inputMode="url" value={values.references} onChange={update} placeholder="Sites ou perfis que você curte" />
                  </Field>
                </div>
              </details>

              {/* Honeypot */}
              <div aria-hidden="true" className="absolute left-[-9999px]">
                <label>
                  Não preencha
                  <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
                </label>
              </div>

              {status === "error" && (
                <p id={`${uid}-form-error`} role="alert" className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-400/30 bg-red-400/[0.06] p-4 text-sm text-red-200">
                  <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <span>
                    Algo deu errado. Tente novamente.{" "}
                    <a href={whatsappLink(buildWhatsAppMessage(values))} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
                      Ou envie pelo WhatsApp
                    </a>
                    .
                  </span>
                </p>
              )}

              <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">
                  {formConfig.endpoint ? "Seus dados são usados só para responder este contato." : "Ao enviar, o WhatsApp abre com o briefing preenchido."}
                </p>
                <Button type="submit" size="lg" arrow={status !== "sending"} disabled={status === "sending"} className="sm:min-w-56">
                  {status === "sending" ? (
                    <span className="inline-flex items-center gap-2">
                      <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    "Enviar briefing"
                  )}
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Label + campo + mensagem de erro/dica ligados por id e aria-describedby. */
function Field({ id, label, required, optional, error, hint, className, children }) {
  const describedBy = [error && `${id}-error`, hint && !error && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-violet-soft" aria-hidden="true">*</span>}
        {optional && <span className="ml-1.5 font-normal text-muted">(opcional)</span>}
      </label>
      {cloneField(children, { id, describedBy, invalid: Boolean(error), required })}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-red-300">
          <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

function cloneField(child, { id, describedBy, invalid, required }) {
  const Tag = child.type;
  return (
    <Tag
      {...child.props}
      id={id}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      aria-required={required || undefined}
      className={cn("field", child.props.className)}
    />
  );
}
