"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

type Country = { iso: string; name: string; dial: string };

const COUNTRIES: Country[] = [
  { iso: "ES", name: "España", dial: "+34" },
  { iso: "MX", name: "México", dial: "+52" },
  { iso: "AR", name: "Argentina", dial: "+54" },
  { iso: "CO", name: "Colombia", dial: "+57" },
  { iso: "CL", name: "Chile", dial: "+56" },
  { iso: "PE", name: "Perú", dial: "+51" },
  { iso: "VE", name: "Venezuela", dial: "+58" },
  { iso: "EC", name: "Ecuador", dial: "+593" },
  { iso: "GT", name: "Guatemala", dial: "+502" },
  { iso: "CU", name: "Cuba", dial: "+53" },
  { iso: "BO", name: "Bolivia", dial: "+591" },
  { iso: "DO", name: "Rep. Dominicana", dial: "+1" },
  { iso: "HN", name: "Honduras", dial: "+504" },
  { iso: "PY", name: "Paraguay", dial: "+595" },
  { iso: "SV", name: "El Salvador", dial: "+503" },
  { iso: "NI", name: "Nicaragua", dial: "+505" },
  { iso: "CR", name: "Costa Rica", dial: "+506" },
  { iso: "PA", name: "Panamá", dial: "+507" },
  { iso: "UY", name: "Uruguay", dial: "+598" },
  { iso: "PR", name: "Puerto Rico", dial: "+1" },
  { iso: "GQ", name: "Guinea Ecuatorial", dial: "+240" },
  { iso: "US", name: "Estados Unidos", dial: "+1" },
  { iso: "PT", name: "Portugal", dial: "+351" },
  { iso: "FR", name: "Francia", dial: "+33" },
  { iso: "GB", name: "Reino Unido", dial: "+44" },
  { iso: "DE", name: "Alemania", dial: "+49" },
  { iso: "IT", name: "Italia", dial: "+39" },
  { iso: "NL", name: "Países Bajos", dial: "+31" },
  { iso: "BE", name: "Bélgica", dial: "+32" },
  { iso: "CH", name: "Suiza", dial: "+41" },
  { iso: "IE", name: "Irlanda", dial: "+353" },
  { iso: "MA", name: "Marruecos", dial: "+212" },
  { iso: "BR", name: "Brasil", dial: "+55" },
  { iso: "CA", name: "Canadá", dial: "+1" },
];

const DEFAULT_COUNTRY = COUNTRIES[0];

