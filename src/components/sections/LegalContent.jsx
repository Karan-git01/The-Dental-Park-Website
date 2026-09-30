// src/components/sections/LegalContent.jsx
// Shared layout for long-form legal pages (Privacy Policy, Terms of Use).
// Each section: { id, title, paragraphs?: string[], items?: string[] }

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

export function LegalContent({ updated, intro, sections }) {
  return (
    <section className="bg-white px-1.5 py-16 lg:py-24">
      <div className="mx-auto max-w-[720px] px-6">
        <p className="text-[14px] text-body">Last updated {updated}</p>

        {intro ? <p className="mt-4 text-[18px] leading-[1.7] text-ink">{intro}</p> : null}

        <nav aria-label="On this page" className="mt-10">
          <p className="text-[15px] font-semibold text-ink">On this page</p>
          <ul className="mt-3 space-y-1.5">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`rounded-sm text-[15px] text-body underline-offset-4 transition-colors duration-200 hover:text-brand hover:underline motion-reduce:transition-none ${focusRing}`}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="mt-14 scroll-mt-28"
          >
            <h2 id={`${section.id}-heading`} className="text-[22px] font-semibold leading-[1.3] text-ink">
              {section.title}
            </h2>

            {section.paragraphs?.map((text) => (
              <p key={text} className="mt-4 text-[16px] leading-[1.8] text-body">
                {text}
              </p>
            ))}

            {section.items?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.75] text-body marker:text-brand">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </section>
  );
}