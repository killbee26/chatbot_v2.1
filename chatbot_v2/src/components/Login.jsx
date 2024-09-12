import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';
import { Label } from './ui/Label';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate,Navigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignIn(event) {
        event.preventDefault();
        console.log({email, password });
        axios.post('http://localhost:3001/login', {email, password})
            .then((result) => {
                console.log(result)
                navigate('/dashboard')
            })
            .catch((err) => console.log(err))
      }


  return (
    <div className="flex flex-col min-h-[100vh]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background border-b">
        <Link to="/" className="flex items-center justify-center">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">Home</Link>
          <Link to="/about" className="text-sm font-medium hover:underline underline-offset-4">About</Link>
          <Link to="/contact" className="text-sm font-medium hover:underline underline-offset-4">Contact</Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-auto max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your credentials to login to your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required onChange={(event) => setPassword(event.target.value)}/>
            </div>
          </CardContent>
          <CardFooter>
          <Button onClick={handleSignIn} className="bg-white hover:bg-black border hover:text-white border-black text-black font-bold py-2 px-4 rounded ${className} w-full">Log In</Button>
          </CardFooter>
          <div className="mt-1 mb-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}

// MountainIcon Component
function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}


// function Card({ children, className, ...props }) {
//     return (
//       <div className={`rounded-lg shadow-md p-6 bg-white ${className}`} {...props}>
//         {children}
//       </div>
//     );
//   }
  
//   function CardHeader({ children, className, ...props }) {
//     return (
//       <div className={`card-header ${className}`} {...props}>
//         {children}
//       </div>
//     );
//   }
  
//   function CardTitle({ children, className, ...props }) {
//     return (
//       <h2 className={`text-xl font-bold ${className}`} {...props}>
//         {children}
//       </h2>
//     );
//   }
  
//   function CardDescription({ children, className, ...props }) {
//     return (
//       <p className={`text-sm text-gray-600 ${className}`} {...props}>
//         {children}
//       </p>
//     );
//   }
  
//   function CardContent({ children, className, ...props }) {
//     return (
//       <div className={`card-content ${className}`} {...props}>
//         {children}
//       </div>
//     );
//   }
  
//   function CardFooter({ children, className, ...props }) {
//     return (
//       <div className={`card-footer ${className}`} {...props}>
//         {children}
//       </div>
//     );
//   }
  
//   function Input({ className, ...props }) {
//     return (
//       <input
//         className={`border rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
//         {...props}
//       />
//     );
//   }
  
//   function Label({ children, htmlFor, className, ...props }) {
//     return (
//       <label htmlFor={htmlFor} className={`block text-sm font-medium ${className}`} {...props}>
//         {children}
//       </label>
//     );
//   }
  
//   function Button({ className, ...props }) {
//     return (
//       <button
//         className={`bg-black hover:bg-white text-white border hover:text-black border-black  font-bold py-2 px-4 rounded ${className}`}
//         {...props}
//       />
//     );}