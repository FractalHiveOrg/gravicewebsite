"use client";

import { FormEvent, useState } from "react";

export function DemoForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[20px] border border-navy-100 bg-white p-8 md:p-10">
        <h2 className="font-serif text-2xl font-semibold text-deep-space">
          Thank you.
        </h2>
        <p className="mt-3 text-[16px] leading-[1.6] text-slate">
          Your demo request has been recorded locally for this preview. CRM
          routing will be connected in a later release.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-[20px] border border-navy-100 bg-white p-8 md:p-10"
    >
      <Field label="Full name" name="name" required />
      <Field label="Work email" name="email" type="email" required />
      <Field label="Company" name="company" required />
      <label className="flex flex-col gap-2 text-[14px] font-medium text-deep-space">
        Product interest
        <select
          name="product"
          className="rounded-xl border border-navy-100 bg-paper px-4 py-3 text-[15px] font-normal text-deep-space"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select a product
          </option>
          <option value="elevaterm">ElevateRM</option>
          <option value="v-track">V-Track</option>
          <option value="nico">NICO</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 text-[14px] font-medium text-deep-space">
        Notes
        <textarea
          name="notes"
          rows={4}
          className="resize-y rounded-xl border border-navy-100 bg-paper px-4 py-3 text-[15px] font-normal text-deep-space"
          placeholder="What are you looking to solve?"
        />
      </label>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-pull-orange px-7 py-4 text-[16px] font-semibold text-deep-space transition-colors hover:bg-[#f88c60]"
      >
        Request demo
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-[14px] font-medium text-deep-space">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-navy-100 bg-paper px-4 py-3 text-[15px] font-normal text-deep-space"
      />
    </label>
  );
}