function flagEmoji(iso: string): string {
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

const MINOR_WORDS = new Set([
  "a", "al", "con", "de", "del", "e", "el", "en", "la", "las", "le", "les",
  "lo", "los", "no", "o", "por", "para", "que", "sin", "u", "un", "una", "y",
]);

function titleCaseSpanishPhrase(s: string): string {
  return s
    .split(/\s+/g)
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i > 0 && MINOR_WORDS.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

const schema = z.object({
  firstName: z.string().min(2, "Introduce tu nombre"),
  lastName: z.string().min(2, "Introduce tus apellidos"),
  email: z.string().email("Email no válido"),
  phone: z
    .string()
    .min(6, "Introduce tu teléfono")
    .regex(/^[\d\s()-]{6,}$/, "Teléfono no válido"),
  company: z.string().min(2, "Introduce el nombre de tu empresa"),
  role: z.string().min(1, "Selecciona tu rol"),
  message: z.string().min(10, "Cuéntanos un poco más (mín. 10 caracteres)"),
  areas: z.array(z.string()).min(1, "Selecciona al menos una opción"),
});

type FormData = z.infer<typeof schema>;

const areaOptions = [
  "Captación y ventas",
  "Atención al cliente",
  "Operaciones internas",
  "Análisis de datos y reporting",
  "Marketing y contenidos",
  "Aún no lo tengo claro",
].map(titleCaseSpanishPhrase);

export function AuditForm({ className, darkMode }: { className?: string; darkMode?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { areas: [] },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const payload = {
        ...data,
        phone: `${country.dial} ${data.phone}`.trim(),
        phoneCountry: country.iso,
      };
      const body = JSON.stringify(payload);

      // Dispara la automatización de nutrición en paralelo (fire-and-forget):
      // si falla, no debe romper el envío principal del formulario.
      if (site.nurtureWebhookUrl && site.nurtureWebhookUrl !== "PEGA_AQUI_TU_WEBHOOK_DE_NUTRICION") {
        fetch(site.nurtureWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }).catch(() => {});
      }

      const res = await fetch(site.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) throw new Error("Error en el envío");
      setStatus("success");
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.open(site.whatsappUrl, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
    }
  };

  const dark = darkMode;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative rounded-3xl p-10 text-center md:p-14",
          dark
            ? "border border-white/10 bg-white/[0.04]"
            : "border border-line bg-surface",
          className,
        )}
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ink/[0.06] text-ink">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="heading-display text-[24px] text-ink">¡Recibido!</h3>
        <p className="mx-auto mt-3 max-w-[400px] text-[15px] leading-[1.6] text-ink/60">
          Hemos recibido tu solicitud. Te hemos escrito por WhatsApp para que hablemos directamente y coordinemos tu consultoría.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button href={site.whatsappUrl} variant="primary" size="lg" newTab>
            Abrir WhatsApp
          </Button>
          <Button href="/" variant="outline" size="lg">
            Inicio
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "relative rounded-3xl p-7 md:p-9",
        dark
          ? "border border-white/10 bg-white/[0.04]"
          : "border border-line bg-surface",
        className,
      )}
      noValidate
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Nombre"
            requiredMark
            error={errors.firstName?.message}
            {...register("firstName")}
            placeholder="Tu nombre"
            autoComplete="given-name"
          />
          <Field
            label="Apellido"
            requiredMark
            error={errors.lastName?.message}
            {...register("lastName")}
            placeholder="Tu apellido"
            autoComplete="family-name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Email"
            requiredMark
            type="email"
            error={errors.email?.message}
            {...register("email")}
            placeholder="tu@empresa.com"
            autoComplete="email"
          />
          <PhoneField
            country={country}
            onCountryChange={setCountry}
            error={errors.phone?.message}
            inputProps={register("phone")}
            dark={dark}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Empresa"
            requiredMark
            error={errors.company?.message}
            {...register("company")}
            placeholder="Nombre de tu empresa"
            autoComplete="organization"
          />
          <SelectField
            label="Tu Rol"
            requiredMark
            error={errors.role?.message}
            {...register("role")}
            options={[
              { value: "", label: "Selecciona tu rol" },
              { value: "ceo-founder", label: "CEO / Fundador" },
              { value: "cto-tech", label: "CTO / Director Técnico" },
              { value: "coo-ops", label: "COO / Director de Operaciones" },
              { value: "cmo-marketing", label: "CMO / Director de Marketing" },
              { value: "manager", label: "Manager / Responsable de Área" },
              { value: "consultant", label: "Consultor / Freelance" },
              { value: "other", label: "Otro" },
            ]}
          />
        </div>

        <TextareaField
          label="¿Qué te gustaría automatizar?"
          requiredMark
          error={errors.message?.message}
          {...register("message")}
          placeholder="Cuéntanos brevemente tu caso y qué te gustaría conseguir."
          rows={4}
        />

        <div>
          <span className={fieldLabel}>
            ¿Qué Quieres Mejorar con IA?
            <span className="font-normal text-ink/40" aria-hidden="true"> *</span>
          </span>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {areaOptions.map((area) => (
              <label
                key={area}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-[14px] transition-colors",
                  dark
                    ? "border-white/10 text-white/80 hover:border-white/20 has-[:checked]:border-white/30 has-[:checked]:bg-white/[0.04]"
                    : "border-line-strong bg-bg text-ink/80 hover:border-ink/20 has-[:checked]:border-ink has-[:checked]:bg-ink/[0.02]",
                )}
              >
                <input
                  type="checkbox"
                  value={area}
                  {...register("areas")}
                  className="h-4 w-4 rounded border-gray-300 accent-black"
                />
                {area}
              </label>
            ))}
          </div>
          {errors.areas?.message && (
            <span className="mt-2 inline-block text-[12px] text-ink/70">{errors.areas.message}</span>
          )}
        </div>

      </div>

      <div className="mt-7 flex flex-col gap-4">
        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting || status === "loading"}
            className={cn("w-full sm:w-auto", status === "loading" && "button-shimmer")}
          >
            {status === "loading" ? "Enviando…" : "Solicitar Auditoría"}
          </Button>
          <p className="text-center text-[13px] leading-snug text-ink/45 sm:hidden">
            Tus datos no se comparten ni se usan para spam.
          </p>
          <p className="hidden text-right text-[13px] leading-snug text-ink/45 sm:block sm:flex-1 sm:text-center">
            ¿Prefieres hablar directamente?{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-ink">
              {site.email}
            </a>
          </p>
        </div>

        {status === "error" && (
          <p className="rounded-xl bg-bg p-3 text-center text-[13px] text-ink/80 ring-1 ring-line">
            No hemos podido enviar el formulario. Escríbenos a{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </motion.form>
  );
}

const fieldBase =
  "h-12 w-full rounded-xl border border-line-strong bg-bg px-4 text-[14px] text-ink placeholder:text-ink/35 transition-colors focus-visible:border-ink focus-visible:outline-none";

const fieldLabel =
  "mb-2 inline-block text-[10px] uppercase tracking-[0.18em] text-muted";

function LabelRow({ label, requiredMark }: { label: string; requiredMark?: boolean }) {
  return (
    <span className={fieldLabel}>
      {label}
      {requiredMark ? (
        <span className="font-normal text-ink/40" aria-hidden="true"> *</span>
      ) : null}
    </span>
  );
}

const Field = function Field({
  label,
  error,
  requiredMark,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  requiredMark?: boolean;
}) {
  return (
    <label className="block">
      <LabelRow label={label} requiredMark={requiredMark} />
      <input
        {...props}
        aria-invalid={error ? true : undefined}
        className={cn(fieldBase, error && "border-ink", className)}
      />
      {error && (
        <span className="mt-1.5 inline-block text-[12px] text-ink/70">{error}</span>
      )}
    </label>
  );
};

const TextareaField = function TextareaField({
  label,
  error,
  requiredMark,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  requiredMark?: boolean;
}) {
  return (
    <label className="block">
      <LabelRow label={label} requiredMark={requiredMark} />
      <textarea
        {...props}
        aria-invalid={error ? true : undefined}
        className={cn(
          fieldBase,
          "h-auto py-3 leading-[1.55] resize-none",
          error && "border-ink",
          className,
        )}
      />
      {error && (
        <span className="mt-1.5 inline-block text-[12px] text-ink/70">{error}</span>
      )}
    </label>
  );
};

function PhoneField({
  country,
  onCountryChange,
  error,
  inputProps,
  dark,
}: {
  country: Country;
  onCountryChange: (c: Country) => void;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <label className="block">
      <LabelRow label="Teléfono" requiredMark />
      <div
        ref={ref}
        className={cn(
          "relative flex h-12 w-full items-stretch rounded-xl border border-line-strong bg-bg transition-colors focus-within:border-ink",
          error && "border-ink",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex shrink-0 items-center gap-1.5 rounded-l-xl border-r border-line-strong px-3 text-[14px] text-ink transition-colors hover:bg-ink/[0.03]"
        >
          <span className="text-[16px] leading-none" aria-hidden="true">
            {flagEmoji(country.iso)}
          </span>
          <span className="tabular-nums">{country.dial}</span>
          <svg viewBox="0 0 12 8" className="h-2 w-3 text-ink/50">
            <path
              d="M1 1 L6 6 L11 1"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
        <input
          {...inputProps}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="600 000 000"
          aria-invalid={error ? true : undefined}
          className="h-full w-full min-w-0 rounded-r-xl bg-transparent px-4 text-[14px] text-ink placeholder:text-ink/35 focus:outline-none"
        />

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute left-0 top-[calc(100%+6px)] z-20 max-h-64 w-full min-w-[240px] overflow-y-auto rounded-xl border p-1.5 shadow-xl",
                dark
                  ? "border-white/10 bg-[#111]"
                  : "border-line-strong bg-bg",
              )}
            >
              {COUNTRIES.map((c) => (
                <li key={c.iso}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={c.iso === country.iso}
                    onClick={() => {
                      onCountryChange(c);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[14px] transition-colors hover:bg-ink/[0.05]",
                      c.iso === country.iso && "bg-ink/[0.05]",
                    )}
                  >
                    <span className="text-[16px] leading-none" aria-hidden="true">
                      {flagEmoji(c.iso)}
                    </span>
                    <span className="flex-1 truncate text-ink/80">{c.name}</span>
                    <span className="tabular-nums text-ink/45">{c.dial}</span>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {error && (
        <span className="mt-1.5 inline-block text-[12px] text-ink/70">{error}</span>
      )}
    </label>
  );
}

const SelectField = function SelectField({
  label,
  options,
  error,
  requiredMark,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  requiredMark?: boolean;
}) {
  return (
    <label className="block">
      <LabelRow label={label} requiredMark={requiredMark} />
      <div className="relative">
        <select
          {...props}
          aria-invalid={error ? true : undefined}
          className={cn(fieldBase, "appearance-none pr-10", error && "border-ink", className)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/50">
          <svg viewBox="0 0 12 8" className="h-2 w-3">
            <path
              d="M1 1 L6 6 L11 1"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </span>
      </div>
      {error && <span className="mt-1.5 inline-block text-[12px] text-ink/70">{error}</span>}
    </label>
  );
};
