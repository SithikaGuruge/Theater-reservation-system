import express from 'express';
import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { selectedSeats, seatTypeCounts, totalPrice } = req.body;

  const line_items = selectedSeats.map(seat => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: seat.seat_type,
      },
      unit_amount: Math.round(seat.price * 100),
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/theatres`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: 'Failed to create Stripe checkout session' });
  }
});

export default router;
