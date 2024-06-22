import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');
  if (!sessionId)
    return NextResponse.json(
      { error: 'Error retrieve order' },
      { status: 500 }
    );

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  return NextResponse.json(
    session.line_items?.data.map((item) => {
      const product = item.price?.product as Stripe.Product;
      return {
        id: item.id,
        name: product.name,
        description: product.description || '',
        images: product.images,
        price: item.price?.unit_amount || 0,
        quantity: item.quantity || 0,
      };
    }) || []
  );
}
