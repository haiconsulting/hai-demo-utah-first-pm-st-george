"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Data = {
  address: string;
  area: string;
  propertyType: string;
  beds: string;
  baths: string;
  sqft: string;
  status: string;
  timeline: string;
  managed: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
  contactPref: string;
};

const empty: Data = {
  address: "",
  area: "",
  propertyType: "",
  beds: "",
  baths: "",
  sqft: "",
  status: "",
  timeline: "",
  managed: "",
  notes: "",
  name: "",
  email: "",
  phone: "",
  contactPref: "Call",
};

const steps = [
  { title: "Property", heading: "Where is the property?" },
  { title: "Details", heading: "Tell us about the home" },
  { title: "Goals", heading: "What are you hoping for?" },
  { title: "Contact", heading: "Where should we send your analysis?" },
] as const;

const options = {
  area: ["St. George area (Washington County)", "Cedar City area (Iron County)", "Somewhere else in Southern Utah"],
  propertyType: ["Single-family home", "Townhome or condo", "Duplex or multi-unit", "HOA or community association"],
  beds: ["Studio", "1", "2", "3", "4", "5", "6+"],
  baths: ["1", "1.5", "2", "2.5", "3", "3.5", "4+"],
  status: ["Vacant now", "Tenant in place", "I live there now", "Buying or building"],
  timeline: ["As soon as possible", "In 1 to 3 months", "In 3+ months", "Just exploring"],
  managed: ["No, I self-manage", "Yes, with another company", "Not rented yet"],
  contactPref: ["Call", "Text", "Email"],
};

type Errors = Partial<Record<keyof Data, string>>;

function validate(step: number, d: Data): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (d.address.trim().length < 5) e.address = "Enter the property address or HOA name.";
    if (!d.area) e.area = "Choose the area.";
    if (!d.propertyType) e.propertyType = "Choose a property type.";
  }
  if (step === 1) {
    if (!d.propertyType.startsWith("HOA")) {
      if (!d.beds) e.beds = "Choose the number of bedrooms.";
      if (!d.baths) e.baths = "Choose the number of bathrooms.";
    }
    if (d.sqft && !/^\d{3,6}$/.test(d.sqft.replace(/,/g, ""))) e.sqft = "Use numbers only, for example 1850.";
    if (!d.status) e.status = "Choose the current status.";
  }
  if (step === 2) {
    if (!d.timeline) e.timeline = "Choose a timeline.";
    if (!d.managed) e.managed = "Let us know how it is managed today.";
  }
  if (step === 3) {
    if (d.name.trim().length < 2) e.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Enter a valid email address.";
    if (d.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a 10-digit phone number.";
  }
  return e;
}

