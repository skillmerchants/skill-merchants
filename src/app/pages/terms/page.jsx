"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
export default function TermsAndPrivacy() {
  const router = useRouter();
  return (
    <div className='sec1 py-30 px-4 sm:px-6 lg:px-8 min-h-screen'>
      <nav className='fixed align-items-center top-0 left-0 right-0 z-50'>
        <div className='flex justify-between sec p-1 align-items-lg-center'>
          <button
            onClick={() => router.back()}
            className='m1-4 inline-block text-indigo-600 hover:text-indigo-700 font-semibold'>
            ← Back
          </button>
          <div className='flex items-center gap-3 mx-9 my-2'>
            <img
              className='rounded-full w-25 h-15'
              src='/images/logo.png'
              alt=''
            />

            <h2 className='text-black hidden md:inline font-[700]'>
              Skill Merchants
            </h2>
          </div>
        </div>
      </nav>
      <div className='container mx-auto max-w-4xl'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>
            Terms of Service & Privacy Policy
          </h1>
          <p className='mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed'>
            Skill Merchants - Effective Date: 30th May 2025
          </p>
        </div>

        {/* Main Content */}
        <div className='sec4 rounded-xl shadow-lg p-6 sm:p-8'>
          {/* Terms of Service */}
          <section className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Terms of Service
            </h2>
            <p className='text-gray-600 mb-4'>
              <strong>Company Name:</strong> Skill Merchants
              <br />
              <strong>Website:</strong>{" "}
              <a
                href='https://www.skillmerchants.com'
                className='text-indigo-600 hover:text-indigo-800'
                target='_blank'
                rel='noopener noreferrer'>
                www.skillmerchants.com
              </a>
              <br />
              <strong>Effective Date:</strong> 30th May 2025
            </p>

            <div className='space-y-6'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  1. Acceptance of Terms
                </h3>
                <p className='text-gray-600'>
                  By accessing or using our website or services, you agree to be
                  bound by these Terms of Service and our Privacy Policy. If you
                  do not agree, please do not use our services.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  2. Eligibility
                </h3>
                <p className='text-gray-600'>
                  You must be at least 16 years old to use our services.
                  However, any individual below 16 can use our service only
                  under supervision by an adult. By using our service, you
                  confirm that you meet this requirement.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  3. Use of the Service
                </h3>
                <p className='text-gray-600'>
                  You agree to use the service only for lawful purposes and in
                  accordance with these Terms. You may not:
                </p>
                <ul className='list-disc list-inside text-gray-600 ml-4'>
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Interfere with or disrupt the service</li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  4. User Accounts
                </h3>
                <p className='text-gray-600'>
                  To access our service, you are required to submit necessary
                  credentials or information to create your account or card.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  5. Payments and Renewals
                </h3>
                <p className='text-gray-600'>
                  You agree to pay all fees and charges associated with your
                  account.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  6. Intellectual Property
                </h3>
                <p className='text-gray-600'>
                  All content, trademarks, logos, and intellectual property on
                  this site are owned by or licensed to Skill Merchants. You may
                  not reproduce, distribute, or create derivative works without
                  permission.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  7. Limitation of Liability
                </h3>
                <p className='text-gray-600'>
                  We are not liable for any damages arising from the use or
                  inability to use our service. Use at your own risk.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  8. Termination
                </h3>
                <p className='text-gray-600'>
                  We reserve the right to suspend or terminate your account at
                  our discretion, without notice, for conduct that we believe
                  violates these Terms.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  9. Changes to Terms
                </h3>
                <p className='text-gray-600'>
                  We reserve the right to update these Terms at any time. We
                  will notify users by updating the "Effective Date."
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  10. Contact Us
                </h3>
                <p className='text-gray-600'>
                  If you have questions, contact us at:{" "}
                  <a
                    href='mailto:skillmerchants@gmail.com'
                    className='text-indigo-600 hover:text-indigo-800'>
                    skillmerchants@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Privacy Policy
            </h2>
            <p className='text-gray-600 mb-4'>
              <strong>Company Name:</strong> Skill Merchants
              <br />
              <strong>Website:</strong>{" "}
              <a
                href='https://www.skillmerchants.com'
                className='text-indigo-600 hover:text-indigo-800'
                target='_blank'
                rel='noopener noreferrer'>
                www.skillmerchants.com
              </a>
              <br />
              <strong>Forceful Date:</strong> 30th May 2025
            </p>

            <div className='space-y-6'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  1. Information We Collect
                </h3>
                <p className='text-gray-600'>We may collect:</p>
                <ul className='list-disc list-inside text-gray-600 ml-4'>
                  <li>
                    Personal Information: name, email, mobile number, etc.
                  </li>
                  <li>Usage Data: browser type, pages visited, etc.</li>
                  <li>Cookies: for session tracking and analytics</li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  2. How We Use Your Information
                </h3>
                <p className='text-gray-600'>We use the information to:</p>
                <ul className='list-disc list-inside text-gray-600 ml-4'>
                  <li>Provide and improve our services</li>
                  <li>Communicate with you</li>
                  <li>Analyze usage patterns</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  3. Sharing of Information
                </h3>
                <p className='text-gray-600'>
                  We do not sell your personal data. We may share information
                  with:
                </p>
                <ul className='list-disc list-inside text-gray-600 ml-4'>
                  <li>Service providers (e.g., payment processors)</li>
                  <li>Legal authorities (if required by law)</li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  4. Cookies
                </h3>
                <p className='text-gray-600'>
                  We use cookies to enhance user experience. You can control
                  cookies through your browser settings.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  5. Data Security
                </h3>
                <p className='text-gray-600'>
                  We use industry-standard security measures to protect your
                  data, but we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  6. Your Rights
                </h3>
                <p className='text-gray-600'>
                  Depending on your location, you may have rights to:
                </p>
                <ul className='list-disc list-inside text-gray-600 ml-4'>
                  <li>Access, correct, or delete your data</li>
                  <li>Object to processing</li>
                  <li>Withdraw consent</li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  7. Children's Privacy
                </h3>
                <p className='text-gray-600'>
                  We do not knowingly collect data from children under 16. If we
                  learn we have, we will delete it.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  8. Changes to This Policy
                </h3>
                <p className='text-gray-600'>
                  We may update this Privacy Policy. Changes will be posted with
                  a new effective date.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  9. Contact Us
                </h3>
                <p className='text-gray-600'>
                  For questions or concerns, email us at:{" "}
                  <a
                    href='mailto:skillmerchants@gmail.com'
                    className='text-indigo-600 hover:text-indigo-800'>
                    skillmerchants@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
