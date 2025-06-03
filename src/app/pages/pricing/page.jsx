"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Pricing() {
  const router = useRouter();
  return (
    <div className="sec2 py-30 px-4 sm:px-6 lg:px-8 min-h-screen">
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
            Pricing Structure
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Explore our service rates and payment policies
          </p>

        </div>

        {/* Main Content */}
        <div className="sec4 rounded-xl shadow-lg p-6 sm:p-8">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600">
              Below is a summary of our current service rates and payment policies across different
              features of the platform.
            </p>
          </section>

          {/* Advert of the Week */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Advert of the Week</h2>
            <p className="text-gray-600 mb-4">
              Showcase your skill or product through a short video or image.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price (₦)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Weekly Display
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7 days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Monthly Display
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30 days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mt-4">
              Due to limited availability, slots will be granted to early applicants on a first-come
              basis.
            </p>
          </section>

          {/* Mentor Board Participation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mentor Board Participation</h2>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price (₦)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Mentor Card
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30 Days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Card Renewal
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Monthly</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      1,000 (1st renewal), 2,000 (subsequent)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Re-registration (after lapse)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30 Days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Terms for Mentorship
                </h3>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>Mentees pay weekly, directly into the official Skill Merchants account.</li>
                  <li>
                    Mentors receive 80%, and Skill Merchants retain 20% as a service fee.
                  </li>
                  <li>
                    Payments to mentors are made only after full payment is received from the mentee.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Appointment & Attendance Policies
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Scenario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Refund / Payment
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Mentor Misses Session (No Reschedule)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Mentee gets 100% refund
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Mentee Misses Session (No Reschedule)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Mentor receives 100% payment
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Late Arrival (10+ min)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Session terminated; No refund/payment issued
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Opportunities Listings */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Opportunities Listings</h2>
            <p className="text-gray-600 mb-4">
              Scholarships, jobs, internships, and volunteer opportunities are listed free of charge.
            </p>
            <p className="text-gray-600">
              <strong>Worker Request Fees:</strong> Negotiable based on:
            </p>
            <ul className="list-disc list-inside text-gray-600 ml-4">
              <li>Type of work</li>
              <li>Location</li>
              <li>Worker availability and discretion</li>
            </ul>
          </section>

          {/* Custom & Additional Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Custom & Additional Services
            </h2>
            <p className="text-gray-600 mb-4">
              For tailored services or organizational requests, please visit our{" "}
              <button onClick={() => router.push("/pages/services")} className="text-indigo-600 hover:text-indigo-800">
                Services
              </button>{" "}
              tab or{" "}
              <Link 
                href="https://wa.me/2348105669301"
                className="text-indigo-600 hover:text-indigo-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact us directly
              </Link>
              .
            </p>
            <p className="text-gray-600">
              Pricing varies based on complexity, urgency, and scope.
            </p>
          </section>

          {/* Official Payment Details */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Official Payment Details</h2>
            <p className="text-gray-600 mb-4">
              All payments should be made to:
            </p>
            <p className="text-gray-600">
              <strong>Bank Name:</strong> Opay<br />
              <strong>Account Name:</strong>  EBUBU ROSE OPUTA<br />
              <strong>Account Number:</strong>   9075557245
            </p>
            <p className="text-gray-600 mt-4">
              Please confirm all payments with our support team to ensure accurate documentation and
              activation of services. Contact us via{" "}
              <Link 
                href="https://wa.me/2348105669301"
                target="_blank"
                rel="noopener noreferrer"
                 className="text-indigo-600 hover:text-indigo-800">
                WhatsApp
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}