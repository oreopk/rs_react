import { useState } from "react";
import "./App.css";

export default function ControlledForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender, setGender] = useState("male");
  const [terms, setTerms] = useState(false);
  const [country, setCountry] = useState("");
  const [picture, setPicture] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, age, email, password1, gender, terms, country, picture);
  };

  const handleReset = () => {
    setName("");
    setAge("");
    setEmail("");
    setPassword1("");
    setPassword2("");
    setGender("male");
    setTerms(false);
    setCountry("");
    setPicture(null);
  };

  return (
    <div>
      <h1>Form in React</h1>
      <fieldset>
        <form
          action="#"
          method="get"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <label htmlFor="firstname">Name*</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
          <label htmlFor="age">Age*</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            required
          />
          <label htmlFor="email">Email* </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <label htmlFor="password">Password*</label>
          <input
            type="tel"
            name="password"
            id="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Enter Password"
            required
          />
          <label htmlFor="password2">Confirm Password*</label>
          <input
            id="password2"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <label>Gender*</label>
          <label className="radio">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <span>Male</span>
          </label>

          <label className="radio">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <span>Female</span>
          </label>

          <label className="radio">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
            />
            <span>Other</span>
          </label>
          <label>Country*</label>
          <select
            name="select"
            id="select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="" disabled>
              Select your country
            </option>
            <option value="1">Russia</option>
            <option value="1">America</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              required
            />
            Accept Terms & Conditions
          </label>
          <label htmlFor="picture">Upload picture*</label>
          <input
            id="picture"
            type="file"
            accept="image/png,image/jpeg"
            onChange={(e) => setPicture(e.target.files?.[0] ?? null)}
            required
          />
          <button type="reset" value="reset" onClick={() => handleReset()}>
            Reset
          </button>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
}
