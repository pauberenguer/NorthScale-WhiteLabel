import { NextResponse } from "next/server";
import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(2).optional(),
  company: z.string().min(2).optional(),
  email: z.string().email(),
  budget: z.string().optional(),
  message: z.string().min(10),
});

const fullSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  website: z.string().optional(),
  role: z.string().min(1),
  companySize: z.string().optional(),
  revenue: z.string().optional(),
  budget: z.string().min(1),
  message: z.string().min(10),
  areas: z.array(z.string()).min(1),
  extra: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const isFullForm = "firstName" in json;
    const data = isFullForm ? fullSchema.parse(json) : baseSchema.parse(json);

    // ───────────────────────────────────────────────────────────────────
    // For now we just log the submission server-side. To enable real
    // delivery in production, install resend and uncomment the block
    // below, then set RESEND_API_KEY and CONTACT_TO in your env.
    //
    //   npm install resend
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Pau Solutions <hola@tudominio.com>",
    //   to: process.env.CONTACT_TO ?? "hola@tudominio.com",
    //   subject: isFullForm
    //     ? `Nuevo contacto — ${(data as any).company}`
    //     : `Nueva auditoría — ${(data as any).company ?? "Sin empresa"}`,
    //   replyTo: data.email,
    //   text: JSON.stringify(data, null, 2),
    // });
    // ───────────────────────────────────────────────────────────────────

    console.log("[contact] new submission", data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, errors: err.flatten() },
        { status: 422 },
      );
    }
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 },
    );
  }
}
