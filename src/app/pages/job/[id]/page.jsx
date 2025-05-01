// app/pages/job/[id]/page.jsx
export default async function JobDetails({ params }) {
  const { id } = await params; // Destructure `id` from `params`
  console.log('Job ID:', id);

  // Fetch job details from the API
  if (!id) {
    return <p className="text-red-500">Job ID is missing</p>;
  } 
    const response = await fetch(`http://localhost:3000/api/jobs/${id}`, { method: 'GET' });
    const job = await response.json(); // Use response.json() to parse the response
     
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" >
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
        <p className="text-gray-600 mt-2">{job.company}</p>
        <p className="text-gray-600 mt-2">{job.description}</p>
        <p className="text-sm text-gray-500 mt-4">{job.location}</p>
        <p className="text-sm text-gray-500 mt-4">{job.salary}</p>
        <p className="text-sm text-gray-500 mt-4">{new Date(job.createdAt).toDateString()}</p>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}