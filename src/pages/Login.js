import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            setError("");
            navigate("/");
        } catch (error) {
            setError("Google Sign-In failed. Try again.");
        }
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate("/");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError("User not found. Please sign up first.");
            } else if (error.code === "auth/wrong-password") {
                setError("Incorrect password. Try again.");
            } else if (error.code === "auth/email-already-in-use") {
                setError("Email is already registered. Try logging in.");
            } else {
                setError("Authentication failed. Try again.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>{isSignUp ? "Sign Up for CouponX" : "Login to CouponX"}</h2>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleAuth}>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>
                </form>

                <button onClick={handleGoogleSignIn} style={styles.googleButton}>
                    Sign in with Google
                </button>

                <p style={styles.text}>
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span onClick={() => setIsSignUp(!isSignUp)} style={styles.link}>
                        {isSignUp ? "Login here" : "Sign up here"}
                    </span>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        background: "#e3e4c7",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        background: "rgba(0, 0, 0, 0.6)",
        padding: "30px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        color: "#A0C49D",
        width: "350px",
    },
    heading: {
        fontSize: "24px",
        fontWeight: "bold",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginBottom: "10px",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "8px",
        border: "none",
        fontSize: "16px",
    },
    button: {
        background: "#7a9473",
        color: "#fff",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        marginTop: "15px",
        width: "100%",
    },
    googleButton: {
        background: "#db4437",
        color: "#fff",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        marginTop: "10px",
        width: "100%",
    },
    text: {
        marginTop: "10px",
        color: "#ffffff",
    },
    link: {
        color: "#A0C49D",
        cursor: "pointer",
        textDecoration: "underline",
    },
};

export default Login;
