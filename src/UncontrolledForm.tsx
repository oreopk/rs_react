import "./App.css";
import { type dataType } from "./store/Slice";
import { formSchema, type FormFields } from "./validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UncontrolledForm({
  onSubmit,
}: {
  onSubmit: (data: dataType) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    onSubmit(data as unknown as dataType);
    reset();
  };
  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <fieldset>
        <form noValidate onSubmit={handleSubmit(submit)}>
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            autoComplete="name"
            type="text"
            placeholder="Enter name"
            {...register("name")}
            required
          />
          <p className="error">{errors.name?.message}</p>

          <label htmlFor="age">Age*</label>
          <input
            id="age"
            autoComplete="off"
            type="number"
            placeholder="Enter age"
            {...register("age", { valueAsNumber: true })}
            required
          />
          <p className="error">{errors.age?.message}</p>

          <label htmlFor="email">Email*</label>
          <input
            id="email"
            autoComplete="email"
            type="email"
            placeholder="Enter email"
            {...register("email")}
            required
          />
          <p className="error">{errors.email?.message}</p>

          <label htmlFor="password1">Password*</label>
          <input
            id="password1"
            autoComplete="new-password"
            type="password"
            placeholder="Enter password"
            {...register("password1")}
            required
          />
          <p className="error">{errors.password1?.message}</p>

          <label htmlFor="password2">Confirm Password*</label>
          <input
            id="password2"
            autoComplete="new-password"
            type="password"
            placeholder="Confirm password"
            {...register("password2")}
            required
          />
          <p className="error">{errors.password2?.message}</p>

          <label>Gender*</label>
          <label>
            <input
              type="radio"
              autoComplete="sex"
              value="male"
              {...register("gender")}
              defaultChecked
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              autoComplete="sex"
              value="female"
              {...register("gender")}
            />{" "}
            Female
          </label>
          <p className="error">{errors.gender?.message}</p>

          <label htmlFor="country">Country*</label>
          <select
            autoComplete="country-name"
            defaultValue=""
            {...register("country")}
            required
          >
            <option value="" disabled>
              Select your country
            </option>
            <option value="Russia">Russia</option>
            <option value="USA">USA</option>
            <option value="Germany">Germany</option>
          </select>
          <p className="error">{errors.country?.message}</p>

          <label>
            <input
              type="checkbox"
              autoComplete="off"
              {...register("terms")}
              required
            />{" "}
            Terms & Conditions
          </label>
          <p className="error">{errors.terms?.message}</p>

          <button type="reset" value="reset" onClick={() => reset()}>
            Reset
          </button>
          <button type="submit">Submit</button>
        </form>
      </fieldset>
    </div>
  );
}
