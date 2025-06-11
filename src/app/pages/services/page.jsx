"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
export default function HowItWorks() {
    const router = useRouter();
  return (
    <div className=" py-30  px-4 sm:px-6 lg:px-8 min-h-screen">
                    <nav className="fixed align-items-center top-0 left-0 right-0 z-50">
            <div className="flex justify-between sec p-1 align-items-lg-center">
                          <button
            onClick={() => router.back()}
            className="m1-4 inline-block text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back 
          </button>
                <div className="flex items-center gap-3 mx-9 my-2">
                   <img className="rounded-full w-10 h-10" src="https://images.seeklogo.com/logo-png/17/2/sm-supermalls-logo-png_seeklogo-176299.png" alt="" />
                    <h2 className="text-black hidden md:inline font-[700]">Skill Merchants</h2>
                </div>

            </div> 
          </nav>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            How It Works
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Learn about the services and processes at Skill Merchants
          </p>

        </div>

        {/* Main Content */}
        <div className="sec4 rounded-xl shadow-lg p-6 sm:p-8">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600">
              To ensure clarity and ease of use, this guide outlines the various sections and services
              available on our website, categorized based on the level of user participation required.
              This helps us serve you better and streamline your experience.
            </p>
          </section>

          {/* Advert of the Week */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Advert of the Week</h2>
            <p className="text-gray-600 mb-4">
              The "Advert of the Week" feature showcases individual talents or products through a
              visual presentation. Participants are required to submit one image and a maximum
              duration of 10-second video demonstrating their skill or product.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Display Fee:</strong> ₦5,000 per week or ₦15,000 per month (30 days)
            </p>
            <p className="text-gray-600">
              For advert placement, please send an email or contact us on WhatsApp:{" "}
              <Link
                href="https://wa.me/2348105669301"
                className="text-indigo-600 hover:text-indigo-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                wa.me/2348105669301
              </Link>
            </p>
          </section>

          {/* Opportunities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Opportunities</h2>
            <p className="text-gray-600 mb-4">
              This drop-down menu features a variety of beneficial listings including scholarships,
              conferences, industrial training, internships, job vacancies, and volunteer for social
              work.
            </p>
            <p className="text-gray-600 mb-4">
              All updates and listings under this menu are free of charge. However, Skill Merchants
              have the full right to verify the authenticity of your submission before publishing.
            </p>
            <p className="text-gray-600">
              <strong>Request for Workers:</strong> If you are seeking to hire workers for your company
              or business, the fee is negotiable and will depend on the nature of work, location, and
              discretion of the workers.
            </p>
          </section>

          {/* Mentor Board */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mentor Board</h2>
            <p className="text-gray-600 mb-4">
              This section features experienced professionals from various fields, offering one-on-one
              mentorship sessions. Clients are encouraged to select a mentor suited to their needs and
              interests.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Mentorship Guidelines</h3>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>
                    Mentors are expected to come well-prepared and deliver original, insightful
                    knowledge. Sharing external content (e.g., YouTube videos) is allowed only as a
                    supplement—not a replacement—for personal instruction.
                  </li>
                  <li>
                    Mentors and mentees must maintain a high standard of professional conduct at all
                    times. Any form of abuse or misconduct is strictly prohibited.
                  </li>
                  <li>
                    Mentors are only paid after completing the agreed-upon subject or skill module.
                    Incomplete sessions are not compensated.
                  </li>
                  <li>
                    All meetings must be conducted with mutual respect and professionalism. Any form of
                    misconduct may result in termination of services.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Mentor Board Participation & Payment Policy
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Mentor Card:</strong> To join the Mentor Board, mentors are required to pay a
                  ₦2,000 activation fee, which grants access to the Card (platform) for 30 days. The
                  card will feature a brief mentor profile, outlining their mentorship background,
                  course offering, duration, and fee.
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Multiple Cards:</strong> Mentors have the option to purchase multiple cards,
                  each representing a different course or mentorship offering.
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Card Renewal:</strong> To maintain active status on the Mentor Board, mentors
                  must renew their card at a first-time renewal of ₦1,000, after which subsequent card
                  renewal fees will be ₦2,000. Failure to renew after 30 days will result in
                  deactivation of the profile.
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Mentee Payment Terms:</strong> All payments for mentorship sessions must be
                  made by mentees in weekly installments and must be paid directly into the official
                  Skill Merchants account provided.
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Mentor Payment Disbursement:</strong> Skill Merchants is responsible for
                  disbursing payments to mentors only after full payment has been received from the
                  mentee.
                </p>
                <p className="text-gray-600">
                  <strong>Revenue Sharing Structure:</strong> Mentors will receive 70% of the total
                  amount paid by the mentee for services rendered. Skill Merchants will retain 30% as a
                  platform service fee.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Appointment Scheduling & Attendance Policy
                </h3>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>
                    <strong>Advance Booking Requirement:</strong> All mentorship appointments must be
                    scheduled at least 12 hours in advance to ensure proper coordination and payment
                    processing.
                  </li>
                  <li>
                    <strong>Rescheduling Policy:</strong> A one-time rescheduling is permitted for both
                    mentors and mentees per appointment. This must be communicated in a timely and
                    respectful manner.
                  </li>
                  <li>
                    <strong>Mentor Absence:</strong> If a mentor fails to attend a scheduled session
                    without prior rescheduling, another mentor will be assigned to the mentee, a 100%
                    refund will be issued, and no payment will be made to the mentor.
                  </li>
                  <li>
                    <strong>Mentee Absence:</strong> If a mentee is absent without prior rescheduling,
                    no refund will be issued. The mentor will receive 100% of the scheduled payment.
                  </li>
                  <li>
                    <strong>Late Arrival Policy:</strong> A maximum grace period of 10 minutes is
                    allowed for both parties in the event of lateness. If either the mentor or mentee
                    fails to join within this time frame, the session will be terminated, and a
                    no-payment/no-refund policy will be applied accordingly.
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-gray-600">
                  For card purchase and renewal, send an email or chat us on WhatsApp:{" "}
                  <Link
                    href="https://wa.me/2348105669301"
                    className="text-indigo-600 hover:text-indigo-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    wa.me/2348105669301
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* Payment Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Information</h2>
            <p className="text-gray-600 mb-4">
              All payments should be made to the official Skill Merchants account as detailed below:
            </p>
            <p className="text-gray-600">
              <strong>Bank Name:</strong> Opay<br />
              <strong>Account Name:</strong> UGWU OGOCHUKWU GORDIAN<br />
              <strong>Account Number:</strong> 8119159108
            </p>
            <p className="text-gray-600 mt-4">
              Please ensure payments are made correctly and confirm your transaction with our support
              team for proper documentation and service activation.
            </p>
          </section>

          {/* Pricing and Additional Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing and Additional Services</h2>
            <p className="text-gray-600 mb-4">
              For comprehensive information on our service fees, please refer to the{" "}
              <button onClick={() => router.push("/pages/contact")} className="text-indigo-600 hover:text-indigo-800">
                contact 
              </button>
              tab available in the website’s navigation menu.
            </p>
            <p className="text-gray-600">
              <strong>Custom and Additional Services:</strong> We also cater to special or customized
              requests based on individual or organizational needs. To explore these tailored
              solutions, kindly visit the
              <button onClick={() => router.push("/")} className="text-indigo-600 hover:text-indigo-800">
                Home page
              </button>{" "}
              tab for more details.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
