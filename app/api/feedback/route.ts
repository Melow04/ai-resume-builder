import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rating, feedback, email, trigger } = body;

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid rating. Must be between 1 and 5.' },
        { status: 400 }
      );
    }

    // TODO: Store feedback in your database
    // Example with PostgreSQL/Prisma:
    // const feedbackEntry = await prisma.feedback.create({
    //   data: {
    //     rating,
    //     feedback: feedback || '',
    //     email: email || null,
    //     trigger: trigger || 'manual',
    //     timestamp: new Date(),
    //     userAgent: request.headers.get('user-agent') || '',
    //   },
    // });

    // TODO: Send notification email to yourself
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'feedback@resumeant.com',
    //   to: 'your@email.com',
    //   subject: `New Feedback: ${rating}/5 stars`,
    //   html: `
    //     <h2>New Feedback Received</h2>
    //     <p><strong>Rating:</strong> ${rating}/5</p>
    //     <p><strong>Feedback:</strong> ${feedback || 'No comments'}</p>
    //     <p><strong>Email:</strong> ${email || 'Not provided'}</p>
    //     <p><strong>Trigger:</strong> ${trigger}</p>
    //   `,
    // });

    // Log feedback for now
    console.log('📊 Feedback received:', {
      rating,
      feedback: feedback?.substring(0, 100) || 'No feedback',
      email: email || 'Anonymous',
      trigger,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Feedback received successfully',
    });
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}