export function RentAnalysisForm({ className, headingLevel = "h3" }: { className?: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const uid = useId();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, status]);

  const id = (name: string) => `${uid}-${name}`;
  const set = (name: keyof Data) => (value: string) => {
    setData((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  function next(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(step, data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`[data-field="${id(first)}"]`)?.focus();
      });
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    setStatus("sending");
    // Demo mode: nothing leaves the browser. A live build would POST to a CRM or AppFolio lead endpoint here.
    window.setTimeout(() => setStatus("done"), 900);
  }

  function reset() {
    setData(empty);
    setErrors({});
    setStep(0);
    setStatus("idle");
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  if (status === "done") {
    const firstName = data.name.trim().split(/\s+/)[0];
    return (
      <div className={cn("rounded-2xl border border-line bg-cream p-6 text-text shadow-xl sm:p-8", className)}>
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-sage text-white">
            <Check className="size-5" aria-hidden="true" />
          </span>
          <Heading ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
            Thanks, {firstName}. Your request is in.
          </Heading>
        </div>
        <p role="status" className="mt-4 rounded-lg border border-dashed border-[#b8862a] bg-[#fff4d6] px-4 py-3 text-sm text-[#5c3d00]">
          <strong>Demo mode:</strong> nothing was sent. In the live site this request would go straight to the{" "}
          {data.area.startsWith("Cedar") ? "Cedar City" : "St. George"} office.
        </p>
        <dl className="mt-5 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          {[
            ["Property", data.address],
            ["Area", data.area],
            ["Type", data.propertyType],
            ["Size", [data.beds && `${data.beds} bd`, data.baths && `${data.baths} ba`, data.sqft && `${data.sqft} sq ft`].filter(Boolean).join(", ") || "Not given"],
            ["Status", data.status],
            ["Timeline", data.timeline],
            ["Contact by", `${data.contactPref}: ${data.contactPref === "Email" ? data.email : data.phone}`],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-line py-2">
              <dt className="text-xs font-semibold tracking-wide text-muted-ink uppercase">{k}</dt>
              <dd className="font-medium text-night">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 font-sans text-base font-bold text-night">What happens next</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
          <li>A local Utah First manager reviews comparable rentals near your property.</li>
          <li>They reach out by {data.contactPref.toLowerCase()} with a rent range and a management plan.</li>
          <li>No obligation. You decide if and when to list.</li>
        </ol>
        <Button type="button" variant="outline" onClick={reset} className="mt-6 h-11 rounded-full px-5">
          <RotateCcw aria-hidden="true" /> Start another analysis
        </Button>
      </div>
    );
  }

  const current = steps[step];
  const isHoa = data.propertyType.startsWith("HOA");

  return (
    <form
      noValidate
      onSubmit={next}
      aria-labelledby={id("heading")}
      className={cn("rounded-2xl border border-line bg-cream p-5 text-text shadow-xl sm:p-8", className)}
    >
      <ol className="mb-6 grid grid-cols-4 gap-2" aria-label="Form progress">
        {steps.map((s, i) => (
          <li key={s.title} aria-current={i === step ? "step" : undefined} className="text-center">
            <span
              className={cn(
                "block h-1.5 rounded-full transition-colors",
                i < step ? "bg-sage" : i === step ? "bg-rock" : "bg-sand-2",
              )}
            />
            <span className={cn("mt-2 block text-xs font-semibold", i === step ? "text-night" : "text-muted-ink")}>
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
              {i < step && <span className="sr-only"> (done)</span>}
            </span>
          </li>
        ))}
      </ol>

      <p className="text-xs font-semibold tracking-[0.16em] text-muted-ink uppercase">
        Step {step + 1} of {steps.length}
      </p>
      <Heading id={id("heading")} ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-bold outline-none">
        {current.heading}
      </Heading>

      {errorCount > 0 && (
        <p role="alert" className="mt-4 rounded-lg bg-[#fbe4df] px-4 py-3 text-sm font-medium text-[#8a1c10]">
          {errorCount === 1 ? "One field needs attention." : `${errorCount} fields need attention.`}
        </p>
      )}

      <div className="mt-5 grid gap-5">
        {step === 0 && (
          <>
            <TextField
              id={id("address")}
              label="Property address or HOA name"
              value={data.address}
              onChange={set("address")}
              error={errors.address}
              autoComplete="street-address"
              placeholder="123 Main St, St. George"
            />
            <ChoiceGroup id={id("area")} legend="Area" name="area" options={options.area} value={data.area} onChange={set("area")} error={errors.area} columns={1} />
            <ChoiceGroup
              id={id("propertyType")}
              legend="Property type"
              name="propertyType"
              options={options.propertyType}
              value={data.propertyType}
              onChange={set("propertyType")}
              error={errors.propertyType}
            />
          </>
        )}

        {step === 1 && (
          <>
            {isHoa ? (
              <p className="rounded-lg bg-sand px-4 py-3 text-sm">
                For HOAs, bedrooms and bathrooms are optional. Add the number of homes in the notes on the next step.
              </p>
            ) : null}
            <div className="grid gap-5 sm:grid-cols-3">
              <SelectField id={id("beds")} label="Bedrooms" value={data.beds} onChange={set("beds")} options={options.beds} error={errors.beds} optional={isHoa} />
              <SelectField id={id("baths")} label="Bathrooms" value={data.baths} onChange={set("baths")} options={options.baths} error={errors.baths} optional={isHoa} />
              <TextField id={id("sqft")} label="Square feet" value={data.sqft} onChange={set("sqft")} error={errors.sqft} inputMode="numeric" optional placeholder="1850" />
            </div>
            <ChoiceGroup id={id("status")} legend="Current status" name="status" options={options.status} value={data.status} onChange={set("status")} error={errors.status} />
          </>
        )}

        {step === 2 && (
          <>
            <ChoiceGroup id={id("timeline")} legend="When would you like management to start?" name="timeline" options={options.timeline} value={data.timeline} onChange={set("timeline")} error={errors.timeline} />
            <ChoiceGroup id={id("managed")} legend="Is it professionally managed today?" name="managed" options={options.managed} value={data.managed} onChange={set("managed")} error={errors.managed} columns={1} />
            <div className="grid gap-2">
              <Label htmlFor={id("notes")} className="text-[0.95rem] font-semibold text-night">
                Anything else we should know? <span className="font-normal text-muted-ink">(optional)</span>
              </Label>
              <Textarea
                id={id("notes")}
                value={data.notes}
                onChange={(e) => set("notes")(e.target.value)}
                rows={3}
                className="min-h-24 rounded-lg border-input bg-white text-base"
                placeholder="Pets allowed, recent upgrades, HOA size, questions about fees..."
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <TextField id={id("name")} label="Your name" value={data.name} onChange={set("name")} error={errors.name} autoComplete="name" />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id={id("email")} label="Email" type="email" value={data.email} onChange={set("email")} error={errors.email} autoComplete="email" />
              <TextField id={id("phone")} label="Phone" type="tel" value={data.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" placeholder="(435) 555-0100" />
            </div>
            <ChoiceGroup id={id("contactPref")} legend="Best way to reach you" name="contactPref" options={options.contactPref} value={data.contactPref} onChange={set("contactPref")} columns={3} />
            <p className="text-xs text-muted-ink">
              Demo mode: this form runs entirely in your browser and does not send or store anything.
            </p>
          </>
        )}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => setStep(step - 1)} className="h-11 rounded-full px-4 text-base text-night">
            <ArrowLeft aria-hidden="true" /> Back
          </Button>
        ) : (
          <span className="text-sm text-muted-ink">Free, no obligation. Takes about a minute.</span>
        )}
        <Button
          type="submit"
          disabled={status === "sending"}
          className="h-12 rounded-full bg-rock px-6 text-base font-semibold text-white hover:bg-rock-deep"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" /> Sending
            </>
          ) : step < steps.length - 1 ? (
            <>
              Continue <ArrowRight aria-hidden="true" />
            </>
          ) : (
            "Get my free rent analysis"
          )}
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "sending" ? "Sending your request" : `Step ${step + 1} of ${steps.length}: ${current.title}`}
      </p>
    </form>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="text-sm font-medium text-[#8a1c10]">
      {error}
    </p>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  optional,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  optional?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "id">) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[0.95rem] font-semibold text-night">
        {label} {optional && <span className="font-normal text-muted-ink">(optional)</span>}
      </Label>
      <Input
        id={id}
        data-field={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        required={!optional}
        className="h-12 rounded-lg border-input bg-white px-3 text-base"
        {...rest}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  optional,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  optional?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[0.95rem] font-semibold text-night">
        {label} {optional && <span className="font-normal text-muted-ink">(optional)</span>}
      </Label>
      <select
        id={id}
        data-field={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 w-full rounded-lg border border-input bg-white px-3 text-base text-night outline-none focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive"
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <FieldError id={id} error={error} />
    </div>
  );
}

function ChoiceGroup({
  id,
  legend,
  name,
  options,
  value,
  onChange,
  error,
  columns = 2,
}: {
  id: string;
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  columns?: 1 | 2 | 3;
}) {
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined} className="grid gap-2">
      <legend className="mb-2 text-[0.95rem] font-semibold text-night">{legend}</legend>
      <div className={cn("grid gap-2", columns === 2 && "sm:grid-cols-2", columns === 3 && "grid-cols-3")}>
        {options.map((o, i) => {
          const optId = `${id}-${i}`;
          return (
            <label
              key={o}
              htmlFor={optId}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border bg-white px-3 py-2.5 text-[0.95rem] transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rock-deep",
                value === o ? "border-rock bg-[#fdf1ea] font-semibold text-night" : "border-input hover:border-rock/60",
                error && value !== o && "border-[#c25a4a]",
              )}
            >
              <input
                id={optId}
                type="radio"
                name={`${id}-${name}`}
                value={o}
                checked={value === o}
                onChange={() => onChange(o)}
                data-field={i === 0 ? id : undefined}
                className="size-4 shrink-0 accent-[#b4482b]"
              />
              {o}
            </label>
          );
        })}
      </div>
      <FieldError id={id} error={error} />
    </fieldset>
  );
}
