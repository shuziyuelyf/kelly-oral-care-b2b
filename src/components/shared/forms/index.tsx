'use client';

import { useState, useRef } from 'react';
import { trackEvent, submitLead, getUTMParams, getPageUrl } from '@/lib/analytics';

interface FormProps {
  onSuccess?: () => void;
}

function SuccessMessage({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-[#EAF7FD] rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
      </div>
      <h3 className="text-xl font-bold text-[#173A63] mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

const inputCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

export function SampleRequestForm({ onSuccess }: FormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());

    trackEvent('sample_submit', { product: data.product_name as string });

    await submitLead({
      buyer_intent: 'ready_product',
      lead_type: 'sample',
      contact_name: data.contact_name as string,
      contact_email: data.contact_email as string,
      expected_quantity: data.quantity as string,
      message: data.notes as string,
      form_data: { product_name: data.product_name, shipping_address: data.shipping_address },
    });

    setLoading(false);
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return <SuccessMessage title="Sample Request Submitted!" description="We will prepare your samples within 3-5 business days." />;
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Product Name *</label>
          <input type="text" name="product_name" required placeholder="e.g., Whitening Toothpaste" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Quantity *</label>
          <select name="quantity" required className={inputCls}>
            <option value="">Select quantity</option>
            <option value="1-5">1-5 pcs</option>
            <option value="5-20">5-20 pcs</option>
            <option value="20+">20+ pcs</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Shipping Address *</label>
        <input type="text" name="shipping_address" required placeholder="Full shipping address" className={inputCls} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Contact Name *</label>
          <input type="text" name="contact_name" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" name="contact_email" required className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Notes</label>
        <textarea name="notes" rows={3} placeholder="Any specific requirements..." className={inputCls} />
      </div>
      <button type="submit" disabled={loading} className="w-full py-3 bg-[#008FD5] text-white font-semibold rounded-full hover:bg-[#0070a8] transition-colors disabled:opacity-50">
        {loading ? 'Submitting...' : 'Request Sample'}
      </button>
    </form>
  );
}

export function WholesaleInquiryForm({ onSuccess }: FormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());

    trackEvent('wholesale_quote_submit', { products: data.products as string });

    await submitLead({
      buyer_intent: 'ready_product',
      lead_type: 'wholesale_quote',
      contact_name: data.contact_name as string,
      contact_email: data.contact_email as string,
      company_name: data.company_name as string,
      country: data.country as string,
      expected_quantity: data.estimated_quantity as string,
      message: data.requirements as string,
      form_data: { products: data.products },
    });

    setLoading(false);
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return <SuccessMessage title="Inquiry Submitted!" description="Our sales team will contact you within 24 hours." />;
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Products of Interest *</label>
          <input type="text" name="products" required placeholder="e.g., Toothpaste, Mouthwash" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Estimated Quantity *</label>
          <select name="estimated_quantity" required className={inputCls}>
            <option value="">Select range</option>
            <option value="5000-10000">5,000 - 10,000 pcs</option>
            <option value="10000-50000">10,000 - 50,000 pcs</option>
            <option value="50000-100000">50,000 - 100,000 pcs</option>
            <option value="100000+">100,000+ pcs</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Company Name *</label>
          <input type="text" name="company_name" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Country *</label>
          <input type="text" name="country" required className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Contact Name *</label>
          <input type="text" name="contact_name" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" name="contact_email" required className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Additional Requirements</label>
        <textarea name="requirements" rows={3} placeholder="Target market, delivery timeline, etc." className={inputCls} />
      </div>
      <button type="submit" disabled={loading} className="w-full py-3 bg-[#008FD5] text-white font-semibold rounded-full hover:bg-[#0070a8] transition-colors disabled:opacity-50">
        {loading ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}

export function BrandStartForm({ onSuccess }: FormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());

    trackEvent('private_label_submit', { brand_name: data.brand_name as string });

    await submitLead({
      buyer_intent: 'private_label',
      lead_type: 'brand_quote',
      contact_name: data.contact_name as string,
      contact_email: data.contact_email as string,
      company_name: data.brand_name as string,
      country: data.target_market as string,
      expected_quantity: data.estimated_first_order as string,
      message: `Category: ${data.product_category}, Branding: ${data.branding_materials}`,
      form_data: {
        brand_name: data.brand_name,
        product_category: data.product_category,
        target_market: data.target_market,
        branding_materials: data.branding_materials,
      },
    });

    setLoading(false);
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return <SuccessMessage title="Brand Project Submitted!" description="We will send you a brand consultation plan within 24 hours." />;
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Brand Name *</label>
          <input type="text" name="brand_name" required placeholder="Your brand name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Product Category *</label>
          <select name="product_category" required className={inputCls}>
            <option value="">Select category</option>
            <option value="toothpaste">Toothpaste</option>
            <option value="mouthwash">Mouthwash</option>
            <option value="toothbrush">Toothbrush</option>
            <option value="multiple">Multiple Categories</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Target Market *</label>
          <input type="text" name="target_market" required placeholder="e.g., USA, EU, Southeast Asia" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Estimated First Order *</label>
          <select name="estimated_first_order" required className={inputCls}>
            <option value="">Select range</option>
            <option value="5000-10000">5,000 - 10,000 pcs</option>
            <option value="10000-50000">10,000 - 50,000 pcs</option>
            <option value="50000+">50,000+ pcs</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Do you have branding materials ready?</label>
        <select name="branding_materials" className={inputCls}>
          <option value="yes">Yes, logo and design files ready</option>
          <option value="partial">Partial (logo only)</option>
          <option value="no">No, need design help</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Contact Name *</label>
          <input type="text" name="contact_name" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" name="contact_email" required className={inputCls} />
        </div>
      </div>
      <button type="submit" disabled={loading} className="w-full py-3 bg-[#008FD5] text-white font-semibold rounded-full hover:bg-[#0070a8] transition-colors disabled:opacity-50">
        {loading ? 'Submitting...' : 'Start My Brand'}
      </button>
    </form>
  );
}

