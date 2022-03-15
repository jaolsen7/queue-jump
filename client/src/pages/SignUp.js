import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../util/auth";
import { useMutation } from "@apollo/client"
import { CREATE_USER, LOGIN } from "../util/mutations";

// This signup form is intentionally minimalist to reduce effort required to
// customize it to your app's needs. See the excellent best practices guide for
// sign informs on web.dev https://web.dev/sign-in-form-best-practices/

// TODO: customize styles or import styles with favorite css approach
const styles = {
  formControl: {
    display: "flex",
    padding: "0.25em",
  },
  label: {
    flex: "0 1 6em",
    paddingRight: "0.25em",
  },
};

const initialFormState = {
  username: "",
  fullName: "",
  phoneNumber: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const { isLoggedIn, signup, loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    if (error) {
      // TODO: replace window alert with custom alert.
      alert(error);
    }
  }, [error]);

  // useEffect(() => {
  //   return <Navigate to="/" replace />
  // }, [isLoggedIn])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const {data} = await createUser({variables: { ...formState }})
      console.log(data)
      useAuth.loggedIn(data.createUser.token);
      setFormState(initialFormState);
    }
    catch(error) {
      console.error(error);
    }
  };

  if (isLoggedIn) {
    // navigate to the home page
    return <Navigate to="/" replace />
  }
  return (
    <div>
      <h1 className="bg-success text-light p-2">Sign Up</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div style={styles.formControl}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            autoFocus
            disabled={loading}
            id="username"
            type="text"
            placeholder="Enter username"
            name="username"
            value={formState.username.value}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formControl}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            disabled={loading}
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formState.email.value}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formControl}>
          <label htmlFor="new-password" style={styles.label}>
            Password
          </label>
          <input
            disabled={loading}
            id="new-password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formState.password.value}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formControl}>
          <label htmlFor="new-name" style={styles.label}>
            Name
          </label>
          <input
            disabled={loading}
            id="new-fullName"
            type="fullName"
            name="fullName"
            placeholder="Enter fullname"
            value={formState.fullName.value}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formControl}>
          <label htmlFor="new-phonenumber" style={styles.label}>
            Phone
          </label>
          <input
            disabled={loading}
            id="new-phonenumber"
            type="phoneNumber"
            name="phoneNumber"
            placeholder="Enter phoneNumber"
            value={formState.password.value}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formControl}>
          <button disabled={loading} className="bg-success rounded text-light col-1" type="submit">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
