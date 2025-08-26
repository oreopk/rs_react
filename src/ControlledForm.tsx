import "./App.css";
import { type dataType } from "./store/Slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FormFields, formSchema } from "./validation";
import { Controller, useForm } from "react-hook-form";

export default function ControlledForm({
  onSubmit,
}: {
  onSubmit: (data: dataType) => void;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      age: undefined,
      email: "",
      password1: "",
      password2: "",
      gender: "male",
      country: "",
      terms: false,
    },
  });

  const submit = (data: FormFields) => {
    console.log(data);
    onSubmit(data as unknown as dataType);
    reset();
  };

  return (
    <div>
      <h1>Controlled Form</h1>
      <fieldset>
        <form noValidate onSubmit={handleSubmit(submit)}>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <label htmlFor="name">Name*</label>
                <input
                  id="name"
                  autoComplete="name"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter name"
                />
                <p className="error">{error?.message}</p>
              </>
            )}
          />

          <Controller
            name="age"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <label htmlFor="age">Age*</label>
                <input
                  id="age"
                  autoComplete="off"
                  type="number"
                  value={value}
                  onChange={(e) =>
                    onChange(Number(e.target.value) || undefined)
                  }
                  placeholder="Enter age"
                />
                <p className="error">{error?.message}</p>
              </>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <label htmlFor="email">Email*</label>
                <input
                  id="email"
                  autoComplete="email"
                  type="email"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter email"
                />
                <p className="error">{error?.message}</p>
              </>
            )}
          />

          <Controller
            name="password1"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <label htmlFor="password1">Password*</label>
                <input
                  id="password1"
                  autoComplete="new-password"
                  type="password"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter password"
                />
                <p className="error">{error?.message}</p>
              </>
            )}
          />

          <Controller
            name="password2"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <label htmlFor="password2">Confirm Password*</label>
                <input
                  id="password2"
                  autoComplete="new-password"
                  type="password"
                  value={value}
                  onChange={onChange}
                  placeholder="Confirm password"
                />
                <p className="error">{error?.message}</p>
              </>
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <label>Gender*</label>
                <label className="radio">
                  <input
                    type="radio"
                    autoComplete="sex"
                    value="male"
                    checked={value === "male"}
                    onChange={() => onChange("male")}
                  />
                  Male
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    autoComplete="sex"
                    value="female"
                    checked={value === "female"}
                    onChange={() => onChange("female")}
                  />
                  Female
                </label>
                <p className="error">{error?.message}</p>
              </>
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <label htmlFor="country">Country*</label>
                <select
                  id="country"
                  autoComplete="country-name"
                  value={value}
                  onChange={onChange}
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  <option value="russia">Russia</option>
                  <option value="usa">USA</option>
                  <option value="germany">Germany</option>
                </select>
                <p className="error">{error?.message}</p>
              </>
            )}
          />

          <Controller
            name="terms"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <label>
                  <input
                    type="checkbox"
                    autoComplete="off"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                  Accept Terms & Conditions
                </label>
                <p className="error">{error?.message}</p>
              </>
            )}
          />
          <button type="reset" value="reset" onClick={() => reset()}>
            Reset
          </button>
          <button type="submit" value="Submit" disabled={!isValid}>
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
}
