import dbConnect from "@/lib/mongodb";
import orderModel from "@/models/Order.model";
import transporter from "@/lib/nodemailer";
import { render } from "@react-email/render";
import ConfirmationEmail from "@/components/ConfirmationEmail";
import "@/models/Product.model";
import "@/models/CakeComponent.model";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    await dbConnect();
    const newOrder = await orderModel.create(data)
    if (!newOrder) {
      return Response.json({ message: 'Failed to create order' }, { status: 400 });
    }

    await newOrder.populate({
      path: 'items',
      populate: [
        { path: 'product' },
        { path: 'customCake.dough' },
        { path: 'customCake.filling' },
        { path: 'customCake.frosting' },
        { path: 'customCake.topping' }
      ]
    });

    // Send email confirmation to the user
    await transporter.sendMail({
      from: `"The Royal Sweet Team" <theroyalsweetcakeshop@gmail.com>`,
      to: newOrder.email,
      subject: newOrder.language === 'en' ? 'Order Confirmation' : 'Confirmação de Pedido',
      html: await render(ConfirmationEmail({ order: JSON.parse(JSON.stringify(newOrder)) })),
    });

    return Response.json(newOrder);
  } catch (error) {
    return Response.json({ message: `Internal Server Error: ${error}` }, { status: 500 });
  }
};