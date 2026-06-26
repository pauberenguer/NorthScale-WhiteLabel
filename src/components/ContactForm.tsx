"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { site, finalCTA } from "@/lib/content";
import { cn } from "@/lib/utils";

const MINOR_WORDS = new Set([
  "a",
  "al",
  "con",
  "de",
  "del",
  "e",
  "el",
  "en",
  "la",
  "las",
  "le",
  "les",
  "lo",
  "los",
  "no",
  "o",
  "por",
  "para",
  "que",
  "sin",
  "u",
  "un",
  "una",
  "y",
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
  website: z.string().optional(),
  role: z.string().min(1, "Selecciona tu rol"),
  companySize: z.string().optional(),
  revenue: z.string().optional(),
  budget: z.string().min(1, "Selecciona el presupuesto"),
  message: z.string().min(10, "Cuéntanos un poco más (mín. 10 caracteres)"),
  areas: z.array(z.string()).min(1, "Selecciona al menos una opción"),
  extra: z.string().optional(),
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

export function ContactForm() {
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
      window.open(finalCTA.calendarUrl, "_blank", "noopener,noreferrer");
      const res = await fetch(site.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error en el envío");
      setStatus("success");
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-line bg-surface/50 p-12 text-center"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ink/[0.06] text-ink">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="heading-display text-[24px] text-ink">¡Recibido!</h3>
        <p className="mx-auto mt-3 max-w-[400px] text-[15px] leading-[1.6] text-ink/60">
          Hemos recibido tu solicitud correctamente. Agenda tu consultoría gratuita en la ventana que acabamos de abrir.
        </p>
        <div className="mt-6">
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
      className="space-y-7"
      noValidate
    >
      {/* Nombre + Apellidos */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Nombre"
          requiredMark
          error={errors.firstName?.message}
          {...register("firstName")}
          placeholder="Tu nombre"
          autoComplete="given-name"
        />
        <Field
          label="Apellidos"
          requiredMark
          error={errors.lastName?.message}
          {...register("lastName")}
          placeholder="Tus apellidos"
          autoComplete="family-name"
        />
      </div>

      {/* Email */}
      <Field
        label="Email"
        requiredMark
        type="email"
        error={errors.email?.message}
        {...register("email")}
        placeholder="tu@empresa.com"
        autoComplete="email"
      />

      {/* Empresa + Web */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Empresa"
          requiredMark
          error={errors.company?.message}
          {...register("company")}
          placeholder="Nombre de tu empresa"
          autoComplete="organization"
        />
        <Field
          label="Web de la Empresa"
          {...register("website")}
          placeholder="https://tuempresa.com"
          autoComplete="url"
        />
      </div>

      {/* Rol */}
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

      {/* Tamaño + Facturación */}
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Tamaño de Empresa"
          error={errors.companySize?.message}
          {...register("companySize")}
          options={[
            { value: "", label: "Selecciona tamaño" },
            { value: "1-5", label: "1 — 5 personas" },
            { value: "6-20", label: "6 — 20 personas" },
            { value: "21-50", label: "21 — 50 personas" },
            { value: "51-200", label: "51 — 200 personas" },
            { value: "200+", label: "Más de 200 personas" },
          ]}
        />
        <SelectField
          label="Facturación Anual"
          error={errors.revenue?.message}
          {...register("revenue")}
          options={[
            { value: "", label: "Selecciona rango" },
            { value: "<500k", label: "Menos de 500.000 €" },
            { value: "500k-2m", label: "500.000 € — 2M €" },
            { value: "2m-10m", label: "2M € — 10M €" },
            { value: "10m+", label: "Más de 10M €" },
          ]}
        />
      </div>

      {/* Presupuesto */}
      <SelectField
        label="Presupuesto del Proyecto"
        requiredMark
        error={errors.budget?.message}
        {...register("budget")}
        options={[
          { value: "", label: "Selecciona rango de presupuesto" },
          { value: "<5k", label: "Menos de 5.000 €" },
          { value: "5-15k", label: "5.000 € — 15.000 €" },
          { value: "15-30k", label: "15.000 € — 30.000 €" },
          { value: "30-60k", label: "30.000 € — 60.000 €" },
          { value: ">60k", label: "Más de 60.000 €" },
          { value: "no-idea", label: titleCaseSpanishPhrase("Aún no lo tengo claro") },
        ]}
      />

      {/* Mensaje */}
      <TextareaField
        label="¿Cómo Podemos Ayudarte?"
        requiredMark
        error={errors.message?.message}
        {...register("message")}
        placeholder="Cuéntanos qué te gustaría conseguir..."
        rows={4}
      />

      {/* Áreas - checkboxes */}
      <div>
        <span className={fieldLabel}>
          ¿Qué Quieres Mejorar con IA o Automatización?
          <span className="font-normal text-warn" aria-hidden="true">
            {" "}
            *
          </span>
        </span>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {areaOptions.map((area) => (
            <label
              key={area}
              className="flex cursor-pointer items-center gap-3 rounded-sm border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink/80 transition-colors hover:border-gray-300 has-[:checked]:border-black has-[:checked]:bg-ink/[0.02]"
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
          <span className="mt-2 inline-block text-[12px] text-warn">{errors.areas.message}</span>
        )}
      </div>

      {/* Extra */}
      <TextareaField
        label="¿Algo más que Debamos Saber?"
        {...register("extra")}
        placeholder="Contexto adicional, preguntas, preferencias de horario..."
        rows={3}
      />

      {/* Submit + contacto directo */}
      <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="order-2 text-[13px] leading-snug text-ink/45 md:order-1 md:max-w-[min(100%,28rem)]">
          ¿Prefieres hablar directamente? Escríbenos a{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline underline-offset-4 decoration-ink/20 hover:decoration-ink/50"
          >
            {site.email}
          </a>
        </p>
        <div className="order-1 flex justify-end md:order-2 md:shrink-0">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting || status === "loading"}
            className={status === "loading" ? "button-shimmer" : undefined}
          >
            {status === "loading" ? "Enviando…" : "Enviar Solicitud"}
          </Button>
        </div>
      </div>

      {status === "error" && (
        <p className="rounded-sm bg-surface p-4 text-center text-[13px] text-ink/80 ring-1 ring-line">
          No hemos podido enviar el formulario. Escríbenos a{" "}
          <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </motion.form>
  );
}

const fieldLabel =
  "mb-2 inline-block text-[13px] font-medium text-ink/70";

const fieldBase =
  "h-12 w-full rounded-sm border border-gray-200 bg-white px-4 text-[14px] text-ink placeholder:text-ink/35 outline-none transition-[border-color] duration-150 hover:border-gray-300 focus:border-black";

function LabelRow({ label, requiredMark }: { label: string; requiredMark?: boolean }) {
  return (
    <span className={fieldLabel}>
      {label}
      {requiredMark ? (
        <span className="font-normal text-warn" aria-hidden="true">
          {" "}
          *
        </span>
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
  /** Asterisco obligatorio (rojo estilo AutoSetter) */
  requiredMark?: boolean;
}) {
  return (
    <label className="block">
      <LabelRow label={label} requiredMark={requiredMark} />
      <input
        {...props}
        aria-invalid={error ? true : undefined}
        className={cn(
          fieldBase,
          error && "border-warn focus:border-black",
          className,
        )}
      />
      {error && <span className="mt-1.5 inline-block text-[12px] text-warn">{error}</span>}
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
          error && "border-warn focus:border-black",
          className,
        )}
      />
      {error && <span className="mt-1.5 inline-block text-[12px] text-warn">{error}</span>}
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
          className={cn(fieldBase, "appearance-none pr-10", error && "border-warn focus:border-black", className)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/50">
          <svg viewBox="0 0 12 8" className="h-2 w-3">
            <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </span>
      </div>
      {error && <span className="mt-1.5 inline-block text-[12px] text-warn">{error}</span>}
    </label>
  );
};
