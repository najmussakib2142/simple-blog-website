"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function PrivacyPolicy() {
  // Define a simple, clean structure for the policy content
  const policyContent = useMemo(() => [
    {
      type: "paragraph",
      // *** MODIFIED THIS LINE TO INCLUDE "SimpleBlog" ***
      content: "Your privacy is of paramount importance to us. This Privacy Policy details how SimpleBlog (the \"Blog\", \"we\", \"us\", or \"our\") collects, uses, protects, and discloses information that results from your use of our website.",
    },
    {
      type: "heading",
      level: 2,
      content: "Information We Collect",
    },
    {
      type: "list",
      items: [
        "**Personal Information:** We may collect personally identifiable information that you voluntarily provide to us, such as your email address when you subscribe to a newsletter, or your name/email if you leave a comment.",
        "**Non-Personal Information:** We automatically collect non-personal data when you access the Blog. This includes log data (IP address, browser type, pages visited, time spent on pages, etc.), and information collected through tracking technologies like cookies (see the 'Cookies' section below).",
      ],
    },
    {
      type: "heading",
      level: 2,
      content: "How We Use Your Information",
    },
    {
      type: "list",
      items: [
        "To operate and maintain the Blog, including monitoring usage and troubleshooting technical issues.",
        "To send you newsletters, updates, or other promotional materials, if you have opted-in to receive them.",
        "To personalize and enhance your user experience and improve our content offerings.",
        "To respond to your comments or inquiries.",
      ],
    },
    {
      type: "heading",
      level: 2,
      content: "Cookies and Tracking Technologies",
    },
    {
      type: "paragraph",
      content: "The Blog uses \"cookies\" to enhance your experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent. Note that some parts of the Blog may not function properly if you do so.",
    },
    {
      type: "heading",
      level: 2,
      content: "Third-Party Services",
    },
    {
      type: "paragraph",
      content: "We may use third-party service providers (e.g., analytics services, email marketing platforms) to help us operate our business and the Blog or administer activities on our behalf. These third parties have their own privacy policies for their use of information.",
    },
    {
      type: "heading",
      level: 2,
      content: "Changes to This Privacy Policy",
    },
    {
      type: "paragraph",
      content: "We reserve the right to update or change our Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page. Your continued use of the Blog after we post any modifications will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy. *Last updated: November 30, 2025.*",
    },
  ], []);

  // Tailwind classes for the black and white theme
  const containerClasses = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12  text-gray-900 ";
  const titleClasses = "text-4xl font-extrabold mb-8 border-b-2 border-gray-900 pb-3";
  const h2Classes = "text-3xl font-bold mt-10 mb-4";
  const h3Classes = "text-2xl font-semibold mt-8 mb-3";
  const paragraphClasses = "mb-6 leading-relaxed";
  const listClasses = "list-disc ml-8 space-y-3 mb-6";
  const linkClasses = "text-gray-900 font-medium underline hover:text-gray-700 transition duration-150 ease-in-out"; // Keeping the link black/grey for B&W theme

  return (
    // Outer container for black/white theme (assuming a white background on the page)
    <div className="min-h-screen ">
      <div className={containerClasses}>
        <h1 className={titleClasses}>Privacy Policy</h1>
        
        {policyContent.map((block, index) => {
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
          <h3 className={h3Classes}>Contact Us</h3>
          <p className={paragraphClasses}>
            If you have any questions about this Privacy Policy, please contact us.
          </p>
          {/* <Link href="/contact" className={linkClasses}>
            Go to Contact Page
          </Link> */}
          <p className="mt-4 text-sm text-gray-600">
            *This policy is effective as of November 30, 2025.*
          </p>
        </div>
      </div>
    </div>
  );
}