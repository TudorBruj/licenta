import { CartProduct } from '@/components/sidebar-product-list';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const host = process.env.NEXT_PUBLIC_HOST ?? 'http://localhost:3000';

interface PostBody {
  products: CartProduct[];
}

export async function POST(req: NextRequest) {
  const body: PostBody = await req.json();
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: body.products.map((product) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description || product.name,
            images: [`${host}/${product.images}`],
          },
          unit_amount_decimal: String(product.price * 100),
        },
        quantity: product.quantity,
      })),
      mode: 'payment',
      cancel_url: `${host}`,
      success_url: `${host}/success`,
    });

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error checkout session' },
      { status: 500 }
    );
  }
}
