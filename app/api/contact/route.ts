import { NextResponse } from "next/server";

const CONTACT_RECIPIENT = "henrybenjamin.dev@gmail.com";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanEnvValue(value: string | undefined) {
  return value?.trim().replace(/^["']|["']$/g, "") ?? "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Não foi possível ler os dados do formulário." },
      { status: 400 },
    );
  }

  const name = normalizeField(payload.name);
  const email = normalizeField(payload.email);
  const subject = normalizeField(payload.subject);
  const message = normalizeField(payload.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { message: "Preencha todos os campos antes de enviar." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Informe um e-mail válido para contato." },
      { status: 400 },
    );
  }

  const resendApiKey = cleanEnvValue(process.env.RESEND_API_KEY);
  const fromEmail =
    cleanEnvValue(process.env.CONTACT_FROM_EMAIL) || "Henry Dev <onboarding@resend.dev>";

  if (!resendApiKey) {
    return NextResponse.json(
      { message: "A chave de envio de e-mail ainda não foi configurada no servidor." },
      { status: 500 },
    );
  }

  const emailSubject = `Novo contato pelo portfólio: ${subject}`;
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedSubject = escapeHtml(subject);
  const escapedMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: CONTACT_RECIPIENT,
      reply_to: email,
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h1 style="font-size: 20px;">Novo contato pelo portfólio</h1>
          <p><strong>Nome:</strong> ${escapedName}</p>
          <p><strong>E-mail:</strong> ${escapedEmail}</p>
          <p><strong>Assunto:</strong> ${escapedSubject}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${escapedMessage}</p>
        </div>
      `,
      text: [
        "Novo contato pelo portfólio",
        `Nome: ${name}`,
        `E-mail: ${email}`,
        `Assunto: ${subject}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Não foi possível enviar a mensagem agora." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Mensagem enviada com sucesso." });
}
