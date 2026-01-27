'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjdzlld';

export default function ContactPage() {
  const { language } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Have a question, feedback, or just want to say hi? We\'d love to hear from you.',
      backToSupport: 'Back to Support',
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@example.com',
        subject: 'Subject',
        subjectPlaceholder: 'What is this about?',
        message: 'Message',
        messagePlaceholder: 'Tell us what\'s on your mind...',
        submit: 'Send Message',
        submitting: 'Sending...',
        error: 'Something went wrong. Please try again or email us directly.',
      },
      success: {
        title: 'Message Sent!',
        message: 'Thanks for reaching out. We\'ll get back to you as soon as possible.',
        another: 'Send Another Message',
      },
      alternatives: {
        title: 'Other Ways to Reach Us',
        github: {
          title: 'GitHub Issues',
          description: 'Found a bug or have a feature request? Open an issue on GitHub.',
          link: 'Open an Issue',
        },
        docs: {
          title: 'Documentation',
          description: 'Looking for help using the tool? Check our docs first.',
          link: 'View Documentation',
        },
      },
    },
    es: {
      title: 'Contáctanos',
      subtitle: '¿Tienes alguna pregunta, comentario o simplemente quieres saludar? Nos encantaría saber de ti.',
      backToSupport: 'Volver a Soporte',
      form: {
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Correo',
        emailPlaceholder: 'tu@ejemplo.com',
        subject: 'Asunto',
        subjectPlaceholder: '¿De qué se trata?',
        message: 'Mensaje',
        messagePlaceholder: 'Cuéntanos qué tienes en mente...',
        submit: 'Enviar Mensaje',
        submitting: 'Enviando...',
        error: 'Algo salió mal. Por favor intenta de nuevo o escríbenos directamente.',
      },
      success: {
        title: '¡Mensaje Enviado!',
        message: 'Gracias por escribirnos. Te responderemos lo antes posible.',
        another: 'Enviar Otro Mensaje',
      },
      alternatives: {
        title: 'Otras Formas de Contactarnos',
        github: {
          title: 'Issues de GitHub',
          description: '¿Encontraste un bug o tienes una solicitud de función? Abre un issue en GitHub.',
          link: 'Abrir un Issue',
        },
        docs: {
          title: 'Documentación',
          description: '¿Buscas ayuda usando la herramienta? Revisa nuestra documentación primero.',
          link: 'Ver Documentación',
        },
      },
    },
  };

  const t = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('regarding', formState.subject);  // Renamed from 'subject' to avoid conflict with _subject
      formData.append('message', formState.message);
      formData.append('_subject', `AI Idea Validator: ${formState.subject}`);
      formData.append('_template', 'table');
      formData.append('source', 'AI Idea Validator - Contact Page');
      formData.append('language', language.toUpperCase());

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/support"
          className="mb-8 inline-flex items-center text-sm text-neutral-600 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          {t.backToSupport}
        </Link>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            {t.subtitle}
          </p>
        </div>

        {submitted ? (
          /* Success State */
          <div className="mt-12 rounded-lg border border-green-200 bg-green-50 p-8 text-center dark:border-green-900/50 dark:bg-green-950/30">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-green-600 dark:text-green-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-white">
              {t.success.title}
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              {t.success.message}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormState({ name: '', email: '', subject: '', message: '' });
              }}
              className="mt-6 inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              {t.success.another}
            </button>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-900 dark:text-white">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  placeholder={t.form.namePlaceholder}
                  className="mt-2 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-400 dark:focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-900 dark:text-white">
                  {t.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  placeholder={t.form.emailPlaceholder}
                  className="mt-2 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-400 dark:focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-900 dark:text-white">
                {t.form.subject}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formState.subject}
                onChange={handleChange}
                placeholder={t.form.subjectPlaceholder}
                className="mt-2 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-400 dark:focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-900 dark:text-white">
                {t.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formState.message}
                onChange={handleChange}
                placeholder={t.form.messagePlaceholder}
                className="mt-2 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-400 dark:focus:border-orange-500"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                {t.form.error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-neutral-900"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.form.submitting}
                </span>
              ) : (
                t.form.submit
              )}
            </button>
          </form>
        )}

        {/* Alternative Contact Methods */}
        <div className="mt-16">
          <h2 className="text-center text-lg font-semibold text-neutral-900 dark:text-white">
            {t.alternatives.title}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <a
              href="https://github.com/RCushmaniii/ai-idea-validator/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-neutral-200 bg-neutral-50 p-6 transition-all hover:border-orange-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-orange-700"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-white">
                    {t.alternatives.github.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {t.alternatives.github.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
                {t.alternatives.github.link}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </a>

            <Link
              href="/docs"
              className="group rounded-lg border border-neutral-200 bg-neutral-50 p-6 transition-all hover:border-orange-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-orange-700"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-white">
                    {t.alternatives.docs.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {t.alternatives.docs.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
                {t.alternatives.docs.link}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
