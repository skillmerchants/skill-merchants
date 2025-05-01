import dbConnect from '../../../lib/dbConnect';
import Job from '@models/job';
import mentor from '@models/mentor';
import Ads from '@models/Ads';

export async function GET(req, res) {
  await dbConnect();

  try {
    const mentors = await mentor.find({});
    const posts = await Ads.find({});
    const jobs = await Job.find({});
    // const jobs = await Job.find({}).populate('mentorId', 'name email phone location imageUrl');
    return new Response(JSON.stringify({ mentors, posts, jobs }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
