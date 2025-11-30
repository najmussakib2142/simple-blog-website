"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function TermsOfService() {
  // Define content structure using SimpleBlog in the introduction
  const termsContent = useMemo(() => [
    {
      type: "paragraph",
      content: "Welcome to SimpleBlog. These Terms of Service (\"Terms\") govern your access to and use of our website and services (the \"Blog\"). By accessing or using the Blog, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.",
    },
    {
      type: "heading",
      level: 2,
      content: "1. Acceptance of Terms",
    },
    {
      type: "paragraph",
      content: "By creating an account or accessing the Blog, you confirm that you are at least 18 years old or possess legal parental or guardian consent, and are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms.",
    },
    {
      type: "heading",
      level: 2,
      content: "2. Intellectual Property Rights",
    },
    {
      type: "paragraph",
      content: "The content on SimpleBlog, including text, graphics, images, and information, is the property of SimpleBlog and protected by copyright and other intellectual property laws. You may access the content for your personal, non-commercial use only.",
    },
    {
      type: "list",
      items: [
        "You may not copy, reproduce, distribute, or create derivative works from our content without explicit written permission.",
        "You retain rights to any content you submit, but grant SimpleBlog a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, publish, and distribute your content on the Blog.",
      ],
    },
    {
      type: "heading",
      level: 2,
      content: "3. User Conduct and Usage Rules",
    },
    {
      type: "list",
      items: [
        "You agree not to use the Blog for any unlawful purpose or in any way that violates these Terms.",
        "You must not submit content that is defamatory, abusive, harassing, hateful, or otherwise objectionable.",
        "We reserve the right to monitor, edit, or remove any content or comments that we deem inappropriate or in violation of these Terms, without prior notice.",
      ],
    },
    {
      type: "heading",
      level: 2,
      content: "4. Disclaimer of Warranties",
    },
    {
      type: "paragraph",
      content: "The content on SimpleBlog is provided for informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the content. Any reliance you place on such information is strictly at your own risk. **The Blog is provided on an \"AS IS\" and \"AS AVAILABLE\" basis.**",
    },
    {
      type: "heading",
      level: 2,
      content: "5. Governing Law",
    },
    {
      type: "paragraph",
      content: "These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.",
    },
  ], []);

  // Tailwind classes for the consistent black and white theme
  const containerClasses = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12  text-gray-900 ";
  const titleClasses = "text-4xl font-extrabold mb-8 border-b-2 border-gray-900 pb-3";
  const h2Classes = "text-3xl font-bold mt-10 mb-4";
  const h3Classes = "text-2xl font-semibold mt-8 mb-3";
  const paragraphClasses = "mb-6 leading-relaxed";
  const listClasses = "list-disc ml-8 space-y-3 mb-6";
  const linkClasses = "text-gray-900 font-medium underline hover:text-gray-700 transition duration-150 ease-in-out";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={containerClasses}>
        <h1 className={titleClasses}>Terms of Service</h1>

        {termsContent.map((block, index) => {
          if (block.type === "paragraph") {
            return <p key={index} className={paragraphClasses}>{block.content}</p>;
          }
          if (block.type === "heading") {
            if (block.level === 2) {
              return <h2 key={index} className={h2Classes}>{block.content}</h2>;
            }
            if (block.level === 3) {
              return <h3 key={index} className={h3Classes}>{block.content}</h3>;
            }
          }
          if (block.type === "list") {
            return (
              <ul key={index} className={listClasses}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          }
          return null;
        })}

        <div className="mt-10 pt-6 border-t border-gray-300">
          <h3 className={h3Classes}>Questions</h3>
          <p className={paragraphClasses}>
            For any questions or concerns regarding these Terms of Service, please contact us.
          </p>
          {/* <Link href="/contact" className={linkClasses}>
            Visit our Contact Page
          </Link> */}
          <p className="mt-4 text-sm text-gray-600">
            *These Terms are effective as of November 30, 2025.*
          </p>
        </div>
      </div>
    </div>
  );
}