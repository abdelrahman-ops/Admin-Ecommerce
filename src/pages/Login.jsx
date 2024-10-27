import { useFormik} from 'formik';
import { useLocation , useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import {useAuth} from '../hooks/AuthContext';




const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginSuccess = (token) =>{
        Cookies.set("token", token)
        login(token);
        
        const redirectPath = location.state?.from?.pathname || '/';
        navigate(redirectPath);
        console.log(redirectPath);
        
    }

    const formikLogin = useFormik({
        initialValues: {
            email: "abood@gmail.com",
            password: "123456789",
        },
        onSubmit: values => {
            fetch("http://localhost:5050/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then((res)=> res.json())
            .then(res => {
                console.log(res);
                
                if (res.data.user && res.data.token) {
                    handleLoginSuccess(res.data.token);
                    console.log("Stored data successfully.");
                }
            })
            .catch(() => alert)
        },
    });


    return (
        <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <form className="flex flex-col items-center w-full gap-4" onSubmit={formikLogin.handleSubmit}>
                <div className="inline-flex items-center gap-2 mb-2 mt-10">
                    <p className="prata-regular text-3xl">Login</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                </div>

                <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Email"
                    value={formikLogin.values.email}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                />
                    {formikLogin.touched.email && formikLogin.errors.email ? (
                        <div className="text-red-500">{formikLogin.errors.email}</div>
                    ) : null}
                
                <input
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Password"
                    value={formikLogin.values.password}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                />
                    {formikLogin.touched.password && formikLogin.errors.password ? (
                        <div className="text-red-500">{formikLogin.errors.password}</div>
                    ) : null}

                <button className="bg-black text-white font-light px-8 py-2 mt-4" type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;