export function CustomProjectForm({ onSuccess }: FormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());

    trackEvent('configuration_submit', { service_type: data.service_type as string });

    await submitLead({
      buyer_intent: 'custom_oem',
      lead_type: 'custom_quote',
      customization_level: data.service_type === 'full' ? 'advanced' : 'light',
      contact_name: data.contact_name as string,
      contact_email: data.contact_email as string,
      expected_quantity: data.estimated_quantity as string,
      message: data.project_description as string,
      form_data: {
        service_type: data.service_type,
        product_type: data.product_type,
        target_launch_date: data.target_launch_date,
      },
    });

    setLoading(false);
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return <SuccessMessage title="Project Submitted!" description="Our R&D team will review your requirements and respond within 48 hours." />;
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Service Type *</label>
          <select name="service_type" required className={inputCls}>
            <option value="">Select service</option>
            <option value="oem">OEM Manufacturing</option>
            <option value="odm">ODM Development</option>
            <option value="full">Full Custom (Formula + Packaging)</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Product Type *</label>
          <input type="text" name="product_type" required placeholder="e.g., Whitening Toothpaste" className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Estimated Quantity *</label>
          <select name="estimated_quantity" required className={inputCls}>
            <option value="">Select range</option>
            <option value="10000-50000">10,000 - 50,000 pcs</option>
            <option value="50000-100000">50,000 - 100,000 pcs</option>
            <option value="100000+">100,000+ pcs</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Target Launch Date</label>
          <input type="date" name="target_launch_date" className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Project Description *</label>
        <textarea name="project_description" required rows={4} placeholder="Describe your product requirements, formula preferences, packaging needs..." className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Reference Files</label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#008FD5] transition-colors cursor-pointer">
          <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
          <p className="text-sm text-gray-500">Drop files here or click to upload</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Contact Name *</label>
          <input type="text" name="contact_name" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" name="contact_email" required className={inputCls} />
        </div>
      </div>
      <button type="submit" disabled={loading} className="w-full py-3 bg-[#173A63] text-white font-semibold rounded-full hover:bg-[#1E4D7B] transition-colors disabled:opacity-50">
        {loading ? 'Submitting...' : 'Submit Project'}
      </button>
    </form>
  );
}
