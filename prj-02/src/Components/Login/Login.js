import  "./Login.css";

function Login() {
  return (
    <div class="container">
        <div class="left-half">
        </div>
        <div class="right-half">
            <img src="blender_logo.png" alt="Blender Logo" class="logo" />
            <h2>Welcome</h2>
            <p>Login your account to continue</p>
            <form>
                <input type="text" placeholder="User ID" required/>
                <input type="password" placeholder="Password" required/>
                <a href="#" class="forgot-password">Forgot Password?</a>
                <button type="submit">Login</button>
            </form>
            <p class="copyright">&copy; All rights received @2024 NagSoft India Pvt Ltd</p>
        </div>
    </div>

  );
}

export default Login;
