import React from 'react';
import { Link, Navigate, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';
import { Label } from './ui/Label';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

// SignUpPage Component
export default function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp(event) {
    event.preventDefault();
    console.log({ name, email, password });
    axios.post('http://localhost:3001/register', {name, email, password})
        .then((result) => {
            console.log(result)
            navigate('/')
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
        <Card className="w-[25%] max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Create your account to get started.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" required onChange={(event) => setName(event.target.value)}  />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com"  required onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required onChange={(event) => setPassword(event.target.value)}/>
            </div>
          </CardContent>
          <CardFooter className='mt-4'>
            <Button onClick={handleSignUp} className="bg-white hover:bg-black border hover:text-white border-black text-black font-bold py-2 px-4 rounded ${className} w-full">Sign Up</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}



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
