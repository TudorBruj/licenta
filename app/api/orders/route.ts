import { NextRequest, NextResponse } from 'next/server';
import { addOrder, Order } from '@/lib/data/orders';
import { ObjectId } from 'mongodb';
import { auth } from '@/auth';
import { OrderItem, addOrderItem } from '@/lib/data/order-items';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'User not authenticated' },
      { status: 401 }
    );
  }

  const { products } = await req.json();

  const orderItems: OrderItem[] = products.map((product: any) => ({
    product_id: new ObjectId(),
    quantity: product.quantity,
    price: product.price / 100,
  }));

  const order: Order = {
    user_id: session.user.id,
    total_amount: orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    _id: '',
    id: '',
  };

  await addOrder(order);
  for (const item of orderItems) {
    item.order_id = order.id;
    await addOrderItem(item);
  }

  return NextResponse.json({ message: 'Order saved successfully' });
}
