import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100dvh-80px)] flex-col items-center justify-center px-6 py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(200px,40vw,500px)] font-display font-bold leading-none text-line select-none">
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted mb-4">
          Página no encontrada
        </p>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-display font-bold leading-[1.1] tracking-tight text-ink mb-6">
          Esta ruta no existe
        </h1>
        <p className="text-base text-muted leading-relaxed mb-10 max-w-md">
          Puede que la página haya sido movida, eliminada o que la URL sea
          incorrecta. Vuelve al inicio para seguir navegando.
        </p>

        <Button href="/" variant="primary" size="lg">
          Inicio
        </Button>
      </div>
    </section>
  );
}
