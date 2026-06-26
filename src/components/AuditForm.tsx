"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

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
      const res = await fetch(site.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

        <Field
          label="Email"
          requiredMark
          type="email"
          error={errors.email?.message}
          {...register("email")}
          placeholder="tu@empresa.com"
          autoComplete="email"
        />

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
