import "./App.css";

export default function UncontrolledForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const data = {
      name: String(fd.get("name") ?? ""),
      age: Number(fd.get("age") ?? 0),
      email: String(fd.get("email") ?? ""),
      password1: String(fd.get("password1") ?? ""),
      password2: String(fd.get("password2") ?? ""),
      gender: String(fd.get("gender") ?? ""),
      country: String(fd.get("country") ?? ""),
      terms: fd.get("terms") !== null,
      picture: fd.get("picture") as File,
    };
    console.log(data);
    form.reset();
  };

  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <fieldset>
        <form action="#" method="get" onSubmit={handleSubmit}>
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            required
          />

          <label htmlFor="age">Age*</label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="Enter age"
            required
          />

          <label htmlFor="email">Email*</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />

          <label htmlFor="password1">Password*</label>
          <input
            id="password1"
            name="password1"
            type="password"
            placeholder="Enter Password"
            required
          />

          <label htmlFor="password2">Confirm Password*</label>
          <input
            id="password2"
            name="password2"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <label>Gender*</label>
          <label>
            <input type="radio" name="gender" value="male" defaultChecked />{" "}
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="other" /> Other
          </label>

          <label htmlFor="country">Country*</label>
          <select name="country" defaultValue="" required>
            <option value="" disabled>
              Select your country
            </option>
            <option value="Russia">Russia</option>
            <option value="USA">USA</option>
            <option value="Germany">Germany</option>
          </select>

          <label>
            <input type="checkbox" name="terms" required /> Accept Terms &
            Conditions
          </label>

          <label htmlFor="picture">Upload picture*</label>
          <input
            id="picture"
            name="picture"
            type="file"
            accept="image/png,image/jpeg"
            required
          />

          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </form>
      </fieldset>
    </div>
  );
}
