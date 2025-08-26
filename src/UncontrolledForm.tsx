import "./App.css";
import { type dataType } from "./store/formSlice";
import { formSchema } from "./validation";
import { useSelector } from "react-redux";
import { selectCountries } from "./store/countrySlice";
import { useRef, useState } from "react";

export default function UncontrolledForm({
  onSubmit,
}: {
  onSubmit: (data: dataType) => void;
}) {
  const countries = useSelector(selectCountries);
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    const data = {
      name: String(formData.get("name") ?? ""),
      age: Number(formData.get("age") ?? 0),
      email: String(formData.get("email") ?? ""),
      password1: String(formData.get("password1") ?? ""),
      password2: String(formData.get("password2") ?? ""),
      gender: String(formData.get("gender") ?? ""),
      country: String(formData.get("country") ?? ""),
      terms: formData.get("terms") !== null,
    };

    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      const newErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        newErrors[key] = issue.message;
      }
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(data as unknown as dataType);
    form.reset();
  };
  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <fieldset>
        <form ref={formRef} noValidate onSubmit={handleSubmit}>
          <label htmlFor="name">Name*</label>
          <input id="name" name="name" type="text" placeholder="Enter name" />
          <p className="error">{errors.name}</p>

          <label htmlFor="age">Age*</label>
          <input id="age" name="age" type="number" placeholder="Enter age" />
          <p className="error">{errors.age}</p>

          <label htmlFor="email">Email*</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <p className="error">{errors.email}</p>

          <label htmlFor="password1">Password*</label>
          <input
            id="password1"
            name="password1"
            type="password"
            placeholder="Enter password"
          />
          <p className="error">{errors.password1}</p>

          <label htmlFor="password2">Confirm Password*</label>
          <input
            id="password2"
            name="password2"
            type="password"
            placeholder="Confirm password"
          />
          <p className="error">{errors.password2}</p>

          <label>Gender*</label>
          <label>
            <input type="radio" name="gender" value="male" defaultChecked />{" "}
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" /> Female
          </label>
          <p className="error">{errors.gender}</p>

          <label htmlFor="country">Country*</label>
          <input
            id="country"
            name="country"
            placeholder="Enter the country"
            autoComplete="off"
            onInput={(e) => {
              const input = e.currentTarget;
              const hasText = input.value.trim().length > 0;
              if (hasText) {
                input.setAttribute("list", "countries-list");
              } else {
                input.removeAttribute("list");
              }
            }}
          />
          <datalist id="countries-list">
            {countries.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
          <p className="error">{errors.country}</p>

          <label>
            <input type="checkbox" name="terms" /> Terms & Conditions
          </label>
          <p className="error">{errors.terms}</p>

          <button type="reset" onClick={() => setErrors({})}>
            Reset
          </button>
          <button type="submit">Submit</button>
        </form>
      </fieldset>
    </div>
  );
}
