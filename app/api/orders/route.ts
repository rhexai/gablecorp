import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "../../../lib/supabase/server";
import { Resend } from 'resend';

const resend = new Resend('re_eubTdjDQ_Ec1gj21ffhK5FSuxR6RUgx3q');

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();

        const supabase = await createClient();

        const agents = ["Alex M.", "Sarah J.", "Michael T.", "Jessica L."];
        const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
        const orderId = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const { error } = await supabase.from('orders').insert({
            user_id: user.id,
            service_slug: body.serviceSlug,
            package: body.package,
            business_name: body.businessName,
            industry: body.industry,
            company_size: body.size,
            contact_name: body.contactName,
            contact_email: body.contactEmail,
            contact_phone: body.contactPhone,
            preferred_channel: body.preferredChannel,
            availability: body.availability,
            signed_intent: body.signedIntent,
            assigned_agent: assignedAgent,
            display_id: orderId
        });

        if (error) {
            console.error("Supabase insert error", error);
            return new NextResponse("Database Error", { status: 500 });
        }

        // Send Email Notification
        try {
            await resend.emails.send({
                from: 'Gablecorp Orders <onboarding@resend.dev>',
                to: 'business.gablecorp@gmail.com',
                subject: `New Request: ${body.package} for ${body.businessName || body.contactName}`,
                html: `
                    <h2>New Order Received (${orderId})</h2>
                    <p><strong>Service:</strong> ${body.serviceSlug}</p>
                    <p><strong>Package:</strong> ${body.package}</p>
                    <p><strong>Company:</strong> ${body.businessName || 'N/A'}</p>
                    <p><strong>Industry:</strong> ${body.industry || 'N/A'}</p>
                    <p><strong>Company Size:</strong> ${body.size}</p>
                    <p><strong>Contact Name:</strong> ${body.contactName}</p>
                    <p><strong>Contact Email:</strong> ${body.contactEmail}</p>
                    <p><strong>Contact Phone:</strong> ${body.contactPhone || 'N/A'}</p>
                    <p><strong>Preferred Channel:</strong> ${body.preferredChannel}</p>
                    <p><strong>Availability for Call:</strong> ${body.availability ? new Date(body.availability).toLocaleString() : 'Not Specified'}</p>
                    <p><strong>Assigned Agent:</strong> ${assignedAgent}</p>
                `
            });
        } catch (emailError) {
            console.error("Failed to send email", emailError);
            // We don't fail the whole order if the email fails, but we log it.
        }

        return NextResponse.json({
            success: true,
            orderId,
            agent: assignedAgent,
            message: "Order received successfully. Agent assigned."
        });
    } catch (error) {
        console.error("Order error", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
